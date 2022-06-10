import React from 'react';
import { Typography, Grid, Container, Box, TextField, Button, Stack } from '@mui/material';
import { AuthWrapper } from "./components/AuthWrapper";
import { useState } from 'react';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { useUser } from 'reactfire';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Settings = () => {
  const [nickname, setNickname] = useState("Joe");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  const { data: user } = useUser();

  const makeSave = (e) => {
    e.preventDefault();
    setDoc(doc(getFirestore(), "userData", user.uid), {
      nickname: nickname,
      age: age,
      weight: weight,
      height: height,
    });
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
      <Grid align="center" sx={{marginTop: "1rem"}}>
        <Button variant="contained"
                onClick={makeSave}
                sx={{backgroundColor: "#666666"}}>
          Save
        </Button>
      </Grid>
    </AuthWrapper>
  )
}

export default Settings;