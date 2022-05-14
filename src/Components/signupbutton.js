import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { Typography } from '@material-ui/core';
import useStyles from './styles';


export default function SignupDialog(actiontype) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Sign Up
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Sign Up"}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <TextField
                            required
                            id="filled-required"
                            label="Email"
                            variant="filled"
                            fullWidth
                            margin='dense'
                        />
                        <TextField
                            required
                            id="filled-required"
                            label="Username"
                            variant="filled"
                            fullWidth
                            margin='dense'
                        />
                        <TextField
                            required
                            id="filled-required"
                            label="Password"
                            variant="filled"
                            fullWidth
                            margin='dense'
                        />
                        <TextField
                            required
                            id="filled-required"
                            label="Confirm Password"
                            variant="filled"
                            fullWidth
                            margin='dense'
                        />
                    </div>
                    <div style={{ paddingLeft: "0.7rem" }}>
                        <Typography>
                            Receive newsletters and promotions from Form For The Average Joe?
                        </Typography>
                    </div>
                    <Switch defaultChecked />
                </DialogContent>
                <DialogActions>
                    <div style={{ paddingRight: "2rem", paddingBottom: "1rem" }}>
                        <Button type="submit">
                            Submit
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
