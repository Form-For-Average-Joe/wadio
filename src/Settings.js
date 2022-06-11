import React from 'react';
import { Typography, Grid, Box, TextField, Button, Stack, Switch } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AuthWrapper } from "./components/AuthWrapper";
import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { useUser } from 'reactfire';
import { Link } from 'react-router-dom';

const Settings = () => {
  const { data: user } = useUser();

  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("0");
  const [anonymous, setAnonymous] = useState(false)

  useEffect(() => {
    if (user) {
      const firestore = getFirestore();
      const ref = doc(firestore, user.uid, 'userData');

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
          setGender(data.gender);
          setAnonymous(data.anonymous);
        }
      });
    }
  }, [user])

  const makeSave = (e) => {
    setDoc(doc(getFirestore(), user.uid, 'userData'), {
      nickname,
      age: +age,
      weight: +weight,
      height: +height,
      gender,
      anonymous,
    });
  }

  const handleGender = (event, newGender) => {
    setGender(newGender);
  };

  const handleAnonymous = (event, newAnonymous) => {
    setAnonymous(newAnonymous);
  };

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
        alignItems="center"
        sx={{
          width: "30ch",
          paddingTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem",
          backgroundColor: "#FFFFFF", margin: "auto", marginTop: "1rem"
        }}
        spacing={2}
        autoComplete="off"
      >
        <TextField
          label="Nickname"
          value={nickname}
          variant="outlined"
          type={'text'}
          size="small"
          sx={{ backgroundColor: "#FFFFFF", marginTop: "0.5rem" }}
          onChange={(e) => setNickname(e.target.value)}
        />
        <TextField
          label="Age"
          value={age}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setAge(e.target.value)}
          type="number"
        />
        <TextField
          label="Weight"
          value={weight}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setWeight(e.target.value)}
          type="number"
        />
        <TextField
          label="Height"
          value={height}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setHeight(e.target.value)}
          type="number"
        />
        <ToggleButtonGroup
          color="standard"
          value={gender}
          exclusive
          onChange={handleGender}
        >
          <ToggleButton value="0">Male</ToggleButton>
          <ToggleButton value="1">Female</ToggleButton>
          <ToggleButton value="2">Others</ToggleButton>
        </ToggleButtonGroup>
        <Grid container spacing={0} direction="column" alignItems="center">
          <Grid item>
            <Switch checked={anonymous} onChange={handleAnonymous}>
              Anonymous
            </Switch>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" sx={{ color: "#000000" }}>
              Stay Anonymous?
            </Typography>
          </Grid>
        </Grid>
      </Stack>

      <Grid align="center" sx={{ marginTop: "1rem" }}>
        <Button variant="contained"
          component={Link}
          to={"/profile"}
          onClick={makeSave}
          sx={{ backgroundColor: "#666666" }}>
          Save
        </Button>
      </Grid>
    </AuthWrapper>
  )
}

export default Settings;