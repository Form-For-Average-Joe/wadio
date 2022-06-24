import { Card, CardContent, CardMedia, Container, Paper } from '@mui/material';
import cover from './assets/cover.jpeg';
import ExerciseInfo from './components/ExerciseInfo';
import GenericHeaderButton from './components/GenericHeaderButton';
import axios from "axios";
import { Fragment, useState, useEffect } from 'react';
import { Typography, Grid, Box, TextField, Button, Stack, Switch, Snackbar, Alert } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useUser } from 'reactfire';
import { Link, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { fetchUserData, getUserNickname } from "./util";
import { updateProfile, reload } from 'firebase/auth';

const Settings = () => {const isInvalidValue = (value) => value === "0" || value === "";
  const { data: user } = useUser();

  const [nickname, setNickname] = useState(getUserNickname(user));
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("0");
  const [anonymous, setAnonymous] = useState(false)
  const [totalCal, setTotalCal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
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
      fetchUserData(user.uid, (data) => {
        setNickname(data.nickname);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);
        setGender(data.gender);
        setAnonymous(data.anonymous);
        setTotalCal(data.totalCal);
        setPhotoURL(data.photoURL || "");
      });
    }
  }, [user])

  const makeSave = (e) => {
    if (isFormValid()) {
      axios.post('http://13.228.86.60/user/addUserStatistics/' + user.uid, {
        userProfileStatistics: {
          nickname,
          age: +age,
          weight: +weight,
          height: +height,
          gender,
          anonymous,
          totalCal,
          photoURL
        }
      });
      reload(user);
    } else {
      e.preventDefault();
    }
  }

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
          label="URL of your photo"
          value={photoURL}
          variant="outlined"
          type={'text'}
          size="small"
          sx={{ backgroundColor: "#FFFFFF", marginTop: "0.5rem" }}
          onChange={(e) => {
            setPhotoURL(e.target.value);
            updateProfile(user, {photoURL: e.target.value});
          }}
        />
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "1rem" }}>
        <Button variant="contained"
                type="submit"
                label="Submit"
                onClick={makeSave}
                component={Link}
                to={"/profile"}
                sx={{ backgroundColor: "#666666" }}>
          Add group code
        </Button>
      </Box>
    </>
  );
}

const Home = () => {
  return (
    <Box>
      {/*<Container sx={{ px: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }, py: { xs: 1, sm: 2, md: 9, lg: 9, xl: 9 } }}>*/}
      {/*</Container>*/}
      <Settings/>
    </Box>
  )
}

export default Home;