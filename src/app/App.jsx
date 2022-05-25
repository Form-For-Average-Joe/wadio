import React from 'react';
import {CssBaseline, Box} from '@mui/material';
import MemberHeader from '../components/MemberHeader';
import {Outlet} from 'react-router-dom';

const App = () => {
  return (
    <CssBaseline>
      <Box sx={{
        height: '100%',
        color: 'white',
        background: 'rgba(0, 0, 0, 1)',
      }}>
        <MemberHeader/>
        <Outlet/>
      </Box>
    </CssBaseline>
  );
}

export default App;