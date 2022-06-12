import { useState } from 'react';
import { useAuth } from 'reactfire';
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  indexedDBLocalPersistence,
  setPersistence
} from "firebase/auth";
import Dialog from '@mui/material/Dialog';
import GenericHeaderButton from "./GenericHeaderButton";
import firebase from "firebase/compat/app";
import StyledFirebaseAuth from "./StyledFirebaseAuth";

const doSignInWithPopup = async (auth, provider) => {
  await signInWithPopup(auth, provider)
    .catch(error => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        fetchSignInMethodsForEmail(auth, error.customData.email).then(providers => {
          alert('The existing email address, ' + error.customData.email + ', is already in use! Please use tbe same authentication provider as was used during the the sign up: ' + providers[0])
        });
      } else {
        alert(error.code);
      }
    })
}

const signInGoogle = async (auth) => {
  await setPersistence(auth, indexedDBLocalPersistence).then(() => doSignInWithPopup(auth, new GoogleAuthProvider()));
}

const signInGithub = async (auth) => {
  await setPersistence(auth, indexedDBLocalPersistence).then(() => doSignInWithPopup(auth, new GithubAuthProvider()));
}

const signInEmail = async (auth, setOpenEmailAuth) => {
  setOpenEmailAuth(true);
}

const signInMethods = [
  { name: "Sign in with Google", func: signInGoogle },
  { name: "Sign in with Github", func: signInGithub },
  { name: "Sign in with your email", func: signInEmail }];

export default function LoginDialog() {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [openEmailTextField, setOpenEmailTextField] = useState(false);
  const [openNewUserPasswordTextField, setNewUserPasswordTextField] = useState(false);
  const [openExistingUserPasswordTextField, setExistingNewUserPasswordTextField] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const handleClose = (func, auth, setOpenEmailAuth) => {
    setOpen(false);
    func(auth, setOpenEmailAuth);
  };

  const handleEmailTextChange = (event) => {
    setEmail(event.target.value)
  };

  const handlePasswordTextChange = (event) => {
    setPassword(event.target.value)
  };

  const handleEmailProceed = async (auth) => {
    setOpenEmailTextField(false);
    await setPersistence(auth, indexedDBLocalPersistence)
      .then(() => signInWithEmailAndPassword(auth, email, 'random'))
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          setNewUserPasswordTextField(true);
        } else if (errorCode === 'auth/invalid-email') {
          setOpenEmailTextField(true);
          setIsEmailInvalid(true);
        } else {
          setExistingNewUserPasswordTextField(true);
        }
      });
  }

  const handleExistingUserPasswordProceed = async (auth) => {
    setExistingNewUserPasswordTextField(false);
    await setPersistence(auth, indexedDBLocalPersistence)
      .then(() => signInWithEmailAndPassword(auth, email, password))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else if (errorCode === 'auth/user-not-found') {
          alert(errorMessage + '\nCheck the email address entered');
        }
      });
  }

  const handleNewUserPasswordProceed = async (auth) => {
    setNewUserPasswordTextField(false);
    await setPersistence(auth, indexedDBLocalPersistence)
      .then(() => createUserWithEmailAndPassword(auth, email, password))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else if (errorCode === 'auth/invalid-email') {
          alert(errorMessage + '\nCheck the email address entered.');
        } else {
          alert("Login error: " + errorMessage);
        }
      });
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
      </Dialog>
    </>
  );
};