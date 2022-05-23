import '@tensorflow/tfjs-backend-webgl';

import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';

import * as posedetection from '@tensorflow-models/pose-detection';

import {Camera} from './camera';
import {STATE} from './params';
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
      alert(error);
    }
  }

  // camera.drawCtx();

  // The null check makes sure the UI is not in the middle of changing to a
  // different model. If during model change, the result is from an old model,
  // which shouldn't be rendered.
  if (poses && poses.length > 0) {
    camera.drawResults(poses);
  }
}

async function renderPrediction() {
  await renderResult();

  requestAnimationFrame(renderPrediction);
};

async function app(stream) {
  camera = await Camera.setupCamera(STATE.camera, stream);

  await setBackendAndEnvFlags(STATE.flags, STATE.backend);

  detector = await createDetector();

  renderPrediction();

  return camera;
};

export default app;