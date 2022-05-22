import React from 'react';
import {CardMedia, Grid} from '@mui/material';
import webcam from './poseDetection/webcam.js'
import {useSelector} from 'react-redux';
import {selectIsStarted} from './features/exercise/exerciseSlice'
import AssessmentStart from "./containers/AssessmentStart";
import AssesmentNotStarted from './containers/AssessmentNotStarted';

const PushupsAssessment = () => {
  const isStarted = useSelector(selectIsStarted);

  // to mirror the webcam
  const styles = {
    video: {
      WebkitTransform: "scaleX(-1)",
      transform: "scaleX(-1)",
    }
  };

  React.useEffect(() => {
    webcam();
  }, []) // [] here means no dependencies, so we only render webcam once for performance boost

  const sidebar = isStarted ? <AssessmentStart/> : <AssesmentNotStarted/>;

  return (
    <Grid container
          justifyContent="center"
          style={{marginTop: "8rem", marginBottom: "8rem"}}
          spacing={2}>
      <Grid item xs={6}>
        <CardMedia variant='webcam'
                   style={styles.video}
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