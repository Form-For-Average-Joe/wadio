import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { Grid, Card, Typography } from '@mui/material';
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import LastAttemptStats from "./LastAttemptStats";
import { clearExerciseState, selectNameOfExercise, setFeedback } from "../features/exercise/exerciseSlice";
import { resetStageAndCount, selectCount, selectDuration, setIsCanStart } from '../features/userValues/userValuesSlice'
import { resetUserTime, selectMinutes, selectSeconds } from '../features/userProfile/userProfileSlice';
import { useUser } from 'reactfire';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React from 'react';
import GenericHeaderButton from "../components/GenericHeaderButton";


export default function AssessmentFinished() {
  const repCount = useSelector(selectCount);
  const duration = useSelector(selectDuration);
  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);
  const nameOfExercise = useSelector(selectNameOfExercise);
  //const dispatch = useDispatch();
  const totalCalories = 0;

  const { data: user } = useUser();

  const saveData = () => {
    setDoc(doc(getFirestore(), "userStatistics", user.uid), {
      repCount,
      workoutTime,
      nameOfExercise,
      caloriesBurnt,
    });
  }

  const pastExercise = "/exercise/" + nameOfExercise;

  if (!user) {
    //todo remind user to sign in to save stats
    return <Navigate to="/" replace={true} />
  }

  const workoutTime = (minutes * 60 + seconds) === 0 ? duration : duration - (minutes * 60 + seconds);
  const caloriesBurnt = repCount * duration * 0.1;


  return (
    <Card sx={{backgroundColor: "#000000"}}>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item sx={{marginTop: "3rem"}}>
          <LastAttemptStats stats={{ repCount, workoutTime, nameOfExercise, caloriesBurnt }} />
        </Grid>
        <Grid item>
          <Typography sx={{color: "#FFFFFF"}}>
            Select continue to save your workout!
          </Typography>
        </Grid>
        <Grid item>
          <GenericHeaderButton variant="contained" sx={{ backgroundColor: "#444444" }} onClick={saveData} component={Link} to="/profile">
            Continue
          </GenericHeaderButton>
        </Grid>
        <Grid item>
          <GenericHeaderButton variant="contained" sx={{ backgroundColor: "#444444" }} component={Link} to={pastExercise}>
            Try Again
          </GenericHeaderButton>
        </Grid>
      </Grid>
    </Card>
  )
}