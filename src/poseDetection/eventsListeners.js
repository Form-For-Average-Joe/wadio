import { Howl, Howler } from "howler";
import { store } from "../app/store";
import { selectStage, setStage, incrementCount, setIsCanStart, setFeedback, selectCount } from "../features/exercise/exerciseSlice";
import stageChangeEmitter from "./eventsFactory";

const calibratedSound = new Howl({
  src: [require('../assets/sounds/calibrated.webm'), require('../assets/sounds/calibrated.wav'), require('../assets/sounds/calibrated.mp3')]
});
calibratedSound.volume(1.0)
const repCountSound = new Howl({
  src: [require('../assets/sounds/count.webm'), require('../assets/sounds/count.wav')]
});
Howler.volume(1.0);

function repDoneGlobal() {
  console.log(selectCount(store.getState()));
  store.dispatch(setStage(2));
  store.dispatch(incrementCount());
  repCountSound.play();
}

//todo Note the tangled event firing chain - this in turn emits setStageOne
function isCalibratedGlobal() {
  calibratedSound.play();
  //todo CALIBRATION DONE is never displayed, so is redundant
  store.dispatch(setFeedback("CALIBRATION DONE!"));
  stageChangeEmitter.emit("setStageOne");
}

const pushupsListeners = {
  'calibrating': () => {
    store.dispatch(setFeedback("CALIBRATING!"));
  },
  'isCalibrated': isCalibratedGlobal,
  'setStageOne': () => {
    store.dispatch(setStage(1));
    store.dispatch(setFeedback("EXERCISE READY!"));
  },
  'armIsStraight': () => {
    store.dispatch(setIsCanStart(true));
    store.dispatch(setStage(2));
    store.dispatch(setFeedback("EXERCISE BEGIN!"));
  },
  'armIsNotStraight': () => {
    store.dispatch(setFeedback("STRAIGHTEN ARM TO START"));
  },
  'backIsNotStraight': () => {
    store.dispatch(setFeedback("STRAIGHTEN YOUR BACK"));
  },
  'backIsNotStraightAtStage3': () => {
    store.dispatch(setStage(2));
    stageChangeEmitter.emit("backIsNotStraight");
  },
  'depthReached': () => {
    store.dispatch(setFeedback(""));
    store.dispatch(setStage(3));
  },
  'repDone': repDoneGlobal
}

const situpListeners = {
  'calibrating': () => {
    store.dispatch(setFeedback("CALIBRATING!"));
  },
  'isCalibrated': isCalibratedGlobal,
  'setStageOne': () => {
    store.dispatch(setStage(1));
    store.dispatch(setFeedback("EXERCISE READY!"));
  },
  'armIsStraight': () => {
    store.dispatch(setIsCanStart(true));
    store.dispatch(setStage(2));
    store.dispatch(setFeedback("EXERCISE BEGIN!"));
  },
  'armIsNotStraight': () => {
    store.dispatch(setFeedback("STRAIGHTEN ARM TO START"));
  },
  'backIsNotStraight': () => {
    if (selectStage(store.getState()) !== 2) {
      store.dispatch(setStage(2));
    }
    store.dispatch(setFeedback("STRAIGHTEN YOUR BACK"));
  },
  'depthReached': () => {
    store.dispatch(setFeedback(""));
    store.dispatch(setStage(3));
  },
  'repDone': repDoneGlobal
}

export { pushupsListeners, situpListeners };
