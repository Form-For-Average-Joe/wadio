import {useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import AssessmentFinished from "./containers/AssessmentFinished";
import AssessmentInProgress from "./containers/AssessmentInProgress";
import {setExercise} from "./features/exercise/exerciseSlice";
import webcam from './poseDetection/webcam.js';

const SitupsAssessment = () => {
  const dispatch = useDispatch();

  let stream = useRef(null);

  dispatch(setExercise('situps'));

  useEffect(() => {
    webcam(stream);
    // cleanup function stops webcam
    return () => {
      stream.current.getTracks().forEach(track => track.stop());
    }
  }, []) // [] here means no dependencies, so we only render webcam once for performance boost

  return <AssessmentInProgress/>;
}

export default SitupsAssessment;