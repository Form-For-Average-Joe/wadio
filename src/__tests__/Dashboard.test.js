import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import Dashboard from "../Dashboard";
import { act, cleanup, render, waitFor } from "@testing-library/react";
import { FirebaseWrapperForTesting } from "../testUtils";
import { connectAuthEmulator, getAuth, GoogleAuthProvider, signInWithCredential, signOut } from "firebase/auth";
import { getApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "../util";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { randomFillSync } from 'crypto'

window.crypto = {
  getRandomValues(buffer) {
    return randomFillSync(buffer)
  }
}

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

it("Total calories updates with save", async () => {
  function UserSignedIn() {
    return (
      <FirebaseWrapperForTesting auth={auth} firestoreInstance={firestoreInstance}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </FirebaseWrapperForTesting>
    )
  };

  render(<UserSignedIn />);

  await act(async () => {
    await signInWithCredential(getAuth(getApp()), GoogleAuthProvider.credential('{"sub": "Cao Shuhao", "email": "caoshuhao@example.com", "email_verified": true}'))
  });

  const user = auth.currentUser;
  await waitFor(() => {
    expect(user).toBeDefined()
  });
  // screen.debug();
})