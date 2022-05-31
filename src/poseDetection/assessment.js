import exerciseValues from './values';
import * as pushups from './pushups';
import * as situps from './situps';
import {store} from "../app/store";
import {selectStage, setStage, incrementCount, selectCount, setIsCalibrated} from "../features/userValues/userValuesSlice";
import {setFeedback} from "../features/exercise/exerciseSlice";
import {Howl, Howler} from 'howler';

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

function moveToStageOne() {
  store.dispatch(setStage(1));
  store.dispatch(setFeedback("EXERCISE READY!"));
}

export function assess_pushups(keypoints) {
    // console.log("STAGE " + selectStage(store.getState()))
    switch (selectStage(store.getState())) {
        case 0:
            if (exerciseValues.pushupval.isCalibrated) {
                store.dispatch(setFeedback("CALIBRATION DONE!"));
                calibratedSound.play();
                moveToStageOne();
            } else {
                pushups.calibrate(keypoints);
                store.dispatch(setFeedback("CALIBRATING!"));
            } return;
        case 1:
            if (pushups.checkArmStraight(keypoints)) {
                store.dispatch(setIsCalibrated(true));
                store.dispatch(setStage(2));
                store.dispatch(setFeedback("EXERCISE BEGIN!"));
            } else {
                store.dispatch(setFeedback("STRAIGHTEN ARM TO START"));
            } return;
        case 2:
            if (!pushups.checkBackStraight(keypoints)) {
                store.dispatch(setFeedback("STRAIGHTEN YOUR BACK"));
                return;
            }
            if (pushups.checkDepth(keypoints)) {
                store.dispatch(setFeedback(""));
                store.dispatch(setStage(3));
                } return;
        case 3:
            if (!pushups.checkBackStraight(keypoints)) {
                store.dispatch(setStage(2));
                store.dispatch(setFeedback("STRAIGHTEN YOUR BACK"));
                return;
            }
            if (pushups.checkArmStraight(keypoints)) {
                store.dispatch(setStage(2));
                store.dispatch(incrementCount());
                repCountSound.play();
                // console.log("COUNT: " + selectCount(store.getState()));
            } return;
        default:
            console.log("ERROR"); return;
    }
}

export function assess_situps(keypoints) {
    switch (selectStage(store.getState())) {
        case 0:
            if (exerciseValues.situpval.isCalibrated) {
                store.dispatch(setFeedback("CALIBRATION DONE!"));
                moveToStageOne();
            } else {
                situps.calibrate(keypoints);
                store.dispatch(setFeedback("CALIBRATING!"));
            } return;
        case 1:
            if (situps.checkShoulderDepth(keypoints)) {
                store.dispatch(setStage(2));
                store.dispatch(setFeedback("EXERCISE BEGIN!"));
            } else {
                store.dispatch(setFeedback("LIE FLAT TO START"));
            } return;
        case 2:
            if (!situps.checkHipMovement(keypoints)) {
                store.dispatch(setFeedback("DO NOT FLIP FLOP"));
                return;
            }
            if (situps.checkElbowRaise(keypoints)) {
                store.dispatch(setStage(3));
            } return;
        case 3:
            if (!situps.checkHipMovement(keypoints)) {
                store.dispatch(setStage(2));
                store.dispatch(setFeedback("DO NOT FLIP FLOP"));
                return;
            }
            if (situps.checkShoulderDepth(keypoints)) {
                store.dispatch(setStage(2));
                store.dispatch(incrementCount());
                // store.dispatch(setFeedback("COUNT: " + selectCount(store.getState())));
            } return;
        default:
            console.log("ERROR"); return;
    }
}