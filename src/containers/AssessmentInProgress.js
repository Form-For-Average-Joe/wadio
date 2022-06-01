import {CardMedia, Grid} from "@mui/material";
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