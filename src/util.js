// to mirror the webcam
export const webcamStyles = {
  video: {
    WebkitTransform: "scaleX(-1)",
    transform: "scaleX(-1)",
  }
};

export const createData = (Date, Time, Exercise, Reps, Duration, Calories) => {
  return { Date, Time, Exercise, Reps, Duration, Calories };
}

export const renameForTable = (e) => {
  switch(e) {
    case "pushups":
      return "Push-Ups"
    case "situps":
      return "Sit-Ups"
    default:
      return "Undefined"
  }
}

export const getDeadlineTime = (duration) => {
  let deadline = new Date();
  deadline.setTime(deadline.getTime() + duration * 1000);
  return deadline;
};

export const getFlooredSeconds = (total) => {
  return Math.floor((total / 1000) % 60);
}

export const getFlooredMinutes = (total) => {
  return Math.floor((total / 1000 / 60) % 60);
}

export const exercises = ['Pushups', 'Situps'];

export const difficulties = [
  'Hellish',
  'IPPT',
  'Heavenly',
];

export const typesOfRanking = ['Cumulative', 'Personal Best'];

function getBaseCal(rate, repCount, nameOfExercise) {
  const rateCorrection = rate * 0.2;
  const actualCorrection = (repCount * 0.3 < rateCorrection) ? repCount * 0.3 : rateCorrection;
  return repCount - actualCorrection;
}

function getWeightCorrectedCal(baseCal, weight) {
  let cal = baseCal;
  let benchmark = 85; //set 85kg as benchmark
  if (weight < benchmark) {
    while (weight < benchmark) {
      cal *= 0.96; //calories burnt drops 4% (compounding) per 5kg
      benchmark -= 5;
    }
  }
  else { //if weight of user is already 85kg, not correction is done
    while (weight > benchmark) {
      cal *= 1.04; //calories burnt rises 4% (compounding) per 5kg
      benchmark += 5;
    }
  }
  return cal;
}

function getAgeCorrectedCal(baseCal, age) {
  let cal = baseCal;
  let benchmark = 25; //set 25 yo as benchmark
  if (age < benchmark) {
    while (age < benchmark) {
      cal *= 0.95; //calories burnt drops 5% (compounding) per 5years
      benchmark -= 5;
    }
  }
  else { //if weight of user is already 85kg, not correction is done
    while (age > benchmark) {
      cal *= 0.95; //calories burnt drops 5% (compounding) per 5years
      benchmark += 5;
    }
  }
  return cal;
}

function getFinalCal(baseCal, difficulty, gender) {
  let cal = baseCal;
  switch (difficulty) {
    case 0: //hellish
      cal *= 1.2; break;
    case 1: //IPPT
      cal *= 1.0; break;
    case 2: //heavenly
      cal *= 0.8; break;
    default:
      console.log("error, invalid difficulty to compute calories"); break;
  }
  switch (gender) {
    case "0": //male
      cal *= 1.0; break;
    case "1": //female
      cal *= 0.9; break;
    case "2": //others
      cal *= 0.95; break;
    default:
      console.log("error, invalid gender to compute calories"); break;
  }
  return cal;
}

export const getCaloriesBurnt = (repCount, workoutTime, nameOfExercise, difficulty, gender, age, weight) => {
  const rate = repCount / (workoutTime / 60); //rate of exercise, reps per minute
  const baseCal = getBaseCal(rate, repCount, nameOfExercise);
  const weightCorrectedCal = getWeightCorrectedCal(baseCal, weight);
  const ageCorrectedCal = getAgeCorrectedCal(weightCorrectedCal, age);
  const finalCal = getFinalCal(ageCorrectedCal, difficulty, gender);
  return finalCal.toFixed(1);
}

// function handleStart() {
//   if (intervalRef.current) clearInterval(intervalRef.current);
//   clearTimer(getDeadlineTime());
// }
//
// function handleStop() {
//   if (intervalRef.current) clearInterval(intervalRef.current);
//   clearTimer(getDeadlineTime() - duration);
// }
