import {Card, Grid, Typography} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUserTime} from "../features/userProfile/userProfileSlice";
import {setIsStarted} from "../features/exercise/exerciseSlice";
import {selectDuration} from '../features/userValues/userValuesSlice';
import {getDeadlineTime, getFlooredMinutes, getFlooredSeconds} from "../util";

//todo the LastAttemptStats is broken because of the timer issue, but we are looking to migrate anyways to another JS package
function Timer({setIsFinished}) {
    //useSelector here, in case we change duration elsewhere, this can rerender
    const duration = useSelector(selectDuration);
    const intervalRef = useRef(null);
    const [timer, setTimer] = useState('00:00');
    const dispatch = useDispatch();

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = getFlooredSeconds(total);
        const minutes = getFlooredMinutes(total);

        dispatch(setUserTime({minutes, seconds}));

        if (seconds <= 0) {
            dispatch(setIsStarted(false));
            setIsFinished(true);
        }

        return {
            total, minutes, seconds
        };
    }

    function startTimer(deadline) {
        let { total, minutes, seconds } = getTimeRemaining(deadline);
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':' +
                (seconds > 9 ? seconds : '0' + seconds)
            )
        } else {
            clearInterval(intervalRef.current);
        }
    }

    function clearTimer(endtime) {
        setTimer((Math.floor(duration / 60) === 0 ? '00' : Math.floor(duration / 60)) + ':'
            + ((duration % 60) === 0 ? '00' : (duration % 60)));

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            startTimer(endtime);
        }, 1000);
    }

    useEffect(() => {
        clearTimer(getDeadlineTime(duration));
        return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }, []);

    return (
        <Card>
            <Grid container spacing={3} direction="column" alignItems="center">
                <Grid item alignItems="center" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                    <Typography variant="h2"> {timer} </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Timer;