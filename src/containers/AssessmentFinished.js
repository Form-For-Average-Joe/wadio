import React from "react";
import {doc, setDoc, getFirestore} from "firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import LastAttemptStats from "./LastAttemptStats";
import {clearExerciseState, setFeedback} from "../features/exercise/exerciseSlice";
import {resetStageAndCount, selectCount, selectDuration, setIsCalibrated} from '../features/userValues/userValuesSlice'
import {resetUserTime, selectMinutes, selectSeconds} from '../features/userProfile/userProfileSlice';
import {useUser} from 'reactfire';
import {Navigate} from "react-router-dom";
import exerciseValues from '../poseDetection/values';

export default function AssessmentFinished() {
  //code mainly duplicated from LastAttemptStats, so we can calculate it here and pass props to LastAttemptStats, then the Dashboard's LastAttemptStats will have to fetch from Firebase
  const repCount = useSelector(selectCount);
  const duration = useSelector(selectDuration);
  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);
  const dispatch = useDispatch();

  const workoutTime = (minutes * 60 + seconds) === 0 ? duration : duration - (minutes * 60 + seconds);

  const {data: user} = useUser();

  //todo fix warning that happens (when dispatching?) Warning is in relation to chaning PushupsAssessment despite rendering AssessmentFinished now apparently
  dispatch(clearExerciseState());
  dispatch(setIsCalibrated(false));
  dispatch(resetStageAndCount());
  dispatch(resetUserTime());
  dispatch(setFeedback(""));
  exerciseValues.pushupval.isCalibrated = false;

  //todo anonymous user also must persist stats in local cache or online - figure out if need to save in Firebase

  //todo fetch lastsessionstats from local cache if possible

  //todo test if this works, keep getting alerts
  if (!user) {
    alert("Please sign it to save your stats");
    return <Navigate to="/" replace={true} />
  }

  setDoc(doc(getFirestore(), "userStatistics", user.uid), {
    repCount,
    workoutTime
  });

  return (
    <LastAttemptStats stats={{repCount, workoutTime}}/>
  )
}