import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';

import * as posedetection from '@tensorflow-models/pose-detection';

import {Camera} from './camera';
import {STATE, MODEL_BACKEND_MAP} from './params';
import {setBackendAndEnvFlags} from './util';

let detector, camera;

tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${
    tfjsWasm.version_wasm}/dist/`);

async function createDetector() {
  let modelType = posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING;

  return posedetection.createDetector(STATE.model, {modelType});
}

async function renderResult() {
  let poses = null;

  // Detector can be null if initialization failed (for example when loading
  // from a URL that does not exist).
  if (detector != null) {

    // Detectors can throw errors, for example when using custom URLs that
    // contain a model that doesn't provide the expected output.
    try {
      poses = await detector.estimatePoses(
        camera.video,
        {maxPoses: STATE.modelConfig.maxPoses, flipHorizontal: false});
    } catch (error) {
      detector.dispose();
      detector = null;
      console.log("Unable to detect any poses" + error);
    }
  }

  // camera.drawCtx();

  // The null check makes sure the UI is not in the middle of changing to a
  // different model. If during model change, the result is from an old model,
  // which shouldn't be rendered.
  if (camera.isPostureDetectionEnabled && poses && poses.length > 0) {
    camera.drawResults(poses);
  }
}

async function renderPrediction() {
  await renderResult();

  camera.frameId = requestAnimationFrame(renderPrediction);
}

async function app(webcamRef, streamRef, setWebcamInstance) {
  webcamRef.current = true;
  camera = await Camera.setupCamera(STATE.camera, streamRef);
  setWebcamInstance(camera);

  let isBackendSet = false;
  let i = 0;

  //todo tfjs logs if WebGL is not detected, but does not throw an error - users can enable hardware acceleration on their device to enable WebGL - implement a way to check if hardware acceleration is enabled?
  while (!isBackendSet && i < MODEL_BACKEND_MAP.length) {
    // Sets WebGL backend first
    await setBackendAndEnvFlags(STATE.flags, MODEL_BACKEND_MAP[i]);
    // Lets the backend initialise
    await tf.ready();
    const backend = tf.getBackend();
    console.log("Currently using backend: " + backend);
    if (backend) {
      isBackendSet = true;
    }
    i++;
  }
  if (!isBackendSet) {
    throw new Error("Unable to set any backends");
  }

  detector = await createDetector();

  //todo for issue #34, we save the animation frame ID, as even when we stop the webcam stream, the pose detection code runs
  camera.frameId = requestAnimationFrame(renderPrediction);

  return camera;
}

export default app;