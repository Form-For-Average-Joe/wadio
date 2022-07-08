import { Paper } from '@mui/material';
import { get } from "axios";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from 'react';
import { Typography, Grid, Box, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid/non-secure';
import { useUser } from "reactfire";
import { associateGroupCodeToUserId, associateUserIdToGroupCode, isInvalidTextInput } from "./util";

const FriendsStuff = () => {
  const { status, data: user } = useUser();
  const [existingCode, setExistingCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [leaderboardName, setLeaderboardName] = useState("");
  const navigate = useNavigate();

  const isLeaderboardNameFormValid = () => {
    return !(isInvalidTextInput(leaderboardName));
  };

  // need to filter res by code

  // Make it an expiring group code

  const isGroupCodePresent = async (groupCode) => await get('https://13.228.86.60/isKeyPresent/' + groupCode);

  const createRelationBetweenGroupCodeAndUser = (codeToStore, leaderboardName) => {
    const ref = doc(getFirestore(), user.uid, 'groupCodes');
    getDoc(ref).then(async (docSnap) => {
      await associateGroupCodeToUserId(docSnap.data(), codeToStore, user.uid);
    })
      .then(async () => {
        await associateUserIdToGroupCode(codeToStore, user.uid, leaderboardName);
        navigate('/leaderboard');
      })
  }

  const addNewCodeToUser = async (e) => {
    let result;
    try {
      result = await isGroupCodePresent(existingCode);
    } catch (err) {
      e.preventDefault();
    }
    const { isKeyPresent } = result.data;
    if (isKeyPresent) {
      createRelationBetweenGroupCodeAndUser(existingCode, "");
    }
    else {
      e.preventDefault();
    }
    //else, download firestore leaderboard array, append and resend to firestore, replacing the previous version
    //then, goes to the leaderboard page, in which the new leaderboard should be included in the list
    //if not found, alert the user that the code is not found
  }

  const generateNewCode = async () => {
    let res = false;
    let possibleGroupCode;
    while (!res) {
      possibleGroupCode = nanoid();
      res = await isGroupCodePresent(possibleGroupCode);
    }
    setNewCode(possibleGroupCode);
  }

  const submitNewCode = (e) => {
    if (isLeaderboardNameFormValid()) {
      createRelationBetweenGroupCodeAndUser(newCode, leaderboardName);
    } else {
      e.preventDefault();
    }
  }

  return (
    <>
      <Paper variant="outlined"
        sx={{
          width: '100%', bgcolor: "#CCCCCC", maxWidth: { xs: '100vw', sm: '80vw', md: '70vw', lg: '60vw', xl: '60vw' },
          borderRadius: 3, borderColor: "#FFA500", borderWidth: 3, marginTop: "1rem"
        }}>
        <Typography align="center" variant="h4" sx={{ paddingTop: "2rem", color: "#000000" }}>Friends</Typography>
        <Grid container direction="row" justifyContent="space-evenly" spacing={12} sx={{ paddingLeft: "3rem", paddingRight: "3rem", paddingBottom: "2rem" }}>
          <Grid item>
            <Typography align="center" variant="h6" sx={{ paddingTop: "2rem", color: "#000000" }}>Join a Private
              Leaderboard</Typography>
            <Stack
              component="form"
              alignItems="center"
              sx={{
                width: "30ch",
                backgroundColor: "#CCCCCC", margin: "auto", marginTop: "1rem"
              }}
              spacing={2}
              autoComplete="off"
            >
              <TextField
                required
                label="Group Code"
                value={existingCode}
                variant="outlined"
                type={'text'}
                size="small"
                sx={{ backgroundColor: "#FFFFFF" }}
                onChange={(e) => {
                  setExistingCode(e.target.value);
                }}
              />
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "1rem" }}>
              <Button variant="contained"
                type="submit"
                label="Submit"
                onClick={addNewCodeToUser}
                sx={{ backgroundColor: "#666666", '&:hover': {backgroundColor: "#FFA500"} }}>
                Join Group
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Typography align="center" variant="h6" sx={{ paddingTop: "2rem", color: "#000000" }}>Create a New
              Leaderboard</Typography>
            {newCode ?
              <>
                <Stack
                  component="form"
                  alignItems="center"
                  sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem",
                    backgroundColor: "#CCCCCC", margin: "auto", marginTop: "1rem"
                  }}
                  spacing={2}
                  autoComplete="off">
                  <Typography variant="h5">{newCode}</Typography>
                  <TextField
                    required
                    label="Leaderboard Name"
                    value={leaderboardName}
                    error={isInvalidTextInput(leaderboardName)}
                    variant="outlined"
                    type={'text'}
                    size="small"
                    sx={{ backgroundColor: "#FFFFFF", marginTop: "0.5rem" }}
                    onChange={(e) => {
                      setLeaderboardName(e.target.value);
                      // updateProfile(user, {displayName: e.target.value});
                    }}
                  />
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained"
                    type="submit"
                    label="Submit"
                    sx={{ backgroundColor: "#666666", '&:hover': {backgroundColor: "#FFA500"} }}
                    onClick={submitNewCode}>
                    Use Group Code
                  </Button>
                </Box>
              </> : <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "1rem" }}>
                <Button variant="contained"
                  sx={{ backgroundColor: "#666666", '&:hover': {backgroundColor: "#FFA500"} }}
                  onClick={generateNewCode}>
                  Generate Group Code
                </Button>
              </Box>}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

const Home = () => {
  return (
    <>
      <Grid container justifyContent="center" sx={{ marginBottom: "2rem" }}>
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