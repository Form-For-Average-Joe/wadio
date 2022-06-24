import { Card } from '@mui/material';
import { useState } from 'react';
import { Typography, Grid, Box, TextField, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const FriendsStuff = () => {
  const [code, setCode] = useState("");
  const [newCode, setNewCode] = useState("New Code");


  // need to gen code
  // need to filter res by code
  // need to check display of such code on leaderboard.js

  const makeSave = (e) => {
    //searches redis for existing group code
    //if found but already in group, alert user
    //else, download firestore leaderboard array, append and resend to firestore, replacing the previous version
    //then, goes to the leaderboard page, in which the new leaderboard should be included in the list
    //if not found, alert the user that the code is not found
  }

  const generateNewCode = () => {
    //generate new random code
    //download firestore leaderboard array, append and resend to firestore, replacing the previous version
    //user is now in his own created group
    //setNewCode and store to redis
  }

  return (
    <>
      <Card sx={{backgroundColor: "#000000", width: "55vw"}}>
        <Grid container direction="row" justifyContent="space-evenly">
          <Grid item>
            <Typography align="center" variant="h6" sx={{ paddingTop: "2rem", color: "#FFFFFF" }}>Join a Private Leaderboard</Typography>
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
                label="Group Code"
                value={code}
                variant="outlined"
                type={'text'}
                size="small"
                sx={{ backgroundColor: "#FFFFFF" }}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "1rem" }}>
              <Button variant="contained"
                type="submit"
                label="Submit"
                onClick={makeSave}
                component={Link}
                to={"/leaderboard"}
                sx={{ backgroundColor: "#666666" }}>
                Join Group
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Typography align="center" variant="h6" sx={{ paddingTop: "2rem", color: "#FFFFFF" }}>Create a New Leaderboard</Typography>
            <Stack
              component="div"
              alignItems="center"
              sx={{
                width: "30ch",
                paddingTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem",
                backgroundColor: "#FFFFFF", margin: "auto", marginTop: "1rem"
              }}
              spacing={2}
              autoComplete="off"
            >
              <Typography variant="h5">{newCode}</Typography>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "1rem" }}>
              <Button variant="contained"
                component={Link}
                to={"/leaderboard"}
                sx={{ backgroundColor: "#666666" }}
                onClick={generateNewCode}>
                Generate Group Code
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

const Home = () => {
  return (
    <>
    <Typography align="center" variant="h4" sx={{ paddingTop: "3rem", color: "#FFFFFF" }}>Friends</Typography>
    <Grid container justifyContent="center" sx={{marginBottom: "2rem"}}>
      <Grid item>
      <FriendsStuff />
      </Grid>
      {/*<Container sx={{ px: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }, py: { xs: 1, sm: 2, md: 9, lg: 9, xl: 9 } }}>*/}
      {/*</Container>*/}
    </Grid>
    </>
  )
}

export default Home;