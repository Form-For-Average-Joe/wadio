import * as pushups from './pushups';
import * as situps from './situps';
import * as bicepcurls from './bicepcurls';
import * as shoulderpress from './shoulderpress';
import { store } from "../app/store";
import { selectStage } from "../features/exercise/exerciseSlice";
import stageChangeEmitter from "./eventsFactory";

/*
stage 0: check if calibrated (move to stage 1)
stage 1: check if is in starting position for rep (move to stage 2, set isCanStart)
// setIsCanStart is in Stage 1 and not 0, so even if the calibration is done when the guy is not in position, the timer won't start
stage 2: started rep, check if rep's max effort point is reached (change stage to 3) or if rep is maligned (lock stage(?), feedback)
stage 3: past max effort point, returning to starting position, check if position reached (change stage to 1) (need to check if rep maligned?)
stage 4: exercise locked (for example, if knees touch the ground during pushup) (code to check this is in camera.js)
*/

//todo currently, code is split across ExerciseAssessment, camera.js, assessment.js and eventsListeners.js <-- need a better way to enumerate exercises, merge checking

export function assess_pushups(keypoints, exerciseValues) {
    switch (selectStage(store.getState())) {
        case 0:
            if (exerciseValues.pushupval.isCalibrated) {
                stageChangeEmitter.emit("isCalibrated");
            } else {
                stageChangeEmitter.emit("calibrating");
                pushups.calibrate(keypoints, exerciseValues);
            } return;
        case 1:
            if (pushups.checkArmStraight(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("inStartingPosition");
            } else {
                stageChangeEmitter.emit("notInStartingPosition");
            } return;
        case 2:
            if (!pushups.checkBackStraight(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("malignedRepBackNotStraight");
                return; // don't need to check depth if back is not straight
            }
            if (pushups.checkDepth(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("maxPointReached");
            }
            else {
                stageChangeEmitter.emit("maxPointNotReached");
            }
            return;
        case 3:
            if (!pushups.checkBackStraight(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("malignedRepBackNotStraightStage3");
                return;// return early, as there is no point checking the arm
            }
            if (pushups.checkArmStraight(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("repDone");
            }
            else {
                stageChangeEmitter.emit("repNotCompletedYet");
            }
            return;
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
                stageChangeEmitter.emit("calibrating");
                situps.calibrate(keypoints, exerciseValues);
            } return;
        case 1:
            if (situps.checkShoulderDepth(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("inStartingPosition");
            } else {
                stageChangeEmitter.emit("notInStartingPosition");
            } return;
        case 2:
            if (!situps.checkHipMovement(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("malignedRepFlipFlop");
                return;
            }
            if (situps.checkElbowRaise(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("maxPointReached");
            }
            else {
                stageChangeEmitter.emit("maxPointNotReached");
            }
            return;
        case 3:
            if (!situps.checkHipMovement(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("malignedRepFlipFlopStage3");
                return;
            }
            if (situps.checkShoulderDepth(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("repDone");
            }
            else {
                stageChangeEmitter.emit("repNotCompletedYet");
            }
            return;
        default:
            console.log("ERROR"); return;
    }
}

export function assess_bicepcurls(keypoints, exerciseValues) {
    switch (selectStage(store.getState())) {
        case 0:
            if (exerciseValues.bicepcurlval.isCalibrated) {
                stageChangeEmitter.emit("isCalibrated");
            } else {
                stageChangeEmitter.emit("calibrating");
                bicepcurls.calibrate(keypoints, exerciseValues);
            } return;
        case 1:
            if (bicepcurls.checkArmStraight(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("inStartingPosition");
            } else {
                stageChangeEmitter.emit("notInStartingPosition");
            } return;
        case 2:
            if (bicepcurls.checkCurl(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("maxPointReached");
            }
            else {
                stageChangeEmitter.emit("maxPointNotReached");
            }
            return;
        case 3:
            if (bicepcurls.checkArmStraight(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("repDone");
            }
            else {
                stageChangeEmitter.emit("repNotCompletedYet");
            }
            return;
        default:
            console.log("ERROR"); return;
    }
}

export function assess_shoulderpress(keypoints, exerciseValues) {
    switch (selectStage(store.getState())) {
        case 0:
            if (exerciseValues.shoulderpressval.isCalibrated) {
                stageChangeEmitter.emit("isCalibrated");
            } else {
                stageChangeEmitter.emit("calibrating");
                shoulderpress.calibrate(keypoints, exerciseValues);
            } return;
        case 1:
            if (shoulderpress.checkDepth(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("inStartingPosition");
            } else {
                stageChangeEmitter.emit("notInStartingPosition");
            } return;
        case 2:
            if (shoulderpress.checkArmStraight(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("maxPointReached");
            }
            else {
                stageChangeEmitter.emit("maxPointNotReached");
            }
            return;
        case 3:
            if (shoulderpress.checkDepth(keypoints, exerciseValues)) {
                stageChangeEmitter.emit("repDone");
                console.log("count")
            }
            else {
                stageChangeEmitter.emit("repNotCompletedYet");
            }
            return;
        default:
            console.log("ERROR"); return;
    }
}