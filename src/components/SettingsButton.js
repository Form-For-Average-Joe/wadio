import {Button} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';

const SettingsButton = () => {
    return (
        <Button
            variant="contained"
            usage="header"
            component={Link} to="/settings"
        >
            Settings
        </Button>
    )
}

export default SettingsButton;