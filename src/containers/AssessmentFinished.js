import { useEffect } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import {Grid, Button} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import LastAttemptStats from "./LastAttemptStats";
import { clearExerciseState, selectNameOfExercise, setFeedback } from "../features/exercise/exerciseSlice";
import { resetStageAndCount, selectCount, selectDuration, setIsCanStart } from '../features/exercise/exerciseSlice'
import { resetUserTime, selectMinutes, selectSeconds } from '../features/userProfile/userProfileSlice';
import { useUser } from 'reactfire';
import {Link, Navigate} from "react-router-dom";
import exerciseValues from '../poseDetection/values';

export default function AssessmentFinished() {
  const dispatch = useDispatch();
  const repCount = useSelector(selectCount);
  const duration = useSelector(selectDuration);
  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);
  const nameOfExercise = useSelector(selectNameOfExercise);

  const { data: user } = useUser();

  useEffect(() => {
    return () => {
      if (user) {
        const sendToFirestore = async () => {
          await setDoc(doc(getFirestore(), "userStatistics", user.uid), {
            repCount,
            workoutTime,
            nameOfExercise,
            caloriesBurnt,
          });
        }
        sendToFirestore().then(() => {
          dispatch(clearExerciseState());
          dispatch(setIsCanStart(false));
          dispatch(resetStageAndCount());
          dispatch(resetUserTime());
          dispatch(setFeedback(""));
          exerciseValues.pushupval.isCalibrated = false;
        })
      }
    }
  }, [])

  //todo anonymous user also must persist stats in local cache or online - figure out if need to save in Firebase
  //todo fetch lastsessionstats from local cache if possible
  if (!user) {
    //todo remind user to sign in to save stats
    return <Navigate to="/" replace={true} />
  }

  const workoutTime = (minutes * 60 + seconds) === 0 ? duration : duration - (minutes * 60 + seconds);
  const caloriesBurnt = repCount * duration * 0.1;

  // todo write unit tests first

  return (
    <Grid>
      <Grid item>
        <LastAttemptStats stats={{ repCount, workoutTime, nameOfExercise, caloriesBurnt }} />
      </Grid>
      <Grid item>
        <Button variant="contained" component={Link} to="/">
          Continue
        </Button>
      </Grid>
    </Grid>
  )
}