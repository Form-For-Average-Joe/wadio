import exerciseValues from './values';
import * as pushups from './pushups';
import * as situps from './situps';
import {store} from "../app/store";
import {selectStage, setStage, incrementCount, selectCount} from "../features/userValues/userValuesSlice";

const numberOfReps = 20;

/*
stage 0: pre-calibration
stage 1: pre-start
stage 2: started, up position
stage 3: started, down position
stage 4: complete
*/

function moveToStageOne() {
    store.dispatch(setStage(1));
    console.log("EXERCISE READY!");
}

export function assess_pushups(keypoints) {
    // console.log("STAGI" + selectStage(store.getState()))
    switch (selectStage(store.getState())) {
        case 0:
            if (exerciseValues.pushupval.isCalibrated) {
                moveToStageOne();
            } else {
                pushups.calibrate(keypoints);
            } return;
        case 1:
            if (pushups.checkArmStraight(keypoints)) {
                store.dispatch(setStage(2));
                console.log("EXERCISE BEGIN!");
            } else {
                console.log("STRAIGHTEN ARM TO START");
            } return;
        case 2:
            if (!pushups.checkBackStraight(keypoints)) {
                console.log("STRAIGHTEN YOUR BACK");
                return;
            }
            if (pushups.checkDepth(keypoints)) {
                store.dispatch(setStage(3));
                } return;
        case 3:
            if (!pushups.checkBackStraight(keypoints)) {
                store.dispatch(setStage(2));
                console.log("STRAIGHTEN YOUR BACK");
                return;
            }
            if (pushups.checkArmStraight(keypoints)) {
                store.dispatch(setStage(2));
                store.dispatch(incrementCount());
                console.log("COUNT: " + selectCount(store.getState()));
                if (selectCount(store.getState()) >= numberOfReps) {
                    store.dispatch(setStage(4));
                }
            } return;
        default:
            console.log("ERROR"); return;
    }
}

export function assess_situps(keypoints) {
    switch (selectStage(store.getState())) {
        case 0:
            if (exerciseValues.situpval.isCalibrated || Math.random() > 0.8) {
                moveToStageOne();
            } else {
                situps.calibrate(keypoints);
            } return;
        case 1:
            if (situps.checkShoulderDepth(keypoints)) {
                store.dispatch(setStage(2));
                console.log("EXERCISE BEGIN!");
            } else {
                console.log("LIE FLAT TO START");
            } return;
        case 2:
            if (!situps.checkHipMovement(keypoints)) {
                console.log("DO NOT FLIP FLOP");
                return;
            }
            if (situps.checkElbowRaise(keypoints)) {
                store.dispatch(setStage(3));
            } return;
        case 3:
            if (!situps.checkHipMovement(keypoints)) {
                store.dispatch(setStage(2));
                console.log("DO NOT FLIP FLOP");
                return;
            }
            if (situps.checkShoulderDepth(keypoints)) {
                store.dispatch(setStage(2));
                store.dispatch(incrementCount());
                console.log("COUNT: " + selectCount(store.getState()));
                if (selectCount(store.getState()) >= numberOfReps) {
                    store.dispatch(setStage(4));
                }
            } return;
        default:
            console.log("ERROR"); return;
    }
}