import { Card, CardContent, CardMedia, Typography, Divider } from "@mui/material";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import GenericHeaderButton from "./GenericHeaderButton";
import { Link } from "react-router-dom";

import pushups from '../assets/pushups.gif';
import situps from '../assets/situps.gif';
import comingsoon from '../assets/comingsoon.webp';

function getInfo(exerciseName) {
  switch (exerciseName) {
    case 'locked':
      return {
        description: 'Login or reach calories requirement to unlock!',
        instruction: '',
        exercise: 'This Exercise is Locked',
        to: '/'
      }
    case 'pushups':
      return {
        image: pushups,
        description: 'A classic exercise performed in a prone position by raising and lowering the body with the straightening and bending of the arms while keeping the back straight and supporting the body on the hands and toes.',
        instruction: 'After pressing the start button, quickly get into the push-up position with your back and arms straightened. Keep you body still to ensure proper calibration. Once calibration is done, a bell sound can be heard to indicate the start of the exercise.',
        exercise: 'Push-Ups',
        to: '/exercise/pushups'
      }
    case 'situps':
      return {
        image: situps,
        description: 'An exercise designed to strengthen the abdominal muscles, in which a person sits up from a supine position without using the arms for leverage.',
        instruction: 'After pressing the start button, quickly get into the sit-up position with your back laid against the ground and hands cupped over your ears. Keep you body still to ensure proper calibration. Once calibration is done, a bell sound can be heard to indicate the start of the exercise.',
        exercise: 'Sit-Ups',
        to: '/exercise/situps'
      }
    case 'bicepcurls':
      return {
        image: comingsoon,
        description: 'Coming Soon in the Next Update!',
        instruction: '',
        exercise: 'Bicep Curls',
        to: '/'
      }
    case 'shoulderpress':
      return {
        image: comingsoon,
        description: 'Coming Soon in the Next Update!',
        instruction: '',
        exercise: 'Shoulder Press',
        to: '/'
      }
    default:
      return {
        description: 'error',
        instruction: 'error',
        exercise: 'error',
        to: '/'
      }
  }
}

const ExerciseInfo = ({ exerciseName }) => {
  const [open, setOpen] = useState(false);
  const Exercise = getInfo(exerciseName);

  return (
    <>
      <GenericHeaderButton
        label="Sign in/Sign up"
        variant="contained"
        onClick={() => setOpen(true)}>
        More Info
      </GenericHeaderButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <Card sx={{minWidth: "30vw"}}>
          <CardMedia
            image={Exercise.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h4">{Exercise.exercise}</Typography>
            <Typography variant="h5">Description</Typography>
            <Typography variant="body1">{Exercise.description}</Typography>
            <Divider sx={{ paddingTop: "1rem" }}></Divider>
            <Typography variant="h5">Calibration Instructions</Typography>
            <Typography variant="body1">{Exercise.instruction}</Typography>
            <GenericHeaderButton
              variant="contained"
              component={Link}
              to={Exercise.to}
              sx={{ marginTop: "1rem" }}>Attempt Now!</GenericHeaderButton>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};

export default ExerciseInfo;