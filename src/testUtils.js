import { Box, CssBaseline } from "@mui/material";
import { AuthProvider, FirebaseAppProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { firebaseConfig } from "./util";

export function FirebaseWrapperForTesting({ children, firestoreInstance, auth }) {
  return <FirebaseAppProvider firebaseConfig={firebaseConfig}>
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
            {children}
          </Box>
        </CssBaseline>
      </AuthProvider>
    </FirestoreProvider>
  </FirebaseAppProvider>;
}
