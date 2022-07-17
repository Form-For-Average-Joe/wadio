/* eslint-disable no-use-before-define */

import calculateCorrelation from 'calculate-correlation';
import { selectDifficultyLevel } from "../features/exercise/exerciseSlice";
import {store} from "../app/store";

//Indexed in order wrist, elbow, shoulder, hip, knee
const leftside = [5, 7, 9, 11, 13];
const rightside = [6, 8, 10, 12, 14];
const differenceEpsilon = 0.01; // epsilon val, to check difference
const calibrationThreshold = 0.45;
//const difficultySet = selectDifficultyLevel(store.getState());

// const depthThreshold = exerciseValues.pushupval.depthThres[selectDifficultyLevel(store.getState())];
// const armThreshold = exerciseValues.pushupval.armThres[selectDifficultyLevel(store.getState())];
// const backThreshold = exerciseValues.pushupval.backThres[selectDifficultyLevel(store.getState())];

export function checkDepth(keypoints, exerciseValues) {
  let bdpoints;
  if (exerciseValues.pushupval.side === 1) {
    bdpoints = leftside;
  } else {
    bdpoints = rightside;
  }
  const xpos = Math.abs(keypoints[bdpoints[0]].x - keypoints[bdpoints[2]].x);
  const ypos = Math.abs(keypoints[bdpoints[0]].y - keypoints[bdpoints[2]].y);
  const currentdepth = Math.sqrt((xpos * xpos) + (ypos * ypos));
  return currentdepth < exerciseValues.pushupval.depthLimit;
}

export function checkArmStraight(keypoints, exerciseValues) {
  let bdpoints;
  if (exerciseValues.pushupval.side === 1) {
    bdpoints = leftside;
  } else {
    bdpoints = rightside;
  }
  const xpoints = [keypoints[bdpoints[0]].x, keypoints[bdpoints[1]].x, keypoints[bdpoints[2]].x];
  const ypoints = [keypoints[bdpoints[0]].y, keypoints[bdpoints[1]].y, keypoints[bdpoints[2]].y];
  let corr = calculateCorrelation(xpoints, ypoints);
  return Math.abs(corr) > exerciseValues.pushupval.armThres[selectDifficultyLevel(store.getState())]; // return true if arm is straight

}

export function checkBackStraight(keypoints, exerciseValues) {
  let bdpoints;
  if (exerciseValues.pushupval.side === 1) {
    bdpoints = leftside;
  } else {
    bdpoints = rightside;
  }
  const xpoints = [keypoints[bdpoints[0]].x, keypoints[bdpoints[3]].x, keypoints[bdpoints[4]].x];
  const ypoints = [keypoints[bdpoints[0]].y, keypoints[bdpoints[3]].y, keypoints[bdpoints[4]].y];
  let corr = calculateCorrelation(xpoints, ypoints);
  return Math.abs(corr) > exerciseValues.pushupval.backThres[selectDifficultyLevel(store.getState())];

}

function isBodyInFrame(keypoints, knee) {
  return keypoints[0].score > calibrationThreshold && keypoints[knee].score > calibrationThreshold;
}

function isStablised(keypoints, exerciseValues) {
  let bdpoints;
  if (exerciseValues.pushupval.side === 1) {
    bdpoints = leftside;
  } else {
    bdpoints = rightside;
  }
  const xdiff = Math.abs(keypoints[bdpoints[1]].x - keypoints[bdpoints[2]].x);
  const ydiff = Math.abs(keypoints[bdpoints[1]].y - keypoints[bdpoints[2]].y);
  const newDepthLimit = exerciseValues.pushupval.depthThres[selectDifficultyLevel(store.getState())] * Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
  const diff = Math.abs((exerciseValues.pushupval.depthLimit - newDepthLimit) / newDepthLimit);
  //console.log('Diff: ' + diff);
  exerciseValues.pushupval.depthLimit = newDepthLimit;
  // if diff < differenceEpsilon, is stalbe
  return diff < differenceEpsilon;
}

//todo normalise
export function calibrate(keypoints, exerciseValues) {
  let bdpoints;
  if (keypoints[0].x < keypoints[12].x) {
    exerciseValues.pushupval.side = 1;
  }
  else {
    exerciseValues.pushupval.side = 2;
  }
  let knee = exerciseValues.pushupval.side === 1 ? 13 : 14;
  if (isBodyInFrame(keypoints, knee)) {
    exerciseValues.pushupval.isCalibrated = isStablised(keypoints, exerciseValues);
  }
  else {
    //console.log("Out of Frame");
  }
}