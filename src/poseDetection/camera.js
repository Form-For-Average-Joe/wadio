import * as params from './params';
import * as pushups from './pushups';
import * as assessment from './assessment';
import {selectIsStarted, selectNameOfExercise} from '../features/exercise/exerciseSlice';
import {selectStage} from "../features/exercise/exerciseSlice";
import {store} from "../app/store";
import valuesFactory from "./valuesFactory";

export class Camera {
  constructor() {
    this.video = document.getElementById('video');
    this.isPostureDetectionEnabled = false;
    this.nameOfExercise = '';
    this.exerciseValues = null;
    this.frameId = null;
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param poses A list of poses to render.
   */
  drawResults(poses) {
    for (const pose of poses) {
      this.drawResult(pose);
    }
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param pose A pose with keypoints to render.
   */
  drawResult(pose) {
    if (selectIsStarted(store.getState())) {
      if (pose.keypoints != null) {
        // todo need a better way to enumerate exercises
        const isNotAtStageFour = selectStage(store.getState()) !== 4;
        if (this.nameOfExercise === 'pushups') {
          if (isNotAtStageFour) {
            assessment.assess_pushups(pose.keypoints, this.exerciseValues);
          }
        } else if (this.nameOfExercise === 'situps') {
          if (isNotAtStageFour) {
            assessment.assess_situps(pose.keypoints, this.exerciseValues);
          }
        } else {
          console.log("No exercise detected, check Redux state for the value of nameOfExercise")
        }
      } else {
        console.log("Error in pose detection")
      }
    }
  }

  /**
   * Initiate a Camera instance and wait for the camera stream to be ready.
   * @param cameraParam From app `STATE.camera`.
   * @param parentStreamRef The reference to the stream
   */
  static async setupCamera(cameraParam, parentStreamRef) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
    }

    const {targetFPS, sizeOption} = cameraParam;
    const $size = params.VIDEO_SIZE[sizeOption];
    const videoConfig = {
      'audio': false,
      'video': {
        facingMode: 'user',
        // Only setting the video to a specified size for large screen, on
        // mobile devices accept the default size.
        // width: isMobile() ? params.VIDEO_SIZE['360 X 270'].width : $size.width,
        // height: isMobile() ? params.VIDEO_SIZE['360 X 270'].height :
        //   $size.height,
        // width: 360, height: 270,
        frameRate: {
          ideal: targetFPS,
        }
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
    parentStreamRef.current = stream;

    const camera = new Camera();

    camera.video.srcObject = stream;

    // we need to await the loadedmetaevent event to detect the width ahd height of the video element
    // side note: readyState of metadata is 1, so the below code also handles this
    // https://stackoverflow.com/questions/8983714/video-and-onloadedmetadata-event
    // https://mklasen.com/using-onloadedmetadata-to-show-information-from-a-user-uploaded-video-before-its-uploaded/
    // await new Promise((resolve) => {
    //   camera.video.onloadedmetadata = () => {
    //     resolve(document.getElementById('video'));
    //   };
    // });

    // Make sure camera is ready, else wait
    while (camera.video.readyState < 2) {
      await new Promise(r => setTimeout(r, 500));
    }

    camera.video.play();

    // const videoWidth = camera.video.videoWidth;
    // const videoHeight = camera.video.videoHeight;
    // Must set below two lines, otherwise video element doesn't show.

    //todo hide camera element for now, only keep context
    // camera.video.width = videoWidth;
    // camera.video.height = videoHeight;

    camera.nameOfExercise = selectNameOfExercise(store.getState());

    //todo terrible software design, but the whole webcam / exercise start page needs a rewrite
    camera.exerciseValues = valuesFactory();
    return camera;
  }
}