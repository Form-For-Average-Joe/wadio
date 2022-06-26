import {Box, CssBaseline} from "@mui/material";
import {
  enableIndexedDbPersistence,
  initializeFirestore,
  connectFirestoreEmulator,
  getFirestore
} from "firebase/firestore";
import {Outlet} from "react-router-dom";
import {AuthProvider, useFirebaseApp, useInitFirestore, FirestoreProvider} from 'reactfire';
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import './App.css'

const App = () => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  // When shifting to prod, comment the below
  const firestoreInstance = getFirestore();

  // When shifting to prod, uncomment the below
  // const {status, data: firestoreInstance} = useInitFirestore(async (firebaseApp) => {
  //   const db = initializeFirestore(firebaseApp, {});
  //   await enableIndexedDbPersistence(db);
  //   return db;
  // });
  //
  // if (status === 'loading') {
  //   return (
  //     <div>Loading</div>
  //   )
  // }

  if (process.env.NODE_ENV !== 'production') {
    connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true});
    if (firestoreInstance['_settings']['host'] !== 'localhost:8080') {
      connectFirestoreEmulator(firestoreInstance, 'localhost', 8080);
    }
  }

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <AuthProvider sdk={auth}>
        <CssBaseline>
          <Box
            sx={{
              color: 'white',
              background: 'rgba(0, 0, 0, 1)',
              minHeight: '100vh'
            }}
          >
            <Outlet/>
          </Box>
        </CssBaseline>
      </AuthProvider>
    </FirestoreProvider>
  );
}

export default App;
