import {useEffect, useRef} from 'react';
import AssessmentInProgress from "./containers/AssessmentInProgress";
import {setExercise} from "./features/exercise/exerciseSlice";
import webcam from './poseDetection/webcam.js';
import {useDispatch} from "react-redux";

const ExerciseAssessment = ({nameOfExercise}) => {
  const dispatch = useDispatch();

  let stream = useRef(null);

  dispatch(setExercise(nameOfExercise));

  useEffect(() => {
    webcam(stream);
    // cleanup function stops webcam
    return () => {
      if (stream && stream.current) {
        stream.current.getTracks().forEach(track => track.stop());
      }
    }
  }, []) // [] here means no dependencies, so we only render webcam once for performance boost

  return <AssessmentInProgress/>;
}

export default ExerciseAssessment;