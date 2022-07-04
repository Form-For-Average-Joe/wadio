import {useEffect, useRef, useState} from 'react';
import AssessmentInProgress from "./containers/AssessmentInProgress";
import {setExercise} from "./features/exercise/exerciseSlice";
import webcam from './poseDetection/webcam.js';
import {useDispatch} from "react-redux";
import stageChangeEmitter from "./poseDetection/eventsFactory";
import {pushupsListeners, situpListeners} from "./poseDetection/eventsListeners";
import { exercises } from "./util";

const ExerciseAssessment = ({nameOfExercise}) => {
  const dispatch = useDispatch();
  const [webcamInstance, setWebcamInstance] = useState(null);

  let streamRef = useRef(null);

  dispatch(setExercise(nameOfExercise));

  useEffect(() => {
    //todo temp way to select the listeners, fix when we add new exercises!!!
    const listeners = nameOfExercise === exercises[0] ? pushupsListeners : situpListeners;
    for (const listener in pushupsListeners) {
      stageChangeEmitter.addListener(listener, listeners[listener]);
    }
    webcam(streamRef, setWebcamInstance)
    // cleanup function stops webcam
    return () => {
      if (streamRef && streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  }, []) // [] here means no dependencies, so we only render webcam once for performance boost

  return <AssessmentInProgress webcam={webcamInstance}/>;
}

export default ExerciseAssessment;