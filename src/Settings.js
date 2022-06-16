import { Fragment, useState, useEffect } from 'react';
import { Typography, Grid, Box, TextField, Button, Stack, Switch, Snackbar, Alert } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { useUser } from 'reactfire';
import { Link, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const isInvalidValue = (value) => value === "0" || value === "";

const Settings = () => {
  const { data: user } = useUser();

  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("0");
  const [anonymous, setAnonymous] = useState(false)
  const [totalCal, setTotalCal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { state } = useLocation();
  const isFormValid = () => {
    return !(isInvalidValue(age) || isInvalidValue(weight) || isInvalidValue(height));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small"/>
      </IconButton>
    </Fragment>
  );

  useEffect(() => {
    if (state?.openSnackbar) {
    setOpenSnackbar(true);
    }
  }, [state]);


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
          setTotalCal(data.totalCal);
        }
      });
    }
  }, [user])

  const makeSave = (e) => {
    if (isFormValid()) {
      setDoc(doc(getFirestore(), user.uid, 'userData'), {
        nickname,
        age: +age,
        weight: +weight,
        height: +height,
        gender,
        anonymous,
        totalCal
      });
    }
    else {
      e.preventDefault();
    }
  }

  const handleGender = (event, newGender) => {
    setGender(newGender);
  };

  const handleAnonymous = (event, newAnonymous) => {
    setAnonymous(newAnonymous);
  };

  return (
    <>
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
          required
          label="Age"
          value={age}
          error={isInvalidValue(age)}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setAge(e.target.value)}
          type="number"
        />
        <TextField
          required
          error={isInvalidValue(weight)}
          label="Weight"
          value={weight}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setWeight(e.target.value)}
          type="number"
        />
        <TextField
          required
          label="Height"
          value={height}
          error={isInvalidValue(height)}
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
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "1rem" }}>
        <Button variant="contained"
                type="submit"
                label="Submit"
                onClick={makeSave}
                component={Link}
                to={"/profile"}
                sx={{ backgroundColor: "#666666" }}>
          Save
        </Button>
      </Box>
      <Box>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnackbar}
          severity="info"
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          action={action}>
          <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
            Please fill up your details!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default Settings;
