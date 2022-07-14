import {useEffect, useRef, useState} from 'react';
import AssessmentInProgress from "./containers/AssessmentInProgress";
import {setExercise} from "./features/exercise/exerciseSlice";
import webcam from './poseDetection/webcam.js';
import {useDispatch} from "react-redux";
import stageChangeEmitter from "./poseDetection/eventsFactory";
import { globalListeners, pushupsListeners, situpsListeners, bicepcurlsListeners, shoulderpressListeners } from "./poseDetection/eventsListeners";
import { exerciseIds } from "./util";
import Worker from 'web-worker';
import worker_script from './poseDetection/worker';

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
  //const [webcamInstance, setWebcamInstance] = useState(null);
  const [webInstance, setWebInstance] = useState(null);

  let streamRef = useRef(null);

  let webcamRef = useRef(null);

  var worker = new Worker(worker_script);

  dispatch(setExercise(nameOfExercise));

  // console.count("Render")

  useEffect(() => {
    for (const listener in globalListeners) {
      stageChangeEmitter.addListener(listener, globalListeners[listener]);
    }
    const listeners = chooseListener(nameOfExercise);
    for (const listener in listeners) {
      stageChangeEmitter.addListener(listener, listeners[listener]);
    }
    if (!(webcamRef?.current)) {
      worker.postMessage({webcamRef, streamRef});
      //webcam(webcamRef, streamRef, setWebcamInstance)
      worker.onmessage = function(e) {
        setWebInstance(e);
        console.log('Message received from worker');
      }
    }
    // cleanup function stops any running webcam stream, unmounts event listeners, and allows a new webcam instance to be started
    return () => {
      if (streamRef && streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        webcamRef.current = false;
      }
      for (const listener in globalListeners) {
        stageChangeEmitter.removeListener(listener, globalListeners[listener]);
      }
      const listeners = chooseListener(nameOfExercise); //nameOfExercise === exerciseIds[0] ? pushupsListeners : situpListeners;
      for (const listener in listeners) {
        stageChangeEmitter.removeListener(listener, listeners[listener]);
      }
    }
  }, []) // [] here means no dependencies, so we only render webcam once for performance boost

  return <AssessmentInProgress webcam={webInstance}/>;
}

export default ExerciseAssessment;