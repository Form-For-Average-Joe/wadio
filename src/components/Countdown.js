import {Typography} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import {getDeadlineTime, getFlooredSeconds} from "../util";

//todo refactor with Timer.js
function Countdown({handleClose}) {
    const duration = 10;
    const intervalRef = useRef(null);
    const [timer, setTimer] = useState(duration % 60);

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = getFlooredSeconds(total);

        if (seconds <= 0) {
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
        <Typography variant="h1"> {timer} </Typography>
    )
}

export default Countdown;