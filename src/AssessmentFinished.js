import axios from "axios";
import { useEffect, useState } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Grid, Card, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import LastAttemptStats from "./containers/LastAttemptStats";
import { clearExerciseState } from "./features/exercise/exerciseSlice";
import { resetUserTime } from './features/userProfile/userProfileSlice';
import { useFirestoreDocData, useUser } from 'reactfire';
import { Link, Navigate } from "react-router-dom";
import GenericHeaderButton from "./components/GenericHeaderButton";
import { getCaloriesBurnt } from "./util";
import { store } from './app/store';

export default function AssessmentFinished() {
  const dispatch = useDispatch();
  const { exercise, userProfile  } = store.getState();
  const { count, duration, nameOfExercise, difficultyLevel } = exercise;
  const { minutes, seconds } = userProfile;
  const workoutTime = (minutes * 60 + seconds) === 0 ? duration : duration - (minutes * 60 + seconds);
  const { status, data: user } = useUser();
  const firestore = getFirestore();
  const ref = doc(firestore, user.uid, 'userData');
  const { status: firestoreDataStatus, data: userProfileData } = useFirestoreDocData(ref);
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const caloriesBurnt = getCaloriesBurnt(count, workoutTime, nameOfExercise, difficultyLevel, userProfileData?.gender, userProfileData?.age, userProfileData?.weight);

  //todo this is a hacky approach to save the last attempt stats before clearExerciseState is dispatched, as the component might render a few times and clear stats before sending to Firestore
  const [lastAttemptStats, setLastAttemptStats] = useState({
    repCount: count,
    workoutTime,
    nameOfExercise,
    caloriesBurnt,
    difficultyLevel,
    date,
    time,
  })

  useEffect(() => {
    return () => {
      dispatch(clearExerciseState());
      dispatch(resetUserTime());
    }
  })

  if (status === 'loading' || firestoreDataStatus === 'loading') {
    return <p>Loading</p>;
  }

  const saveData = () => {
    if (user) {
      setDoc(doc(getFirestore(), user.uid, date + " " + time), { //chose to use time stamp
        lastAttemptStats,
      });
      axios.post('https://13.228.86.60/calories/addToUserCumulative/', {
        uid: user.uid,
        scoreOfLatest: lastAttemptStats.caloriesBurnt,
      });
      axios.post('https://13.228.86.60/' + lastAttemptStats.nameOfExercise + '/addToUserCumulative/', {
        uid: user.uid,
        scoreOfLatest: lastAttemptStats.repCount,
      });
    }
  }

  if (!user) return <Navigate to={"/"} replace/>;

  return (
    <Card sx={{ backgroundColor: "#000000" }}>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item sx={{ marginTop: "3rem" }}>
          <LastAttemptStats lastAttemptStats={lastAttemptStats} />
        </Grid>
        <Grid item>
          <Typography sx={{ color: "#FFFFFF" }}>
            Select continue to save your workout!
          </Typography>
        </Grid>
        <Grid item>
          <GenericHeaderButton variant="contained" sx={{ backgroundColor: "#444444" }} onClick={saveData}
                               component={Link} to={user ? "/profile" : "/"}>
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