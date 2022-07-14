import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { act, cleanup, render, screen, fireEvent, unmount } from "@testing-library/react";
import { FirebaseWrapperForTesting } from "../testUtils";
import { connectAuthEmulator, getAuth, GoogleAuthProvider, signInWithCredential, signOut } from "firebase/auth";
import { getApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "../util";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JoinGroup from "../components/JoinGroup";
import Leaderboard from "../Leaderboard";
import userEvent from '@testing-library/user-event';

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

it("New group is added to leaderboard list", async () => {
  const ListOfLeaderboards = () => {
    return (
      <FirebaseWrapperForTesting auth={auth} firestoreInstance={firestoreInstance}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Leaderboard />} />
          </Routes>
        </BrowserRouter>
      </FirebaseWrapperForTesting>
    )
  }

  const TryToJoinGroup = () => {
    return (
      <FirebaseWrapperForTesting auth={auth} firestoreInstance={firestoreInstance}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<JoinGroup />} />
          </Routes>
        </BrowserRouter>
      </FirebaseWrapperForTesting>
    )
  }

  await act(async () => {
    await signInWithCredential(getAuth(getApp()), GoogleAuthProvider.credential('{"sub": "Cao Shuhao", "email": "caoshuhao@example.com", "email_verified": true}'))
  });
  const user = auth.currentUser;
  expect(user).toBeDefined();

  const {container1, unmount} = render(<ListOfLeaderboards />);
  const checkGlobalIsThere = screen.getByText("Global");
  const checkNewTestIsAbsent = screen.queryByText("New Test");
  expect(checkGlobalIsThere).toBeInTheDocument();
  expect(checkNewTestIsAbsent).not.toBeInTheDocument();
  unmount();

  render(<JoinGroup />);
  const codeField = screen.getByTestId("code-input");
  const submitButton = screen.getByText("Join Group");
  expect(codeField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  fireEvent.change(codeField, {target: {value: 'JJXKa1i004czQ6CvMVfiu'}});
  expect(codeField.value).toBe('JJXKa1i004czQ6CvMVfiu');

  fireEvent.click(submitButton);
  render(<ListOfLeaderboards />);
  screen.debug();
})