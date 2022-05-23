import React from 'react';
import {CardMedia, Grid} from '@mui/material';
import webcam from './poseDetection/webcam.js'
import {useSelector} from 'react-redux';
import {selectIsStarted} from './features/exercise/exerciseSlice'
import AssessmentStart from "./containers/AssessmentStart";
import AssesmentNotStarted from './containers/AssessmentNotStarted';
import {webcamStyles} from "./util";

const PushupsAssessment = () => {
  const isStarted = useSelector(selectIsStarted);

  let stream = React.useRef(null);

  React.useEffect(() => {
    webcam(stream);
    // cleanup function stops webcam
    return () => {
      stream.current.getTracks().forEach(track => track.stop());
    }
  }, []) // [] here means no dependencies, so we only render webcam once for performance boost

  const sidebar = isStarted ? <AssessmentStart/> : <AssesmentNotStarted/>;

  return (
    <Grid container
          justifyContent="center"
          style={{marginTop: "8rem", marginBottom: "8rem"}}
          spacing={2}>
      <Grid item xs={6}>
        <CardMedia variant='webcam'
                   style={webcamStyles.video}
                   id="video"
                   component="video"
                   src=""/>
      </Grid>
      <Grid item xs={2}>
        {sidebar}
      </Grid>
    </Grid>
  );
}

export default PushupsAssessment;