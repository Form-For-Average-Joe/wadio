import React from 'react';
import { Typography, Grid, Container, Box, TextField, Button, Stack } from '@mui/material';
import { AuthWrapper } from "./components/AuthWrapper";
import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { useUser } from 'reactfire';
import {useDispatch, useSelector} from "react-redux";
import { selectNicknameR, setNicknameR, selectAgeR, setAgeR, selectWeightR, setWeightR, selectHeightR, setHeightR } from './features/userProfile/userProfileSlice';

const Settings = () => {
  const { data: user } = useUser();
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState(useSelector(selectNicknameR));
  const [age, setAge] = useState(useSelector(selectAgeR));
  const [weight, setWeight] = useState(useSelector(selectWeightR));
  const [height, setHeight] = useState(useSelector(selectHeightR));

  const makeSave = (e) => {
    e.preventDefault();
    setDoc(doc(getFirestore(), "userData", user.uid), {
      nickname,
      age,
      weight,
      height,
    });

    dispatch(setNicknameR(nickname));
    dispatch(setAgeR(age));
    dispatch(setWeightR(weight));
    dispatch(setHeightR(height));

    alert("Your data has been successfully saved!")
  }

  return (
    <AuthWrapper fallback={
      <Box>
        <Typography sx={{ width: '100vw', height: '100vh' }} align='center' variant={"h1"}>Sign in to view this
          page!</Typography>
      </Box>
    }>
      <Typography align="center" variant="h4" sx={{ paddingTop: "1rem" }}>Settings</Typography>
      <Stack
        component="form"
        sx={{
          width: "30ch",
          paddingTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem",
          backgroundColor: "#FFFFFF", margin: "auto", marginTop: "1rem"
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Nickname"
          defaultValue={nickname}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setNickname(e.target.value)}
        />
        <TextField
          label="Age"
          defaultValue={age}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          label="Weight"
          defaultValue={weight}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setWeight(e.target.value)}
        />
        <TextField
          label="Height"
          defaultValue={height}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setHeight(e.target.value)}
        />
      </Stack>
      <Grid align="center" sx={{ marginTop: "1rem" }}>
        <Button variant="contained"
          onClick={makeSave}
          sx={{ backgroundColor: "#666666" }}>
          Save
        </Button>
      </Grid>
    </AuthWrapper>
  )
}

export default Settings;