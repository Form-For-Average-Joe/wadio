import * as params from './params';
import {isMobile} from './util';
import * as pushups from './pushups';
import exerciseValues from './values';
import * as assessment from './assessment';
import { selectNameOfExercise } from '../features/exercise/exerciseSlice'
import {store} from "../app/store";

class Base {
  constructor(context) {
    this.video = document.getElementById('video');
    this.ctx = context;
  }

  drawCtx() {
    this.ctx.drawImage(
      this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
  }

  clearCtx() {
    this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
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
    if (pose.keypoints != null) {
      // todo need a better way to enumerate exercises
      const nameOfExercise = selectNameOfExercise(store.getState());
      if (nameOfExercise === 'pushups') {
        if (exerciseValues.assess.stage !== 4) {
          assessment.assess_pushups(pose.keypoints);
        }
      } else if (nameOfExercise === 'situps') {
        if (exerciseValues.assess.stage !== 4) {
          assessment.assess_situps(pose.keypoints);
        }
      }
      else {
        console.log("No exercise detected, check Redux state for the value of nameOfExercise")
      }
    }
    else {
      console.log("Error in pose detection")
    }
  }
}

export class Camera extends Base {
  constructor(context) {
    super(context);
  }

  /**
   * Initiate a Camera instance and wait for the camera stream to be ready.
   * @param cameraParam From app `STATE.camera`.
   */
  static async setupCamera(cameraParam, context) {
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
        width: isMobile() ? params.VIDEO_SIZE['360 X 270'].width : $size.width,
        height: isMobile() ? params.VIDEO_SIZE['360 X 270'].height :
          $size.height,
        frameRate: {
          ideal: targetFPS,
        }
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

    const camera = new Camera(context);
    camera.video.srcObject = stream;

    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(document.getElementById('video'));
      };
    });

    camera.video.play();

    const videoWidth = camera.video.videoWidth;
    const videoHeight = camera.video.videoHeight;
    // Must set below two lines, otherwise video element doesn't show.

    //todo hide camera element for now, only keep context
    // camera.video.width = videoWidth;
    // camera.video.height = videoHeight;

    // camera.canvas.width = videoWidth;
    // camera.canvas.height = videoHeight;
    // const canvasContainer = document.getElementById('canvas-wrapper');
    // canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;

    // Because the image from camera is mirrored, need to flip horizontally.
    camera.ctx.translate(camera.video.videoWidth, 0);
    camera.ctx.scale(-1, 1);

    return camera;
  }
}