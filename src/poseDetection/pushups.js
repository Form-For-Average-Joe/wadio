/* eslint-disable no-use-before-define */

import calculateCorrelation from 'calculate-correlation';
import values from './values';

//Indexed in order wrist, elbow, shoulder, hip, knee
const leftside = [5, 7, 9, 11, 13];
const rightside = [6, 8, 10, 12, 14];
const difficultyThreshold = 1.3; // difficulty for user
const differenceEpsilon = 0.01; // epsilon val, to check difference
const calibrationThreshold = 0.45;

export function checkDepth(keypoints) {
  let bdpoints;
  if (values.pushupval.side === 1) {
    bdpoints = leftside;
  } else {
    bdpoints = rightside;
  }
  const xpos = Math.abs(keypoints[bdpoints[0]].x - keypoints[bdpoints[2]].x);
  const ypos = Math.abs(keypoints[bdpoints[0]].y - keypoints[bdpoints[2]].y);
  const currentdepth = Math.sqrt((xpos * xpos) + (ypos * ypos));
  return currentdepth < values.pushupval.depthLimit;

}

export function checkArmStraight(keypoints) {
  let bdpoints;
  if (values.pushupval.side === 1) {
    bdpoints = leftside;
  } else {
    bdpoints = rightside;
  }
  const xpoints = [keypoints[bdpoints[0]].x, keypoints[bdpoints[1]].x, keypoints[bdpoints[2]].x];
  const ypoints = [keypoints[bdpoints[0]].y, keypoints[bdpoints[1]].y, keypoints[bdpoints[2]].y];
  let corr = calculateCorrelation(xpoints, ypoints);
  if (Math.abs(corr) > 0.9) {
    //console.log("ARM IS STRAIGHTENED");
    return true;
  }
  return false;
}

export function checkBackStraight(keypoints) {
  let bdpoints;
  if (values.pushupval.side === 1) {
    bdpoints = leftside;
  } else {
    bdpoints = rightside;
  }
  const xpoints = [keypoints[bdpoints[0]].x, keypoints[bdpoints[3]].x, keypoints[bdpoints[4]].x];
  const ypoints = [keypoints[bdpoints[0]].y, keypoints[bdpoints[3]].y, keypoints[bdpoints[4]].y];
  let corr = calculateCorrelation(xpoints, ypoints);
  return Math.abs(corr) > 0.95;

}

function isBodyInFrame(keypoints, knee) {
  return keypoints[0].score > calibrationThreshold && keypoints[knee].score > calibrationThreshold;
}

function isStablised(keypoints) {
  let bdpoints;
  if (values.pushupval.side === 1) {
    bdpoints = leftside;
  } else {
    bdpoints = rightside;
  }
  const xdiff = Math.abs(keypoints[bdpoints[1]].x - keypoints[bdpoints[2]].x);
  const ydiff = Math.abs(keypoints[bdpoints[1]].y - keypoints[bdpoints[2]].y);
  const newDepthLimit = difficultyThreshold * Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
  const diff = Math.abs((values.pushupval.depthLimit - newDepthLimit) / newDepthLimit);
  //console.log('Diff: ' + diff);
  values.pushupval.depthLimit = newDepthLimit;
  // if diff < differenceEpsilon, is stalbe
  return diff < differenceEpsilon;
}

//todo normalise
export function calibrate(keypoints) {
  let bdpoints;
  if (keypoints[0].x < keypoints[12].x) {
    values.pushupval.side = 1;
  }
  else {
    values.pushupval.side = 2;
  }
  let knee = values.pushupval.side === 1 ? 13 : 14;
  if (isBodyInFrame(keypoints, knee)) {
    values.pushupval.isCalibrated = isStablised(keypoints);
  }
  else {
    //console.log("Out of Frame");
  }
}