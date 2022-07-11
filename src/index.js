import { createRoot } from 'react-dom/client';
import App from './app/App';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AssessmentFinished from "./AssessmentFinished";
import AuthWrapper from "./containers/AuthWrapper";
import SettingsWrapper from "./containers/SettingsWrapper";
import MainHeader from "./containers/MainHeader";
import Friends from "./Friends";
import Home from './Home'
import ExerciseAssessment from './ExerciseAssessment';
import DashBoard from './Dashboard';
import LeaderboardDisplay from "./LeaderboardDisplay";
import MinorProfile from "./MinorProfile";
import Settings from './Settings';
import Leaderboard from './Leaderboard';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { FirebaseAppProvider } from 'reactfire';
import { exerciseIds, firebaseConfig } from "./util";

export const theme = responsiveFontSizes(createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: 'white',
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
          props: { variant: 'webcam' },
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
}));

const container = document.getElementById('root');
const root = createRoot(container);

root.render((
  <StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route element={<App/>}>
                <Route element={<MainHeader/>}>
                  <Route index path="/" element={<Home/>}/>
                  <Route exact path="assessmentend" element={<AssessmentFinished/>}/>
                  <Route exact path="dashboard" element={<AuthWrapper><DashBoard/></AuthWrapper>}/>
                  <Route exact path="settings" element={<AuthWrapper><Settings/></AuthWrapper>}/>
                  <Route exact path="leaderboard" element={<AuthWrapper><Leaderboard/></AuthWrapper>}/>
                  <Route exact path="friends" element={<AuthWrapper><Friends/></AuthWrapper>}/>
                  {/*Ideally we wouldn't use SettingsWrapper for the leaderboard, but Firebase client can't query user profile
                  and we don't have cloud functions, so unless we have an additional check in App to add the user nickname, this
                  is the temporary alternative*/}
                  <Route exact path="leaderboard/display" element={<SettingsWrapper><LeaderboardDisplay/></SettingsWrapper>}/>
                  <Route path="profile">
                    <Route path=":userUid" element={<AuthWrapper><MinorProfile/></AuthWrapper>} />
                  </Route>
                </Route>
                <Route path="/exercise">
                  <Route exact path={exerciseIds[0]} element={<SettingsWrapper><ExerciseAssessment nameOfExercise={exerciseIds[0]}/></SettingsWrapper>}/>
                  <Route exact path={exerciseIds[1]} element={<SettingsWrapper><ExerciseAssessment nameOfExercise={exerciseIds[1]}/></SettingsWrapper>}/>
                  <Route exact path={exerciseIds[2]} element={<SettingsWrapper><ExerciseAssessment nameOfExercise={exerciseIds[2]}/></SettingsWrapper>}/>
                  <Route exact path={exerciseIds[3]} element={<SettingsWrapper><ExerciseAssessment nameOfExercise={exerciseIds[3]}/></SettingsWrapper>}/>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </FirebaseAppProvider>
  </StrictMode>
));