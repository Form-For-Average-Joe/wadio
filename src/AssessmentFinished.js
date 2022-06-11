import { useEffect, useState } from "react";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import { Grid, Card, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import LastAttemptStats from "./containers/LastAttemptStats";
import { selectCount, selectDuration, clearExerciseState, selectNameOfExercise, selectDifficultyLevel } from "./features/exercise/exerciseSlice";
import { resetUserTime, selectMinutes, selectSeconds } from './features/userProfile/userProfileSlice';
import { useUser } from 'reactfire';
import { Link } from "react-router-dom";
import GenericHeaderButton from "./components/GenericHeaderButton";
import { getCaloriesBurnt } from "./util";

export default function AssessmentFinished() {
  const dispatch = useDispatch();
  const repCount = useSelector(selectCount);
  const duration = useSelector(selectDuration);
  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);
  const nameOfExercise = useSelector(selectNameOfExercise);
  const difficulty = useSelector(selectDifficultyLevel);
  const workoutTime = (minutes * 60 + seconds) === 0 ? duration : duration - (minutes * 60 + seconds);
  const pastExercise = "/exercise/" + nameOfExercise;
  const [age, setAge] = useState("0");
  const [weight, setWeight] = useState("0");
  const [gender, setGender] = useState("0");
  const { data: user } = useUser();

  useEffect(() => {
    if (user) {
      const firestore = getFirestore();
      const ref = doc(firestore, user.uid, 'userData');

      const inner = async () => {
        return await getDoc(ref);
      };
      inner().then(res => {
        const data = res.data();
        if (data) { // not a first-time user
          setAge(data.age);
          setWeight(data.weight);
          setGender(data.gender);
        }
      });
    }
  }, [user])

  const caloriesBurnt = getCaloriesBurnt(repCount, workoutTime, nameOfExercise, difficulty, gender, age, weight);
  console.log(caloriesBurnt);
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const [lastAttemptStats, setLastAttemptStats] = useState({
    repCount,
    workoutTime,
    nameOfExercise,
    caloriesBurnt,
    difficulty,
    date,
    time,
  })

  const saveData = () => {
    if (user) {
      setDoc(doc(getFirestore(), user.uid, date + " " + time), { //chose to use time stamp
        lastAttemptStats,
      });
    }
  }


  useEffect(() => {
    return () => {
      dispatch(clearExerciseState());
      dispatch(resetUserTime());
    }
  })

  //todo anonymous user also must persist stats in local cache or online - figure out if need to save in Firebase
  //todo fetch lastsessionstats from local cache if possible
  //todo write unit tests first

  return (
    <Card sx={{ backgroundColor: "#000000" }}>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item sx={{ marginTop: "3rem" }}>
          <LastAttemptStats stats={{ repCount, workoutTime, nameOfExercise, caloriesBurnt }} />
        </Grid>
        <Grid item>
          <Typography sx={{ color: "#FFFFFF" }}>
            Select continue to save your workout!
          </Typography>
        </Grid>
        <Grid item>
          <GenericHeaderButton variant="contained" sx={{ backgroundColor: "#444444" }} onClick={saveData} component={Link} to={user ? "/profile" : "/"}>
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