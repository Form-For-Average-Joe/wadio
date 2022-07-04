/* eslint-disable no-use-before-define */

import calculateCorrelation from 'calculate-correlation';
import { selectDifficultyLevel } from "../features/exercise/exerciseSlice";
import { store } from "../app/store";

//Indexed in order wrist, elbow, shoulder
const bdpoints = [5, 6, 7, 8, 9, 10];
const differenceEpsilon = 0.01; // epsilon val, to check difference
const calibrationThreshold = 0.45;
//const difficultySet = selectDifficultyLevel(store.getState());

// const depthThreshold = exerciseValues.pushupval.depthThres[selectDifficultyLevel(store.getState())];
// const armThreshold = exerciseValues.pushupval.armThres[selectDifficultyLevel(store.getState())];
// const backThreshold = exerciseValues.pushupval.backThres[selectDifficultyLevel(store.getState())];

export function checkDepth(keypoints, exerciseValues) {
  const lxpos = Math.abs(keypoints[bdpoints[0]].x - keypoints[bdpoints[4]].x);
  const lypos = Math.abs(keypoints[bdpoints[0]].y - keypoints[bdpoints[4]].y);
  const lcurrentdepth = Math.sqrt((lxpos * lxpos) + (lypos * lypos));

  const rxpos = Math.abs(keypoints[bdpoints[1]].x - keypoints[bdpoints[5]].x);
  const rypos = Math.abs(keypoints[bdpoints[1]].y - keypoints[bdpoints[5]].y);
  const rcurrentdepth = Math.sqrt((rxpos * rxpos) + (rypos * rypos));

  if (lcurrentdepth < exerciseValues.shoulderpressval.depthLimit && rcurrentdepth < exerciseValues.shoulderpressval.depthLimit) {
    //console.log("PUSH UP DEPTH REACHED");
    return true;
  }
  console.log("down more");
  return false;
}

export function checkArmStraight(keypoints) {
  const lxpoints = [keypoints[bdpoints[0]].x, keypoints[bdpoints[2]].x, keypoints[bdpoints[4]].x];
  const lypoints = [keypoints[bdpoints[0]].y, keypoints[bdpoints[2]].y, keypoints[bdpoints[4]].y];
  let lcorr = calculateCorrelation(lxpoints, lypoints);

  const rxpoints = [keypoints[bdpoints[1]].x, keypoints[bdpoints[3]].x, keypoints[bdpoints[5]].x];
  const rypoints = [keypoints[bdpoints[1]].y, keypoints[bdpoints[3]].y, keypoints[bdpoints[5]].y];
  let rcorr = calculateCorrelation(rxpoints, rypoints);

  if (Math.abs(lcorr) > 0.8 && Math.abs(rcorr) > 0.8) {
    //console.log("ARM IS STRAIGHTENED");
    return true;
  }
  //console.log("straighten arm");
  return false;
}

function isBodyInFrame(keypoints) {
  for (var i = 0; i < bdpoints.length; i++) {
    if (keypoints[bdpoints[i]] < calibrationThreshold) {
      return false;
    }
  }
  return true;
}

function isStablised(keypoints, exerciseValues) {
  const lxdiff = Math.abs(keypoints[bdpoints[0]].x - keypoints[bdpoints[4]].x);
  const lydiff = Math.abs(keypoints[bdpoints[0]].y - keypoints[bdpoints[4]].y);
  const llimit = Math.sqrt((lxdiff * lxdiff) + (lydiff * lydiff));
  const rxdiff = Math.abs(keypoints[bdpoints[1]].x - keypoints[bdpoints[5]].x);
  const rydiff = Math.abs(keypoints[bdpoints[1]].y - keypoints[bdpoints[5]].y);
  const rlimit = Math.sqrt((rxdiff * rxdiff) + (rydiff * rydiff));

  const newDepthLimit = (llimit + rlimit) / 2;
  const diff = Math.abs((exerciseValues.shoulderpressval.depthLimit - newDepthLimit) / newDepthLimit);
  //console.log('Diff: ' + diff);
  exerciseValues.shoulderpressval.depthLimit = newDepthLimit;
  const isStable = diff < differenceEpsilon;
  if (isStable) {
    console.log("CALIBRATION COMPLETE");
    return true;
  }
  else {
    //console.log("not stable");
    return false;
  }
}

//todo normalise
export function calibrate(keypoints, exerciseValues) {
  if (isBodyInFrame(keypoints, exerciseValues)) {
    exerciseValues.shoulderpressval.isCalibrated = isStablised(keypoints, exerciseValues);
  }
  else {
    //console.log("Out of Frame");
  }
}