import { Box, CssBaseline } from "@mui/material";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { Outlet } from "react-router-dom";
import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing"
import Home from '../Home';
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
    initializeFirestore,
    enableIndexedDbPersistence,
    getFirestore,
    connectFirestoreEmulator
} from 'firebase/firestore';
import { useInitFirestore, FirestoreProvider, useFirebaseApp, AuthProvider } from 'reactfire';
import {
    FirebaseAppProvider,
    useFirestore,
    useFirestoreDocData,
} from "reactfire";
import fs from 'fs';
// const { readFileSync, createWriteStream } = require('fs');
// import http from "http";
import { doc, getDoc, setDoc, serverTimestamp, setLogLevel } from 'firebase/firestore';
import { checkUnlocked } from "../util";

/** @type RulesTestEnvironment */
// let testEnv;

// beforeAll(async () => {
//     testEnv = await initializeTestEnvironment({
//         projectId: "form-for-average-joe",
//         firestore: {
//             // rules: fs.readFileSync("./firestore.rules", "utf8"),
//         },
//     });
//     testEnv.authenticatedContext('testUser1');
// })

// afterAll(async () => {
//     await testEnv.cleanup();
// })

it('exercise unlocked base on cumulative calories burnt', () => {
    expect(checkUnlocked(49, 'situps')).toBe(false);
});

it('exercise unlocked base on cumulative calories burnt', () => {
    expect(checkUnlocked(50, 'situps')).toBe(true);
});

it('exercise unlocked base on cumulative calories burnt', () => {
    expect(checkUnlocked(0, 'pushups')).toBe(true);
});

test('Check if auth user is detected', () => {
    // render(<Home/>);
    // const consoleSpy = jest.spyOn(console, 'log');
    //
    // console.log('hello');
    //
    // expect(consoleSpy).toHaveBeenCalledWith('hello');

    // const divElement = screen.getByText("19.03");
    // expect(divElement).toBeInTheDocument();
});

const App = () => {
    const firebaseApp = useFirebaseApp();
    const auth = getAuth(firebaseApp);
    // When shifting to prod, comment the below
    const firestoreInstance = getFirestore();

    if (process.env.NODE_ENV !== 'production') {
        connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true});
        if (firestoreInstance['_settings']['host'] !== 'localhost:8080') {
            connectFirestoreEmulator(firestoreInstance, 'localhost', 8080);
        }
    }

    // const userRef = useFirestore().collection("users").doc("test");

    // const { data: user, status } = useFirestoreDocData(userRef);

    // if (status !== "success") return <></>;

    // return <>testing</>;

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
                      {"testing"}
                  </Box>
              </CssBaseline>
          </AuthProvider>
      </FirestoreProvider>
    );
}

const firebaseConfig = {
    apiKey: "AIzaSyAGX6XeU2KMJvP08LKo_iUIC71R81TZpfQ",
    authDomain: "form-for-average-joe.firebaseapp.com",
    projectId: "form-for-average-joe",
    storageBucket: "form-for-average-joe.appspot.com",
    messagingSenderId: "847183773725",
    appId: "1:847183773725:web:8b149912201a34e901c6f4",
    measurementId: "G-0DWTZ7HHW7"
};

test("renders user", async () => {
    render(
      <FirebaseAppProvider
        firebaseConfig={firebaseConfig}
      >
          <App />
      </FirebaseAppProvider>
    );

    await waitFor(() => expect(screen.getByText("testing")).toBeInTheDocument());

    screen.debug();
});
