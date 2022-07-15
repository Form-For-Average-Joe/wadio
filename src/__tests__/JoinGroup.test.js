import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { act, cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import Friends from "../Friends";
import LeaderboardDisplay from "../LeaderboardDisplay";
import { FirebaseWrapperForTesting } from "../testUtils";
import { connectAuthEmulator, getAuth, GoogleAuthProvider, signInWithCredential, signOut } from "firebase/auth";
import { getApp, initializeApp } from "firebase/app";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Leaderboard from "../Leaderboard";
import userEvent from '@testing-library/user-event';
import { getLeaderboardName } from "../util";
import * as util from '../util';

let app, auth, firestoreInstance;

beforeAll(() => {
  app = initializeApp(util.firebaseConfig);
  auth = getAuth(app);
  firestoreInstance = getFirestore();

  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  connectFirestoreEmulator(firestoreInstance, 'localhost', 8080);
})

afterEach(async () => {
  cleanup();
  await signOut(getAuth(getApp()));
  jest.resetAllMocks();
});

it("New group is added to leaderboard list", async () => {
  const ListOfLeaderboards = () => {
    return (
      <FirebaseWrapperForTesting auth={auth} firestoreInstance={firestoreInstance}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Leaderboard />} />
            <Route path="/leaderboard/display" element={<LeaderboardDisplay/>}/>
          </Routes>
        </BrowserRouter>
      </FirebaseWrapperForTesting>
    )
  }

  const JoinGroupAndCheckLeaderboardNames = () => {
    return (
      <FirebaseWrapperForTesting auth={auth} firestoreInstance={firestoreInstance}>
        <BrowserRouter>
          <Routes>
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/" element={<Friends />} />
            <Route path="/leaderboard/display" element={<LeaderboardDisplay/>}/>
          </Routes>
        </BrowserRouter>
      </FirebaseWrapperForTesting>
    )
  }

  await act(async () => {
    await signInWithCredential(getAuth(getApp()), GoogleAuthProvider.credential('{"sub": "Cao Shuhao", "email": "caoshuhao@example.com", "email_verified": true}'))
  });
  const user = auth.currentUser;
  await waitFor(() => {
    expect(user).toBeDefined()
  });

  // need to mock API calls in leaderboardDisplay
  // const {unmount} = render(<ListOfLeaderboards />);
  // const checkGlobalIsThere = screen.getByText("Global");
  // const checkNewTestIsAbsent = screen.queryByText("New Test");
  // expect(checkGlobalIsThere).toBeInTheDocument();
  // expect(checkNewTestIsAbsent).not.toBeInTheDocument();
  // unmount();

  const userEventSetup = userEvent.setup()
  render(<JoinGroupAndCheckLeaderboardNames />);
  const codeField = screen.getByTestId("code-input");
  const submitButton = screen.getByText("Join Group");
  expect(codeField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  fireEvent.change(codeField, {target: {value: '93a17efb-2208-491b-bf91-ae982b40727e'}});

  expect(codeField.value).toBe('93a17efb-2208-491b-bf91-ae982b40727e');

  const firstMockReturn = {"data": {"isKeyPresent":true}};
  const secondMockReturn = () => Promise.resolve();
  const third = () => Promise.resolve();

  const groupCodes = {"codes":["FWJoTNFj1T0X1Fzg238Ji","La-1S24z1U748scR6Huau","93a17efb-2208-491b-bf91-ae982b40727e"]};

  const firstLeaderboardName = {
    data: {"leaderboardName":"My Personal"}
  }
  const secondLeaderboardName = {
    data: {"leaderboardName":"Yolo sia"}
  }
  const thirdLeaderboardName = {
    data: {"leaderboardName":"test 2"}
  }

  jest.spyOn(util, 'isGroupCodePresent')
    .mockResolvedValueOnce(firstMockReturn);

  jest.spyOn(util, 'associateUserIdToGroupCode')
    .mockResolvedValueOnce(secondMockReturn);

  jest.spyOn(util, 'saveCodetostoreToFirestore')
    .mockResolvedValueOnce(third);

  jest.spyOn(util, 'getGroupCodes')
    .mockResolvedValueOnce(groupCodes);

  jest.spyOn(util, 'getLeaderboardName')
    .mockResolvedValueOnce(firstLeaderboardName).mockResolvedValueOnce(secondLeaderboardName).mockResolvedValueOnce(thirdLeaderboardName);

  await act(async () => {
    await userEventSetup.click(submitButton);
  })

  await new Promise((resolve) => setTimeout(resolve, 100));

  // screen.debug();

  await waitFor(() => {
    expect(screen.getByText("Yolo sia")).toBeInTheDocument();
    expect(screen.getByText("Leaderboards")).toBeInTheDocument();
    expect(screen.getByText("Global")).toBeInTheDocument();
  })
})
