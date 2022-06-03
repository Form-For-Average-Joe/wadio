import {Box, CardMedia, Grid} from "@mui/material";
import {useSelector} from "react-redux";
import {selectIsStarted} from "../features/exercise/exerciseSlice";
import {webcamStyles} from "../util";
import AssesmentNotStarted from "./AssessmentNotStarted";
import AssessmentStart from "./AssessmentStart";

export default function AssessmentInProgress() {
  //todo if isStarted is only used in pushupsassessment, there is no need to use global redux, can use local state
  const isStarted = useSelector(selectIsStarted);

  const sidebar = isStarted ? <AssessmentStart/> : <AssesmentNotStarted/>;

  return (
    <Box sx={{px: 1}}>
      <Grid container
            justifyContent="center"
            spacing={1}>
        <Grid item xs={8}>
          <CardMedia variant='webcam'
                     style={webcamStyles.video}
                     id="video"
                     component="video"
                     src=""/>
        </Grid>
        <Grid item xs={4}>
          {sidebar}
        </Grid>
      </Grid>
    </Box>
  );
}