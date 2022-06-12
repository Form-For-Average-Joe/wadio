import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import GenericHeaderButton from "./GenericHeaderButton";
import firebase from "firebase/compat/app";
import StyledFirebaseAuth from "./StyledFirebaseAuth";

export default function LoginDialog() {
  const [open, setOpen] = useState(false);

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
      </Dialog>
    </>
  );
};