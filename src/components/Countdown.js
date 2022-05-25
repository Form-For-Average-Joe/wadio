import { Typography, Card, Grid } from '@mui/material';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { setExercise, setIsStarted } from "../features/exercise/exerciseSlice";
import { resetStageAndCount } from "../features/userValues/userValuesSlice";
import { resetUserTime } from "../features/userProfile/userProfileSlice";
import { useDispatch } from 'react-redux';

function Countdown(handleClose) {
    const duration = 10
    const intervalRef = useRef(null);
    const [timer, setTimer] = useState('00');
    const dispatch = useDispatch();

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);

        if (seconds <= 0) {
            dispatch(setExercise('pushups'));
            dispatch(resetStageAndCount());
            dispatch(resetUserTime());
            dispatch(setIsStarted(true));
            handleClose();
        }

        return {
            total, seconds
        };
    }

    function startTimer(deadline) {
        let { total, seconds } = getTimeRemaining(deadline);
        if (total >= 0) {
            setTimer(seconds)
        } else {
            clearInterval(intervalRef.current);
        }
    }

    function clearTimer(endtime) {
        setTimer(duration % 60);

        if (intervalRef.current) clearInterval(intervalRef.current);
        const id = setInterval(() => {
            startTimer(endtime);
        }, 1000)
        intervalRef.current = id;
    }

    function getDeadlineTime() {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + duration);
        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadlineTime());
        return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }, []);

    return (
        <Typography variant="h1"> {timer} </Typography>
    )
}

export default Countdown;