import {useEffect, useRef, useState} from 'react';
import AssessmentInProgress from "./containers/AssessmentInProgress";
import {setExercise} from "./features/exercise/exerciseSlice";
import webcam from './poseDetection/webcam.js';
import {useDispatch} from "react-redux";
import stageChangeEmitter from "./poseDetection/eventsFactory";
import { globalListeners, pushupsListeners, situpsListeners, bicepcurlsListeners, shoulderpressListeners } from "./poseDetection/eventsListeners";
import { exerciseIds } from "./util";

const chooseListener = (nameOfExercise) => {
  switch (nameOfExercise) {
    case exerciseIds[0]: return pushupsListeners;
    case exerciseIds[1]: return situpsListeners;
    case exerciseIds[2]: return bicepcurlsListeners;
    case exerciseIds[3]: return shoulderpressListeners;
    default: console.log("listener error, see exerciseAssessment.js");
  }
}

const ExerciseAssessment = ({nameOfExercise}) => {
  const dispatch = useDispatch();
  const [webcamInstance, setWebcamInstance] = useState(null);

  let streamRef = useRef(null);

  dispatch(setExercise(nameOfExercise));

  useEffect(() => {
    for (const listener in globalListeners) {
      stageChangeEmitter.addListener(listener, globalListeners[listener]);
    }
    //todo temp way to select the listeners, fix when we add new exercises!!!
    const listeners = chooseListener(nameOfExercise); //nameOfExercise === exerciseIds[0] ? pushupsListeners : situpListeners;
    for (const listener in listeners) {
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