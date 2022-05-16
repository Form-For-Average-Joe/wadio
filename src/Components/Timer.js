import { Typography, AppBar, Button, Card, TextField, Grid, FormControl } from '@material-ui/core';
import useStyles from './styles';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import StartButton from './StartButton';
import StopButton from './StopButton';
import values from '../poseDetection/values';

function Timer() {
    const duration = values.assess.duration;
    const intervalRef = useRef(null);
    const [timer, setTimer] = useState('00:00');

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);

        values.assess.minutes = minutes;
        values.assess.seconds = seconds;

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
        setTimer((Math.floor(duration / 60) == 0 ? '00' : Math.floor(duration / 60)) + ':'
            + ((duration % 60) == 0 ? '00' : (duration % 60)));

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

    function handleStart() {
        if (intervalRef.current) clearInterval(intervalRef.current);
        clearTimer(getDeadlineTime());
    }

    function handleStop() {
        if (intervalRef.current) clearInterval(intervalRef.current);
        clearTimer(getDeadlineTime() - duration);
    }

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