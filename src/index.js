import {createRoot} from 'react-dom/client';
import App from './app/App';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AssessmentFinished from "./containers/AssessmentFinished";
import Home from './Home'
import PushupsAssessment from './PushupsAssessment';
import SitupsAssessment from './SitupsAssessment';
import DashBoard from './Dashboard';
import Settings from './Settings';
import {ThemeProvider, createTheme, responsiveFontSizes} from '@mui/material/styles';
import {FirebaseAppProvider} from 'reactfire';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGX6XeU2KMJvP08LKo_iUIC71R81TZpfQ",
  authDomain: "form-for-average-joe.firebaseapp.com",
  projectId: "form-for-average-joe",
  storageBucket: "form-for-average-joe.appspot.com",
  messagingSenderId: "847183773725",
  appId: "1:847183773725:web:8b149912201a34e901c6f4",
  measurementId: "G-0DWTZ7HHW7"
};

export const theme = responsiveFontSizes(createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: 'white',
          paddingTop: "2rem",
          paddingBottom: "2rem",
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
    MuiButton: {
      variants: [
        {
          props: {usage: 'header'},
          style: {backgroundColor: "#666666", color: "#FFFFFF", whiteSpace: 'nowrap'}//whiteSpace nowrap renders button text on one line
        },
      ],
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
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>}>
              <Route index element={<Home/>}/>
              <Route exact path="pushupsassessment" element={<PushupsAssessment/>}/>
              <Route exact path="situpsassessment" element={<SitupsAssessment/>}/>
              <Route exact path="assessmentend" element={<AssessmentFinished/>}/>
              <Route exact path="dashboard" element={<DashBoard/>}/>
              <Route exact path="settings" element={<Settings />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </FirebaseAppProvider>));