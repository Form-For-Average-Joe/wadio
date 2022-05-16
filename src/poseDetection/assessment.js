import exerciseValues from './values';
import * as pushups from './pushups';
import * as situps from './situps';

const numberOfReps = 20;

/*
stage 0: pre-calibration
stage 1: pre-start
stage 2: started, up position
stage 3: started, down position
stage 4: complete
*/
export function assess_pushups(keypoints) {
    //console.log(exerciseValues.assess.stage);
    switch (exerciseValues.assess.stage) {
        case 0:
            if (exerciseValues.pushupval.isCalibrated) {
                exerciseValues.assess.stage = 1;
                console.log("EXERCISE READY!");
            } else {
                pushups.calibrate(keypoints);
            } return;
        case 1:
            if (pushups.checkArmStraight(keypoints)) {
                exerciseValues.assess.stage = 2;
                console.log("EXERCISE BEGIN!");
            } else {
                console.log("STRAIGHTEN ARM TO START");
            } return;
        case 2:
            if (!pushups.checkBackStraight) {
                console.log("STRAIGHTEN YOUR BACK");
                return;
            }
            if (pushups.checkDepth(keypoints)) {
                exerciseValues.assess.stage = 3;
            } return;
        case 3:
            if (!pushups.checkBackStraight) {
                exerciseValues.assess.stage = 2;
                console.log("STRAIGHTEN YOUR BACK");
                return;
            }
            if (pushups.checkArmStraight(keypoints)) {
                exerciseValues.assess.stage = 2;
                exerciseValues.assess.count += 1; console.log("COUNT: " + exerciseValues.assess.count);
                if (exerciseValues.assess.count >= numberOfReps) {
                    exerciseValues.assess.stage = 4;
                }
            } return;
        default:
            console.log("ERROR"); return;
    }
}

export function assess_situps(keypoints) {
    //console.log(exerciseValues.assess.stage);
    switch (exerciseValues.assess.stage) {
        case 0:
            if (exerciseValues.situpval.isCalibrated) {
                exerciseValues.assess.stage = 1;
                console.log("EXERCISE READY!");
            } else {
                situps.calibrate(keypoints);
            } return;
        case 1:
            if (situps.checkShoulderDepth(keypoints)) {
                exerciseValues.assess.stage = 2;
                console.log("EXERCISE BEGIN!");
            } else {
                console.log("LIE FLAT TO START");
            } return;
        case 2:
            if (!situps.checkHipMovement) {
                console.log("DO NOT FLIP FLOP");
                return;
            }
            if (situps.checkElbowRaise(keypoints)) {
                exerciseValues.assess.stage = 3;
            } return;
        case 3:
            if (!situps.checkHipMovement) {
                exerciseValues.assess.stage = 2;
                console.log("DO NOT FLIP FLOP");
                return;
            }
            if (situps.checkShoulderDepth(keypoints)) {
                exerciseValues.assess.stage = 2;
                exerciseValues.assess.count += 1; console.log("COUNT: " + exerciseValues.assess.count);
                if (exerciseValues.assess.count >= numberOfReps) {
                    exerciseValues.assess.stage = 4;
                }
            } return;
        default:
            console.log("ERROR"); return;
    }
}

export function clear_assessment_stats() {
    exerciseValues.assess.count = 0;
    exerciseValues.assess.stage = 0;
}