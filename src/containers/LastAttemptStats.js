import {useEffect, useState} from 'react';
import {Typography, Card, Grid} from '@mui/material';
import {doc, getFirestore, getDoc} from 'firebase/firestore';
import {getAuth} from "firebase/auth";

// the stats prop prevents an additional query from being sent to Firestore, as the current session stats are sent over from AssessmentFinished
const LastAttemptStats = ({lastAttemptStats}) => {
  const generateDisplayTimeString = (workoutTime) => Math.floor(workoutTime / 60) + ' minutes ' + (workoutTime % 60) + ' seconds'
  const [displayString, setDisplayString] = useState('No previous workout: let\'s get started!');

  useEffect(() => {
    const generateDisplayString = (workoutTime, repCount, nameOfExercise, caloriesBurnt) => {
      const displayTimeString = generateDisplayTimeString(workoutTime);
      return 'Last Attempt: ' + repCount + ' ' + nameOfExercise + ' reps in ' + displayTimeString + '. You burnt ' + caloriesBurnt + " calories.";
    }
    if (lastAttemptStats) { // lastAttemptStats prop has been passed in
      setDisplayString(generateDisplayString(lastAttemptStats.workoutTime, lastAttemptStats.repCount, lastAttemptStats.nameOfExercise, lastAttemptStats.caloriesBurnt));
    } else { // get the stats from Firestore
      //todo use ReactFire hook to check to reload if user signs in? Clashes with useEffect
      const firestore = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const ref = doc(firestore, 'userStatistics', user.uid);

        const inner = async () => {
          return await getDoc(ref);
        };
        inner().then(res => {
          const data = res.data();
          if (data) { // not a first-time user
            setDisplayString(generateDisplayString(data.workoutTime, data.repCount, data.nameOfExercise, data.caloriesBurnt));
          }
        });
      } else {
        setDisplayString("Please sign in to view your stats");
      }
    }
  }, [lastAttemptStats]);

  return (
    <Card>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item sx={{paddingTop: "1rem", paddingBottom: "1rem"}}>
          <Typography variant="subtitle1" align="center" sx={{marginLeft: "0.5rem", marginRight: "0.5rem"}}>
            {displayString}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LastAttemptStats;