import {CssBaseline, Box} from '@mui/material';
import MainHeader from '../containers/MainHeader';
import {Outlet} from 'react-router-dom';
import {AuthProvider, useFirebaseApp} from 'reactfire';
import {getAuth} from 'firebase/auth';

const App = () => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);

  return (
    <AuthProvider sdk={auth}>
      <CssBaseline>
        <Box sx={{
          height: '100%',
          color: 'white',
          background: 'rgba(0, 0, 0, 1)',
        }}>
          <MainHeader/>
          <Outlet/>
        </Box>
      </CssBaseline>
    </AuthProvider>
  );
}

export default App;