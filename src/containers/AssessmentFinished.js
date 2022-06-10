import {useEffect} from "react";
import {doc, setDoc, getFirestore} from "firebase/firestore";
import {Grid, Card, Typography} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import LastAttemptStats from "./LastAttemptStats";
import {resetStageAndCount, selectCount, selectDuration, setIsCanStart, clearExerciseState, selectNameOfExercise, setFeedback} from "../features/exercise/exerciseSlice";
import {resetUserTime, selectMinutes, selectSeconds} from '../features/userProfile/userProfileSlice';
import {useUser} from 'reactfire';
import {Link, Navigate} from "react-router-dom";
import GenericHeaderButton from "../components/GenericHeaderButton";

export default function AssessmentFinished() {
  const dispatch = useDispatch();
  const repCount = useSelector(selectCount);
  const duration = useSelector(selectDuration);
  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);
  const nameOfExercise = useSelector(selectNameOfExercise);

  const {data: user} = useUser();

  const saveData = () => {
    if (user) {
      setDoc(doc(getFirestore(), "userStatistics", user.uid), {
        repCount,
        workoutTime,
        nameOfExercise,
        caloriesBurnt,
      });
    }
  }


  useEffect(() => {
    return () => {
      dispatch(clearExerciseState());
      dispatch(setIsCanStart(false));
      dispatch(resetStageAndCount());
      dispatch(resetUserTime());
      dispatch(setFeedback(""));
    }
  }, [])

  const pastExercise = "/exercise/" + nameOfExercise;

  //todo anonymous user also must persist stats in local cache or online - figure out if need to save in Firebase
  //todo fetch lastsessionstats from local cache if possible
  //todo remind user to sign in to save stats

  const workoutTime = (minutes * 60 + seconds) === 0 ? duration : duration - (minutes * 60 + seconds);
  const caloriesBurnt = repCount * duration * 0.1;

  // todo write unit tests first

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