import React from 'react';
import { Box, Card, CardMedia, CssBaseline, Grid } from '@material-ui/core';
import useStyles from './Components/styles';
import MemberHeader from './Components/MemberHeader';
import StartButton from './Components/StartButton';
import StopButton from './Components/StopButton';
import webcam from './poseDetection/webcam.js'
import { useDispatch } from 'react-redux';
import { setExercise } from './features/exercise/exerciseSlice'
import Timer from './Components/Timer';

const PushupsAssessment = () => {
  const classes = useStyles();
  /*const dispatch = useDispatch();

  const [video, setVideo] = React.useState(false);
  const canvasRef = React.useRef(null);
  const [context, setContext] = React.useState(null);
  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
        if (video) {
          webcam(context);
        }
      }
    }
  }, [video, context]);

  const handleStart = () => {
    dispatch(setExercise('pushups'))
    setVideo(true);
  };

  const handleStop = () => {
    setVideo(false);
  };

  const c = <CardMedia
    className={classes.cardMedia}
    image="https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2019/05/PERFECT-PUSHUP.gif?w=1155&h=812"
    title="pushups"
  />;

  const d = <Box id="canvas-wrapper">
    <CardMedia
      id="video"
      className={classes.cardMedia}
      component="video"
      src="" />
  </Box>;

  const cardMedia = video ? d : c;*/

  return (
    <CssBaseline>
      <div className={classes.root}>
        <MemberHeader />
        <Grid container
          justify="center"
          style={{ marginTop: "8rem", marginBottom: "8rem" }}
          spacing={2}>
          <Grid item xs={6}>
            <CardMedia
              className={classes.cardMedia}
              image="https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2019/05/PERFECT-PUSHUP.gif?w=1155&h=812"
              title="pushups"
            />
          </Grid>
          <Grid item xs={2}>
            <Timer />
          </Grid>
        </Grid>
      </div>
    </CssBaseline>
  );
}

export default PushupsAssessment;