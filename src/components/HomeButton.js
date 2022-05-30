import {Button} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';

const HomeButton = () => {
    return (
        <Button
            variant="contained"
            usage="header"
            component={Link} to="/"
        >
            Home
        </Button>
    )
}

export default HomeButton;