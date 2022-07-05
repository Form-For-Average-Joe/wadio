import { Card, CardContent, CardMedia, Typography, Divider } from "@mui/material";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import GenericHeaderButton from "./GenericHeaderButton";
import { Link } from "react-router-dom";
import pushups from '../assets/pushups.png';
import situps from '../assets/situps.png';
import comingsoon from '../assets/comingsoon.png';

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
        description: 'The biceps curl is a highly recognizable weight-training exercise that works the muscles of the upper arm, and to a lesser extent, those of the lower arm. It is a great exercise for seeing results in strength and definition.',
        instruction: 'After pressing the start button, quickly get into postion with the side of your body directly perpendicular to the camera and your entire upper body in view. Keep you body still to ensure proper calibration. Once calibration is done, a bell sound can be heard to indicate the start of the exercise.',
        exercise: 'Bicep Curls',
        to: '/'
      }
    case 'shoulderpress':
      return {
        image: comingsoon,
        description: 'The overhead shoulder press works the deltoid muscle of the shoulder. In addition to increasing shoulder strength, the standing dumbbell overhead press engages the core for stability throughout the movement.',
        instruction: 'After pressing the start button, quickly get into postion facing the camera with your entire upper body and arms in view. Raise the weights to the starting position and keep your elbows at a 90 degrees angle. Keep you body still to ensure proper calibration. Once calibration is done, a bell sound can be heard to indicate the start of the exercise.',
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

const attemptButton = (exerciseName, link) => {
  return exerciseName === 'locked' ? null :
    <GenericHeaderButton
      variant="contained"
      component={Link}
      to={link}
      sx={{ marginTop: "1rem", backgroundColor: "#FA9C1B", color: "#000000" }}>Attempt Now!</GenericHeaderButton>
}

const ExerciseInfo = ({ exerciseName }) => {
  const [open, setOpen] = useState(false);
  const Exercise = getInfo(exerciseName);

  return (
    <>
      <GenericHeaderButton
        label="Sign in/Sign up"
        variant="contained"
        sx={{ backgroundColor: "#000000" }}
        onClick={() => setOpen(true)}>
        More Info
      </GenericHeaderButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <Card sx={{ minWidth: "30vw" }}>
          {/* <CardMedia
            component={'img'}
            image={Exercise.image}
          /> */}
          <CardContent>
            <Typography gutterBottom variant="h4">{Exercise.exercise}</Typography>
            <Typography variant="h5">Description</Typography>
            <Typography variant="body1">{Exercise.description}</Typography>
            <Divider sx={{ paddingTop: "1rem" }} />
            <Typography variant="h5">Calibration Instructions</Typography>
            <Typography variant="body1">{Exercise.instruction}</Typography>
            {attemptButton(exerciseName, Exercise.to)}
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};

export default ExerciseInfo;
