import { Paper } from '@mui/material';
import { getIdToken } from "firebase/auth";
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from "reactfire";
import LoadingSpinner from "./components/LoadingSpinner";
import { associateUserIdToGroupCode, saveCodetostoreToFirestore } from "./util";
import CreateGroup from './components/CreateGroup';
import JoinGroup from './components/JoinGroup';

//todo Make it an expiring group code
const FriendsStuff = () => {
  const { status, data: user } = useUser();
  const navigate = useNavigate();

  const createRelationBetweenGroupCodeAndUser = (codeToStore, leaderboardName) => {
    saveCodetostoreToFirestore(user,codeToStore)
      .then(async () => {
        await getIdToken(user, true).then(async (idToken) => {
          await associateUserIdToGroupCode(codeToStore, idToken, leaderboardName);
        });
        navigate('/leaderboard');
      })
  }

  if (status === 'loading') {
    return <LoadingSpinner/>;
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
            <JoinGroup createRelationBetweenGroupCodeAndUser={createRelationBetweenGroupCodeAndUser}/>
          </Grid>
          <Grid item>
            <CreateGroup createRelationBetweenGroupCodeAndUser={createRelationBetweenGroupCodeAndUser}/>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

const Friends = () => {
  return (
    <>
      <Grid container justifyContent="center" sx={{ marginBottom: "2rem" }}>
        <Grid item>
          <FriendsStuff />
        </Grid>
      </Grid>
    </>
  )
}

export default Friends;
