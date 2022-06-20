import { Card, Typography, Grid } from '@mui/material';
// import Button from "@mui/material/Button";
// import {useDispatch} from "react-redux";
// import {incrementCount, setStage} from '../features/exercise/exerciseSlice';
import {useSelector} from "react-redux";
import {selectCount, selectDifficultyLevel} from '../features/exercise/exerciseSlice';
import { selectFeedback } from '../features/exercise/exerciseSlice';

function difficulty(e) {
    switch (e) {
        case 0:
            return "Hellish";
        case 1:
            return "IPPT";
        case 2:
            return "Heavenly";
        default:
            return "ERROR";
    }
}

const RepCounter = () => {
    const count = useSelector(selectCount);
    const feedback = useSelector(selectFeedback);
    const difficultyIndex = useSelector(selectDifficultyLevel);

    // const dispatch = useDispatch();
    //
    // function handleIncrease() {
    //     dispatch(incrementCount());
    //     dispatch(setStage(2));
    // }

    return (
        <Card sx={{
            backgroundColor: "#CCCCCC", paddingTop: "1rem", paddingBottom: "1rem",
            paddingLeft: "1rem", paddingRight: "1rem"
        }}>
            <Card sx={{ marginBottom: "0.5rem", paddingTop: "1rem", paddingBottom: "1rem" }}>
                <Typography variant="h1" align="center"> {count} </Typography>
            </Card>
            <Card sx={{ minHeight: "6rem", marginBottom: "0.5rem", paddingTop: "1rem", paddingBottom: "1rem" }}>
                <Typography variant="h5" align="center"> {feedback} </Typography>
            </Card>
            <Card>
                <Grid container spacing={2} direction="row" justifyContent="center"
                sx={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                    <Grid item>
                        <Typography variant="h6"> Difficulty: {difficulty(difficultyIndex)} </Typography>
                    </Grid>
                    {/*<Grid item>*/}
                    {/*    <Grid container direction="row" spacing={2} style={{ marginBottom: "1rem" }}>*/}
                    {/*        <Grid item>*/}
                    {/*            <Button variant="contained" onClick={() => handleIncrease()}>Do a Push-Up!</Button>*/}
                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Grid>
            </Card>
        </Card>
    )
}

export default RepCounter;