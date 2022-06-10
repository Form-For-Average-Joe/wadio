import React from 'react';
import { Typography, Grid, Container, Box, TextField, Button, Stack } from '@mui/material';
import { AuthWrapper } from "./components/AuthWrapper";
import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { useUser } from 'reactfire';
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectNicknameR, setNicknameR, selectAgeR, setAgeR, selectWeightR, setWeightR, selectHeightR, setHeightR, resetUserData } from './features/userProfile/userProfileSlice';

const Settings = () => {
  const dispatch = useDispatch();

  const { data: user } = useUser();

  const [nickname, setNickname] = useState("Enter Name");
  const [age, setAge] = useState("Enter Age");
  const [weight, setWeight] = useState("Enter Weight");
  const [height, setHeight] = useState("Enter Height");

  const firestore = getFirestore();
  const auth = getAuth();
  const usr = auth.currentUser;
  const ref = doc(firestore, 'userData', usr.uid);

  const inner = async () => {
    return await getDoc(ref);
  };
  inner().then(res => {
    const data = res.data();
    if (data) { // not a first-time user
      setNickname(data.nickname);
      setAge(data.age);
      setWeight(data.weight);
      setHeight(data.height);
    }
  });

  const makeSave = (e) => {
    e.preventDefault();
    setDoc(doc(getFirestore(), "userData", user.uid), {
      nickname,
      age,
      weight,
      height,
    });
    alert("Successfully Saved!")
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
            //type="number"
          />
          <TextField
            label="Weight"
            defaultValue={weight}
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "#FFFFFF" }}
            onChange={(e) => setWeight(e.target.value)}
            //type="number"
          />
          <TextField
            label="Height"
            defaultValue={height}
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "#FFFFFF" }}
            onChange={(e) => setHeight(e.target.value)}
            //type="number"
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