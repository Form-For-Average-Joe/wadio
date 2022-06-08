import {Button, Grid} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {clearExerciseState, selectNameOfExercise, setFeedback} from "../features/exercise/exerciseSlice";
import {resetStageAndCount, selectCount, selectDuration, setIsCanStart} from '../features/userValues/userValuesSlice'
import {resetUserTime, selectMinutes, selectSeconds} from '../features/userProfile/userProfileSlice';
import exerciseValues from '../poseDetection/values';
import {Link} from 'react-router-dom';
import React from 'react';


const ContinueButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(clearExerciseState());
        dispatch(setIsCanStart(false));
        dispatch(resetStageAndCount());
        dispatch(resetUserTime());
        dispatch(setFeedback(""));
        exerciseValues.pushupval.isCalibrated = false;
        console.log("stats cleared");
    }

    return (
        <Button variant="contained" onClick={handleClick} component={Link} to="/">
            Continue
        </Button>
    );
};

export default ContinueButton;