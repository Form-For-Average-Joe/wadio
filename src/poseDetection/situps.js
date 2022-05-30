import calculateCorrelation from 'calculate-correlation';
import values from './values';

/*
calibration for situp needs to include checking if hip point is level with ankle point,
ie. y-coords cannot be too far off

check:
1. shoulder goes to as low as the hip
2. elbow goes near to the knee
3. hip should not move, flip-flop
*/

//Indexed in order shoulder, elbow, hip, knee, ankle
const leftside = [5, 7, 11, 13, 15];
const rightside = [6, 8, 12, 14, 16];
const elbowtokneethreshold = 0.5;
const hiptoanklethreshold = 0.3;
const differenceEpsilon = 0.01; // epsilon val, to check difference
const calibrationThreshold = 0.45;

export function checkShoulderDepth(keypoints) {
    let bdpoints;
    if (values.situpval.side === 1) {
        bdpoints = leftside;
    } else {
        bdpoints = rightside;
    }
    const xpoints = [keypoints[bdpoints[0]].x, keypoints[bdpoints[2]].x, keypoints[bdpoints[4]].x];
    const ypoints = [keypoints[bdpoints[0]].y, keypoints[bdpoints[2]].y, keypoints[bdpoints[4]].y];
    let corr = calculateCorrelation(xpoints, ypoints);
    return Math.abs(corr) > 0.8;

}

export function checkElbowRaise(keypoints) {
    let bdpoints;
    if (values.situpval.side === 1) {
        bdpoints = leftside;
    } else {
        bdpoints = rightside;
    }
    const xpos = Math.abs(keypoints[bdpoints[1]].x - keypoints[bdpoints[3]].x);
    const ypos = Math.abs(keypoints[bdpoints[1]].y - keypoints[bdpoints[3]].y);
    const currentdepth = Math.sqrt((xpos * xpos) + (ypos * ypos));
    return currentdepth < values.situpval.elbowLimit;

}

export function checkHipMovement(keypoints) {
    let bdpoints;
    if (values.situpval.side === 1) {
        bdpoints = leftside;
    } else {
        bdpoints = rightside;
    }
    const ydiff = Math.abs(keypoints[bdpoints[2]].y - keypoints[bdpoints[4]].y);
    return ydiff < values.situpval.hipLimit;

}

function isBodyInFrame(keypoints, ankle) {
    const b = keypoints[0].score > calibrationThreshold && keypoints[ankle].score > calibrationThreshold;
    if (!b) {
        //console.log(keypoints[0].score + "   " + keypoints[ankle].score)
    }
    return b;
}

function isStablised(keypoints) {
    let bdpoints;
    if (values.pushupval.side === 1) {
        bdpoints = leftside;
    } else {
        bdpoints = rightside;
    }
    //hipLimit will assume whatever value it is when elbowLimit value is stable, ie. will not be
    //used for checking stabilisaion
    values.situpval.hipLimit = Math.abs((keypoints[bdpoints[3]].y - keypoints[bdpoints[4]].y) * hiptoanklethreshold);
    const xdiff = Math.abs(keypoints[bdpoints[1]].x - keypoints[bdpoints[0]].x);
    const ydiff = Math.abs(keypoints[bdpoints[1]].y - keypoints[bdpoints[0]].y);
    const newElbowLimit = elbowtokneethreshold * Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
    const diff = Math.abs((values.situpval.elbowLimit - newElbowLimit) / newElbowLimit);
    //console.log('Diff: ' + diff);
    values.situpval.elbowLimit = newElbowLimit;
    // if diff < differenceEpsilon, is stalbe
    return diff < differenceEpsilon;
}

//todo check for confidence, check if number here
//todo normalise
// todo constraints for head and feet
function calculateDepthLimit(keypoints) {
    let bdpoints;
    if (keypoints[0].x < keypoints[12].x) {
        values.situpval.side = 1;
        bdpoints = leftside;
    }
    else {
        values.situpval.side = 2;
        bdpoints = rightside;
    }
    let ankle = values.situpval.side === 1 ? 15 : 16;
    if (isBodyInFrame(keypoints, ankle)) {
        values.situpval.isCalibrated = isStablised(keypoints);
    }
    else {
        //console.log("Out of Frame");
    }
}

export function calibrate(keypoints) {
    calculateDepthLimit(keypoints);
}