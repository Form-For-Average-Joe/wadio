import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PushupsAssessment from './PushupsAssessment';
import PushupsTraining from './PushupsTraining';
import SitupsAssessment from './SitupsAssessment';
import SitupsTraining from './SitupsTraining';
import DashBoard from './Dashboard';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
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
          <div>
            <Routes>
              <Route exact path="/" element={<App/>}/>
              <Route exact path="/pushupsassessment" element={<PushupsAssessment/>}/>
              <Route exact path="/pushupstraining" element={<PushupsTraining/>}/>
              <Route exact path="/situpsassessment" element={<SitupsAssessment/>}/>
              <Route exact path="/situpstraining" element={<SitupsTraining/>}/>
              <Route exact path="/dashboard" element={<DashBoard/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>));