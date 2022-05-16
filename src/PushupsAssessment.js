import React from 'react';
import {Box, Card, CardMedia, CssBaseline, Grid} from '@material-ui/core';
import useStyles from './Components/styles';
import MemberHeader from './Components/MemberHeader';
import StartButton from './Components/StartButton';
import StopButton from './Components/StopButton';
import webcam from './temp/src/webcam.js'
import './Video.css';
import { useDispatch } from 'react-redux';
import { setExercise } from './features/exercise/exerciseSlice'

const PushupsAssessment = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
    <canvas id="output" ref={canvasRef} width={500} height={500} style={{
      border: '2px solid #000',
      marginTop: 10,
    }}
    />
  </Box>;

  const cardMedia = video ? d : c;

  return (
    <CssBaseline>
      <div className={classes.root}>
        <MemberHeader/>
        <Grid container
              alignItems="center"
              justify="center">
          <Grid item xs={9}>
            <Card className={classes.CameraFeedback}>
              {cardMedia}
              <Grid container spacing={4} justify="center" style={{marginBottom: "0.5rem", marginTop: "0.5rem"}}>
                <Grid item>
                  <StartButton handleStart={handleStart}/>
                </Grid>
                <Grid item>
                  <StopButton handleStop={handleStop}/>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    </CssBaseline>
  );
}

export default PushupsAssessment;