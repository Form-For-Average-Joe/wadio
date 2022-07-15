import webcam from './webcam.js';
import { useState } from 'react';

const WorkerCode = () => {
  const [webcamInstance, setWebcamInstance] = useState(null);
  onmessage = function (e) {
    console.log('Worker: Message received from main script');
    webcam(e.webcamRef, e.streamRef, setWebcamInstance);
  }
  postMessage(webcamInstance);
}

export default WorkerCode;