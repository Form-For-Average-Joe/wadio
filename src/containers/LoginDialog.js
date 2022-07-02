import { Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import GenericHeaderButton from "../components/GenericHeaderButton";
import firebase from "firebase/compat/app";
import StyledFirebaseAuth from "../components/StyledFirebaseAuth";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginDialog() {
  const [open, setOpen] = useState(false);
  const firebaseAuth = getAuth();

  const signInGuest = () => {
    signInWithEmailAndPassword(firebaseAuth, 'guest@ffaj.com', 'password1#');
  }

  return (
    <>
      <GenericHeaderButton
        label="Sign in/Sign up"
        onClick={() => setOpen(true)}>
        Sign In
      </GenericHeaderButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="Login options"
        aria-describedby="Select your login options"
      >
        <StyledFirebaseAuth uiConfig={{
          signInFlow: 'popup', signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
          ],
          callbacks: {
            signInSuccessWithAuthResult: () => false,
          },
        }}/>
        <Divider>Or</Divider>
        <Button variant={'contained'} sx={{
          backgroundColor: "#00695C",
          whiteSpace: 'nowrap',
          height: '38px',
          textTransform: 'none',
          my: 2,
          mx: 3,
        }} onClick={signInGuest}>
          <PersonOutlineIcon sx={{
            marginLeft: 0,
            marginRight: 1,
          }}/>
          <Typography sx={{ fontWeight: '500', fontSize: 14 }} variant={'body1'}>
            Use a guest account
          </Typography>
        </Button>
      </Dialog>
    </>
  );
};