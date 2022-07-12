import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import Home from '../Home';
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { FirebaseWrapperForTesting } from "../testUtils";
import { connectAuthEmulator, getAuth, GoogleAuthProvider, signInWithCredential, signOut } from "firebase/auth";
import { getApp, initializeApp } from "firebase/app";
import { checkUnlocked, firebaseConfig } from "../util";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

let app, auth, firestoreInstance;

beforeAll(() => {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    firestoreInstance = getFirestore();

    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    connectFirestoreEmulator(firestoreInstance, 'localhost', 8080);
})

afterEach(async () => {
    cleanup();
    await signOut(getAuth(getApp()));
});

it('exercise unlocked base on cumulative calories burnt', () => {
    expect(checkUnlocked(49, 'situps')).toBe(false);
});

it('exercise unlocked base on cumulative calories burnt', () => {
    expect(checkUnlocked(50, 'situps')).toBe(true);
});

it('exercise unlocked base on cumulative calories burnt', () => {
    expect(checkUnlocked(0, 'pushups')).toBe(true);
});

test("Exercises are locked if not signed in", async () => {
    function UserNotSignedIn() {
      return (
            <FirebaseWrapperForTesting auth={auth} firestoreInstance={firestoreInstance}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                </Routes>
              </BrowserRouter>
            </FirebaseWrapperForTesting>
          )
    };

    render(<UserNotSignedIn/>);

    // await waitFor(() => expect(screen.getByText("Push")).toBeInTheDocument());

    // screen.debug();
});

it("Exercises are unlocked if signed in", async () => {
    // render(<FirebaseWrapperForTesting auth={auth} firestoreInstance={firestoreInstance}><Home/></FirebaseWrapperForTesting>);

    screen.debug();

    await act(async () => {
        await signInWithCredential(getAuth(getApp()), GoogleAuthProvider.credential('{"sub": "Cao Shuhao", "email": "caoshuhao@example.com", "email_verified": true}'))
    });

    const user = auth.currentUser;

    expect(user).toBeDefined();
})