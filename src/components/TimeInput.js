import { Typography, Button, Card, Grid} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {selectDuration, setDuration} from "../features/exercise/exerciseSlice";

const TimeInput = () => {
    const dispatch = useDispatch();
    const duration = useSelector(selectDuration);

    const time = (Math.floor(duration / 60) < 10 ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60))
        + ':' +
        ((duration % 60) < 10 ? '0' + (duration % 60) : (duration % 60));

    function handleIncrease() {
        if (duration >= 3590) {
            return;
        }
        dispatch(setDuration(duration + 10));
    }

    function handleDecrease() {
        if (duration <= 0) {
            return;
        }
        dispatch(setDuration(duration - 10));
    }

    return (
        <Card>
            <Grid container spacing={1} direction="column" alignItems="center">
                <Grid item alignItems="center" sx={{ marginTop: "1rem" }}>
                    <Typography variant="h3"> {time} </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={2}>
                        <Grid item sx={{ my: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}>
                            <Button variant="contained" onClick={() => handleIncrease()} sx={{backgroundColor: "#555555"}}>Increase</Button>
                        </Grid>
                        <Grid item sx={{ my: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}>
                            <Button variant="contained" onClick={() => handleDecrease()} sx={{backgroundColor: "#555555"}}>Decrease</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default TimeInput;