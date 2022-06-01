import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {InputAdornment, IconButton} from "@mui/material";
import {useState} from 'react';
import Button from '@mui/material/Button';
import {useAuth} from 'reactfire';
import {GoogleAuthProvider, signInWithPopup, GithubAuthProvider, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, indexedDBLocalPersistence, setPersistence  } from "firebase/auth";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {DialogContentText, Input} from "@mui/material";
import TextField from '@mui/material/TextField';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

//todo refactor code
//todo error handling in handleProceed functions avoid the use of alert and instead do something more professional
//todo new user password add field to confirm password
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
  {name: "Sign in with Google", func: signInGoogle},
  {name: "Sign in with Github", func: signInGithub},
  {name: "Sign in with your email", func: signInEmail}];

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
      <Button
        variant="contained"
        usage="header"
        label="Sign in/Sign up"
        onClick={() => setOpen(true)}>
        Sign In
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="Login options"
        aria-describedby="Select your login options"
      >
        <DialogTitle>Select your Login Method</DialogTitle>
        <List sx={{pt: 0}}>
          {signInMethods.map(method => (
            <ListItem button onClick={() => {
              handleClose(method.func, auth, setOpenEmailTextField)
            }} key={method.name}>
              <ListItemText primary={method.name}/>
            </ListItem>
          ))}
        </List>
      </Dialog>
      <Dialog open={openEmailTextField} onClose={() => setOpenEmailTextField(false)}>
        <DialogTitle>Email Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address here.
          </DialogContentText>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              fullWidth
              variant="standard"
              {...(isEmailInvalid && { error: true, helperText: "Please enter a valid email" })}
              inputProps={{type: 'email'}}
              onChange={handleEmailTextChange}
            />
            <Button onClick={() => handleEmailProceed(auth)}>Proceed</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={openExistingUserPasswordTextField} onClose={() => setExistingNewUserPasswordTextField(false)}>
        <DialogTitle>Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your password here.
          </DialogContentText>
          <Input
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            id="existing-user-password"
            label="Password"
            type={isPasswordShown ? 'text' : 'password'}
            onChange={handlePasswordTextChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setIsPasswordShown(!isPasswordShown)}
                  onMouseDown={event => event.preventDefault()}
                  edge="end"
                >
                  {isPasswordShown ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleExistingUserPasswordProceed(auth)}>Proceed</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openNewUserPasswordTextField} onClose={() => setNewUserPasswordTextField(false)}>
        <DialogTitle>Create a password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your password here.
          </DialogContentText>
          <Input
            autoFocus
            margin="dense"
            id="new-user-password"
            label="Password"
            type={isPasswordShown ? 'text' : 'password'}
            fullWidth
            variant="standard"
            onChange={handlePasswordTextChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setIsPasswordShown(!isPasswordShown)}
                  onMouseDown={event => event.preventDefault()}
                  edge="end"
                >
                  {isPasswordShown ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleNewUserPasswordProceed(auth)}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};