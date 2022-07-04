import * as pushups from './pushups';
import * as situps from './situps';
import {store} from "../app/store";
import {selectStage, setStage, incrementCount} from "../features/exercise/exerciseSlice";
import {setFeedback} from "../features/exercise/exerciseSlice";
import {Howl, Howler} from 'howler';
import stageChangeEmitter from "./eventsFactory";

const calibratedSound = new Howl({
  src: [require('../assets/sounds/calibrated.webm'), require('../assets/sounds/calibrated.wav'), require('../assets/sounds/calibrated.mp3')]
});
calibratedSound.volume(1.0)
const repCountSound = new Howl({
  src: [require('../assets/sounds/count.webm'), require('../assets/sounds/count.wav')]
});
Howler.volume(1.0);

/*
stage 0: pre-calibration
stage 1: pre-start
stage 2: started, up position
stage 3: started, down position
stage 4: complete
*/

export function assess_pushups(keypoints, exerciseValues) {
    // console.log("STAGE " + selectStage(store.getState()))
    switch (selectStage(store.getState())) {
        case 0:
            if (exerciseValues.pushupval.isCalibrated) {
                stageChangeEmitter.emit("isCalibrated");
            } else {
                stageChangeEmitter.emit("calibrating");
                //todo this shouldn't be outside the eventListener code
                pushups.calibrate(keypoints, exerciseValues);
            } return;
        case 1:
            if (pushups.checkArmStraight(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("armIsStraight");
            } else {
                stageChangeEmitter.emit("armIsNotStraight");
            } return;
        case 2:
            if (!pushups.checkBackStraight(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("backIsNotStraight");
                return; //don't need to check depth if back is not straight
            }
            else {
                //todo add to global
                store.dispatch(setFeedback(""));
            }
            if (pushups.checkDepth(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("depthReached");
            }
            return;
        case 3:
            if (!pushups.checkBackStraight(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("backIsNotStraightAtStage3");
                return;
            }
            if (pushups.checkArmStraight(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("repDone");
            } return;
        default:
            console.log("ERROR"); return;
    }
}

export function assess_situps(keypoints, exerciseValues) {
    switch (selectStage(store.getState())) {
        case 0:
            if (exerciseValues.situpval.isCalibrated) {
                stageChangeEmitter.emit("isCalibrated");
            } else {
                situps.calibrate(keypoints, exerciseValues);
                store.dispatch(setFeedback("CALIBRATING!"));
            } return;
        case 1:
            if (situps.checkShoulderDepth(keypoints, exerciseValues)) {
                store.dispatch(setStage(2));
                store.dispatch(setFeedback("EXERCISE BEGIN!"));
            } else {
                store.dispatch(setFeedback("LIE FLAT TO START"));
            } return;
        case 2:
            if (!situps.checkHipMovement(keypoints, exerciseValues)) {
                store.dispatch(setFeedback("DO NOT FLIP FLOP"));
                return;
            }
            if (situps.checkElbowRaise(keypoints, exerciseValues)) {
                store.dispatch(setStage(3));
            } return;
        case 3:
            if (!situps.checkHipMovement(keypoints, exerciseValues)) {
                store.dispatch(setStage(2));
                store.dispatch(setFeedback("DO NOT FLIP FLOP"));
                return;
            }
            if (situps.checkShoulderDepth(keypoints, exerciseValues)) {
                store.dispatch(setStage(2));
                store.dispatch(incrementCount());
            } return;
        default:
            console.log("ERROR"); return;
    }
}