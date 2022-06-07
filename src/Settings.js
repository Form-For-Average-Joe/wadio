import React from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';
import {AuthWrapper} from "./components/AuthWrapper";

const Settings = () => {
    return (
      <AuthWrapper fallback={
        <Box>
          <Typography sx={{width: '100vw', height: '100vh'}} align='center' variant={"h1"}>Sign in to view this
            page!</Typography>
        </Box>
      }>
        <Typography>settings</Typography>
      </AuthWrapper>
    )
}

export default Settings;