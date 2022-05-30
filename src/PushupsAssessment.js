import React from 'react';
import AssessmentFinished from "./containers/AssessmentFinished";
import AssessmentInProgress from "./containers/AssessmentInProgress";
import webcam from './poseDetection/webcam.js';

const PushupsAssessment = () => {
  const [isFinished, setIsFinished] = React.useState(false);

  let stream = React.useRef(null);

  React.useEffect(() => {
    webcam(stream);
    // cleanup function stops webcam
    return () => {
      stream.current.getTracks().forEach(track => track.stop());
    }
  }, []) // [] here means no dependencies, so we only render webcam once for performance boost

  return isFinished ? <AssessmentFinished/> : <AssessmentInProgress setIsFinished={setIsFinished}/>;
}

export default PushupsAssessment;