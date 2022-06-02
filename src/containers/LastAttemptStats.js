import {useEffect, useState} from 'react';
import {Typography, Card, Grid} from '@mui/material';
import {doc, getFirestore, getDoc} from 'firebase/firestore';
import {getAuth} from "firebase/auth";

//todo add name of exercise here, like pushups or situps, and update code elsewher, like Firebase fetching code
const LastAttemptStats = ({stats}) => {
  const generateDisplayTimeString = (workoutTime) => Math.floor(workoutTime / 60) + ' minutes ' + (workoutTime % 60) + ' seconds'
  const [displayString, setDisplayString] = useState('No previous workout: let\'s get started!');
  const generateDisplayString = (workoutTime, repCount, nameOfExercise) => {
    const displayTimeString = generateDisplayTimeString(workoutTime);
    return 'Last Attempt: ' + repCount + ' ' + nameOfExercise + ' reps in ' + displayTimeString + '.';
  }

  useEffect(() => {
    if (stats) {
      setDisplayString(generateDisplayString(stats.workoutTime, stats.repCount, stats.nameOfExercise));
    } else {
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
          if (data) {
            setDisplayString(generateDisplayString(data.workoutTime, data.repCount, data.nameOfExercise));
          }
        });
      } else {
        setDisplayString("Please sign in to view your stats");
      }
    }
  }, []);

  return (
    <Card>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
          <Typography variant="subtitle1" align="center">
            {displayString}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LastAttemptStats;