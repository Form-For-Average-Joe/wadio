import axios from "axios";
import { getIdToken } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Grid, Card, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import LoadingSpinner from "./components/LoadingSpinner";
import LastAttemptStats from "./containers/LastAttemptStats";
import { clearExerciseState } from "./features/exercise/exerciseSlice";
import { resetUserTime } from './features/userProfile/userProfileSlice';
import { useUser } from 'reactfire';
import { Link, Navigate } from "react-router-dom";
import GenericHeaderButton from "./components/GenericHeaderButton";
import { fetchUserData, getCaloriesBurnt } from "./util";
import { store } from './app/store';

export default function AssessmentFinished() {
  const dispatch = useDispatch();
  const { exercise, userProfile  } = store.getState();
  const { count, duration, nameOfExercise, difficultyLevel } = exercise;
  const { minutes, seconds } = userProfile;
  const workoutTime = (minutes * 60 + seconds) === 0 ? duration : duration - (minutes * 60 + seconds);
  const { status, data: user } = useUser();
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  //todo this is a hacky approach to save the last attempt stats before clearExerciseState is dispatched, as the component might render a few times and clear stats before sending to Firestore
  const [lastAttemptStats, setLastAttemptStats] = useState({
    repCount: count,
    workoutTime,
    nameOfExercise,
    difficultyLevel,
    date,
    time,
  });

  //todo this is absolutely stupid, but no time to fix properly, so we have two separate states for lastAttemptStats and caloriesBurnt
  const [caloriesBurnt, setCaloriesBurnt] = useState(0);

  useEffect(() => {
    return () => {
      dispatch(clearExerciseState());
      dispatch(resetUserTime());
    }
  })

  useEffect(() => {
    if (user) {
      getIdToken(user, true).then((idToken) => {
        fetchUserData(idToken, (data) => {
          setCaloriesBurnt(getCaloriesBurnt(count, workoutTime, nameOfExercise, difficultyLevel, data.gender, data.age, data.weight));
        });
      })
    }
  }, [user])

  if (status === 'loading') {
    return <LoadingSpinner/>;
  }

  const saveData = () => {
    const lastAttemptStatsWithCalories = { ...lastAttemptStats, caloriesBurnt }
    if (user) {
      setDoc(doc(getFirestore(), user.uid, date + " " + time), { //chose to use time stamp
        'lastAttemptStats': lastAttemptStatsWithCalories,
      });
      getIdToken(user, true).then((idToken) => {
        axios.post('https://13.228.86.60/calories/addToUserCumulative/' + idToken, {
          scoreOfLatest: caloriesBurnt,
        });
        axios.post('https://13.228.86.60/' + lastAttemptStats.nameOfExercise + '/addToUserCumulative/' + idToken, {
          scoreOfLatest: lastAttemptStats.repCount,
        });
      });
    }
  }

  if (!user) return <Navigate to={"/"} replace/>;

  return (
    <Card sx={{ backgroundColor: "#000000" }}>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item sx={{ marginTop: "3rem" }}>
          <LastAttemptStats lastAttemptStats={ {...lastAttemptStats, caloriesBurnt} } />
        </Grid>
        <Grid item>
          <Typography sx={{ color: "#FFFFFF" }}>
            Select continue to save your workout!
          </Typography>
        </Grid>
        <Grid item>
          <GenericHeaderButton variant="contained" sx={{ backgroundColor: "#444444" }} onClick={saveData}
                               component={Link} to={user ? "/dashboard" : "/"}>
            Continue
          </GenericHeaderButton>
        </Grid>
        <Grid item>
          <GenericHeaderButton variant="contained" sx={{ backgroundColor: "#444444" }} component={Link}
                               to={"/exercise/" + lastAttemptStats.nameOfExercise}>
            Try Again
          </GenericHeaderButton>
        </Grid>
      </Grid>
    </Card>
  )
}