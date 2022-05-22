import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app/App';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home'
import PushupsAssessment from './PushupsAssessment';
import PushupsTraining from './PushupsTraining';
import SitupsAssessment from './SitupsAssessment';
import SitupsTraining from './SitupsTraining';
import DashBoard from './Dashboard';
import {ThemeProvider, StyledEngineProvider, createTheme} from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: '100%',
          color: 'white',
          margin: 0,
          paddingTop: "2rem",
          paddingBottom: 30,
          backgroundColor: "#333333",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiCardMedia: {
      variants: [
        {
          props: {variant: 'webcam'},
          style: {
            paddingTop: '0%'
          },
        },],
      styleOverrides: {
        root: {
          paddingTop: '56.25%',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          flexGrow: 1,
          background: 'rgba(100, 100, 100, 1)',
          color: 'white',
        },
      },
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render((
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>}>
              <Route index element={<Home/>}/>
              <Route exact path="pushupsassessment" element={<PushupsAssessment/>}/>
              <Route exact path="pushupstraining" element={<PushupsTraining/>}/>
              <Route exact path="situpsassessment" element={<SitupsAssessment/>}/>
              <Route exact path="situpstraining" element={<SitupsTraining/>}/>
              <Route exact path="dashboard" element={<DashBoard/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>));