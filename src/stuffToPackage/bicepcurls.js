/* eslint-disable no-use-before-define */

import calculateCorrelation from 'calculate-correlation';

//Indexed in order wrist, elbow, shoulder
const leftside = [5, 7, 9];
const rightside = [6, 8, 10];
const differenceEpsilon = 0.01; // epsilon val, to check difference
const calibrationThreshold = 0.45;
const difficultyThreshold = 0.6; // difficulty for user
//const difficultySet = selectDifficultyLevel(store.getState());

// const depthThreshold = exerciseValues.pushupval.depthThres[selectDifficultyLevel(store.getState())];
// const armThreshold = exerciseValues.pushupval.armThres[selectDifficultyLevel(store.getState())];
// const backThreshold = exerciseValues.pushupval.backThres[selectDifficultyLevel(store.getState())];

export function checkCurl(keypoints, exerciseValues) {
  let bdpoints;
  if (exerciseValues.bicepcurlval.side === 1) {
    bdpoints = leftside;
  } else {
    bdpoints = rightside;
  }
  const xpos = Math.abs(keypoints[bdpoints[0]].x - keypoints[bdpoints[2]].x);
  const ypos = Math.abs(keypoints[bdpoints[0]].y - keypoints[bdpoints[2]].y);
  const currentdepth = Math.sqrt((xpos * xpos) + (ypos * ypos));
  if (currentdepth < exerciseValues.bicepcurlval.compressLimit) {
    //console.log("PUSH UP DEPTH REACHED");
    return true;
  }
  //console.log("curl more");
  return false;
}

export function checkArmStraight(keypoints, exerciseValues) {
  let bdpoints;
  if (exerciseValues.bicepcurlval.side === 1) {
    bdpoints = leftside;
  } else {
    bdpoints = rightside;
  }
  const xpoints = [keypoints[bdpoints[0]].x, keypoints[bdpoints[1]].x, keypoints[bdpoints[2]].x];
  const ypoints = [keypoints[bdpoints[0]].y, keypoints[bdpoints[1]].y, keypoints[bdpoints[2]].y];
  let corr = calculateCorrelation(xpoints, ypoints);

  const xpos = Math.abs(keypoints[bdpoints[0]].x - keypoints[bdpoints[2]].x);
  const ypos = Math.abs(keypoints[bdpoints[0]].y - keypoints[bdpoints[2]].y);
  const currentdepth = Math.sqrt((xpos * xpos) + (ypos * ypos));
  if (Math.abs(corr) > 0.8 && currentdepth > exerciseValues.bicepcurlval.stretchLimit) {
    //console.log("ARM IS STRAIGHTENED");
    return true;
  }
  //console.log("straighten arm");
  return false;
}

function isBodyInFrame(keypoints, exerciseValues) {
  if (exerciseValues.bicepcurlval.side === 1) {
    return keypoints[9].score > calibrationThreshold && keypoints[5].score > calibrationThreshold;
  } else {
    return keypoints[10].score > calibrationThreshold && keypoints[6] > calibrationThreshold;
  }
}

function isStablised(keypoints, exerciseValues) {
  let bdpoints;
  if (exerciseValues.bicepcurlval.side === 1) {
    bdpoints = leftside;
  } else {
    bdpoints = rightside;
  }
  const xdiff = Math.abs(keypoints[bdpoints[0]].x - keypoints[bdpoints[2]].x);
  const ydiff = Math.abs(keypoints[bdpoints[0]].y - keypoints[bdpoints[2]].y);
  const newStretchLimit = difficultyThreshold * Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
  const diff = Math.abs((exerciseValues.bicepcurlval.stretchLimit - newStretchLimit) / newStretchLimit);
  //console.log('Diff: ' + diff);
  exerciseValues.bicepcurlval.stretchLimit = newStretchLimit;
  exerciseValues.bicepcurlval.compressLimit = difficultyThreshold * newStretchLimit;
  const isStable = diff < differenceEpsilon;
  if (isStable) {
    console.log("CALIBRATION COMPLETE");
    console.log(exerciseValues.bicepcurlval.side);
    return true;
  }
  else {
    //console.log("not stable");
    return false;
  }
}

//todo normalise
export function calibrate(keypoints, exerciseValues) {
  if (keypoints[8].score < keypoints[7].score) {
    exerciseValues.bicepcurlval.side = 1;
  }
  else {
    exerciseValues.bicepcurlval.side = 2;
  }
  if (isBodyInFrame(keypoints, exerciseValues)) {
    exerciseValues.bicepcurlval.isCalibrated = isStablised(keypoints, exerciseValues);
  }
  else {
    //console.log("Out of Frame");
  }
}