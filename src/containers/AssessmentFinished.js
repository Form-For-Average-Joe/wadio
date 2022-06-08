import { startTransition, useEffect } from "react";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { Grid, Card } from '@mui/material';
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import LastAttemptStats from "./LastAttemptStats";
import { clearExerciseState, selectNameOfExercise, setFeedback } from "../features/exercise/exerciseSlice";
import { resetStageAndCount, selectCount, selectDuration, setIsCanStart } from '../features/userValues/userValuesSlice'
import { resetUserTime, selectMinutes, selectSeconds } from '../features/userProfile/userProfileSlice';
import { useUser } from 'reactfire';
import { Navigate } from "react-router-dom";
import exerciseValues from '../poseDetection/values';
import ContinueButton from "../components/ContinueButton";

export default function AssessmentFinished() {
  const repCount = useSelector(selectCount);
  const duration = useSelector(selectDuration);
  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);
  const nameOfExercise = useSelector(selectNameOfExercise);
  //const dispatch = useDispatch();
  const totalCalories = 0;

  const { data: user } = useUser();

  // useEffect(() => {
  //   dispatch(clearExerciseState());
  //   dispatch(setIsCanStart(false));
  //   dispatch(resetStageAndCount());
  //   dispatch(resetUserTime());
  //   dispatch(setFeedback(""));
  //   exerciseValues.pushupval.isCalibrated = false;
  // }, [])

  //todo anonymous user also must persist stats in local cache or online - figure out if need to save in Firebase
  //todo fetch lastsessionstats from local cache if possible
  if (!user) {
    //todo remind user to sign in to save stats
    return <Navigate to="/" replace={true} />
  }

  const workoutTime = (minutes * 60 + seconds) === 0 ? duration : duration - (minutes * 60 + seconds);
  const caloriesBurnt = repCount * duration * 0.1;

  setDoc(doc(getFirestore(), "userStatistics", user.uid), {
    repCount,
    workoutTime,
    nameOfExercise,
    caloriesBurnt,
  });

  return (
    <Grid>
      <Grid item>
        <LastAttemptStats stats={{ repCount, workoutTime, nameOfExercise, caloriesBurnt }} />
      </Grid>
      <Grid item>
        <ContinueButton />
      </Grid>
    </Grid>
  )
}