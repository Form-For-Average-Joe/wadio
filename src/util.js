// to mirror the webcam
import { get, put } from "axios";
import { collection, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
import bicepcurls from "./assets/bicepcurls.png";
import bicepcurlsG from "./assets/bicepcurlsG.jpeg";
import comingsoon from "./assets/comingsoon.png";
import pushups from "./assets/pushups.png";
import pushupsG from "./assets/pushupsG.jpeg";
import shoulderpress from "./assets/shoulderpress.png";
import shoulderpressG from "./assets/shoulderpressG.jpeg";
import situps from "./assets/situps.png";
import situpsG from "./assets/situpsG.jpeg";
//can use the require('./assets/.png/') syntax to import inline in exerciseInformation

export const webcamStyles = {
  video: {
    WebkitTransform: "scaleX(-1)",
    transform: "scaleX(-1)",
  }
};

export const createData = (Date, Time, Exercise, Reps, Duration, Calories) => {
  return { Date, Time, Exercise, Reps, Duration, Calories };
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
  } else { //if weight of user is already 85kg, not correction is done
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
  } else { //if weight of user is already 85kg, not correction is done
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
      cal *= 1.2;
      break;
    case 1: //IPPT
      cal *= 1.0;
      break;
    case 2: //heavenly
      cal *= 0.8;
      break;
    default:
      console.log("error, invalid difficulty to compute calories");
      break;
  }
  switch (gender) {
    case "0": //male
      cal *= 1.0;
      break;
    case "1": //female
      cal *= 0.9;
      break;
    case "2": //others
      cal *= 0.95;
      break;
    default:
      console.log("error, invalid gender to compute calories");
      break;
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

export const fetchUserData = async (uid, callback) => {
  const makeReq = async () => await get('https://13.228.86.60/user/getUserStatistics/' + uid);
  try {
    const { data } = await makeReq();
    if (data) {
      callback(data);
    }
  } catch (err) {
    console.log("Error fetching user data")
  }
}

export const fetchUserPhotoURL = async (uid, callback) => {
  const makeReq = async () => await get('https://13.228.86.60/user/getUserPhotoURL/' + uid);
  try {
    const { data: userAddedPhotoURL } = await makeReq();
    if (userAddedPhotoURL) {
      callback(userAddedPhotoURL);
    }
  } catch (err) {
    console.log("Error fetching user data")
  }
}

export const fetchUserCumulativeCalories = async (uid, callback) => {
  const makeReq = async () => await get('https://13.228.86.60/user/getUserCumulative/calories/' + uid);
  try {
    const { data } = await makeReq();
    if (data) {
      callback(data);
    }
  } catch (err) {
    console.log("Error fetching user data")
  }
}

export const getUserNickname = (firebaseUserData, userProfileData) => {
  return userProfileData?.nickname || firebaseUserData?.displayName || firebaseUserData?.email.match(/.*(?=@)/) || 'Guest'
};

export const makeTitleCase = str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

export const leaderboardTabNames = () => {
  const arr = [...exerciseIds];
  // remove the coming soon exercises!
  arr.pop();
  arr.pop();
  arr.push('calories');
  return arr;
}

export const exerciseDisplayNamesWithCalories = () =>
  leaderboardTabNames().map(exerciseId => exerciseId !== 'calories' ? exerciseInformation[exerciseId]['exerciseDisplayName'] : "Calories");

export const findCurrentLevel = (cal) => {
  const levelIndex = Math.floor(cal / 1000);
  switch (levelIndex) {
    case 0: return 'Rookie'
    case 1: return 'Regular'
    case 2: return 'Semi-Pro'
    case 3: return 'Pro'
    case 4: return 'Master'
    case 5: return 'Legend'
    default: return 'Rookie'
  }
}

export async function getLastAttemptStats(userUid, firestore, callback) {
  const temp = [];
  const q = query(collection(firestore, userUid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    //todo we are checking for firestore doc names here!!!! fix
    if (document.id !== "groupCodes") {
      temp.unshift(createData(
        document.data().lastAttemptStats.date,
        document.data().lastAttemptStats.time,
        (exerciseInformation[document.data().lastAttemptStats.nameOfExercise]).exerciseDisplayName,
        document.data().lastAttemptStats.repCount,
        document.data().lastAttemptStats.workoutTime,
        document.data().lastAttemptStats.caloriesBurnt))
    }
  });
  callback(temp);
}

export const isInvalidTextInput = (value) => value === "0" || value === "";

export const associateUserIdToGroupCode = async (newCode, userUid, leaderboardName) => {
  try {
    await put('https://13.228.86.60/addGroupCodeToUser/' + newCode + '/' + userUid, { leaderboardName });
  } catch (err) {
    console.log(err)
  }
}

export const associateGroupCodeToUserId = async (data, codeToStore, userUid) => {
  const newArray = [codeToStore];
  if (data?.codes) {
    const existingCodes = data.codes;
    if (!(existingCodes.includes(codeToStore))) {
      await setDoc(doc(getFirestore(), userUid, 'groupCodes'), { codes: existingCodes.concat(newArray) });
    }
    else {
      alert("You are already part of this Leaderboard");
    }
  } else {
    await setDoc(doc(getFirestore(), userUid, 'groupCodes'), { codes: newArray });
  }
}

export const rankIt = (rank) => {
  switch (rank) {
    case 1:
      return ' 🥇';
    case 2:
      return ' 🥈';
    case 3:
      return ' 🥉';
    default:
      return '';
  }
}

export function checkUnlocked(cal, ex) {
  switch (ex) {
    case exerciseIds[0]:
      return true;
    case exerciseIds[1]:
      return cal >= 50;
    case exerciseIds[2]:
      return cal >= 300;
    case exerciseIds[3]:
      return cal >= 1000;
    default:
      return false;
  }
}

export const exerciseIds = ['pushups', 'situps', 'bicepcurls', 'shoulderpress', 'benchpress', 'legraisers'];

export const exerciseInformation = {
  [exerciseIds[0]] : {
    image: pushups,
    locked: pushupsG,
    exerciseDisplayName: 'Push-Ups',
    leaderboardDisplayString: 'push-ups',
    exerciseId: exerciseIds[0],
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Login to Unlock!',
    to: '/exercise/' + exerciseIds[0]
  },
  [exerciseIds[1]]: {
    image: situps,
    locked: situpsG,
    exerciseDisplayName: 'Sit-Ups',
    leaderboardDisplayString: 'sit-ups',
    exerciseId: exerciseIds[1],
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Reach 50 Calories to Unlock!',
    to: '/exercise/' + exerciseIds[1]
  },
  [exerciseIds[2]]: {
    image: bicepcurls,
    locked: bicepcurlsG,
    exerciseDisplayName: 'Bicep Curls',
    leaderboardDisplayString: 'bicep curls',
    exerciseId: exerciseIds[2],
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Reach 300 Calories to Unlock',
    to: '/exercise/' + exerciseIds[2]
  },
  [exerciseIds[3]]: {
    image: shoulderpress,
    locked: shoulderpressG,
    exerciseDisplayName: 'Shoulder Press',
    leaderboardDisplayString: 'shoulder presses',
    exerciseId: exerciseIds[3],
    description: 'Choose your custom timings and difficulty',
    toUnlock: 'Reach 1000 Calories to Unlock',
    to: '/exercise/' + exerciseIds[3]
  },
  [exerciseIds[4]]: {
    image: comingsoon,
    locked: comingsoon,
    exerciseDisplayName: 'Bench Press',
    leaderboardDisplayString: 'bench presses',
    exerciseId: exerciseIds[4],
    description: 'Coming soon',
    toUnlock: 'Choose your custom timings and difficulty',
    to: '/'
  },
  [exerciseIds[5]]: {
    image: comingsoon,
    locked: comingsoon,
    exerciseDisplayName: 'Leg Raisers',
    leaderboardDisplayString: 'leg raisers',
    exerciseId: exerciseIds[5],
    description: 'Coming soon',
    toUnlock: 'Choose your custom timings and difficulty',
    to: '/'
  },
}