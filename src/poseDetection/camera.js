/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import { exerciseIds } from "../util";
import * as assessment from '../stuffToPackage/assessment';
import {selectIsStarted, selectNameOfExercise} from '../features/exercise/exerciseSlice';
import {selectStage} from "../features/exercise/exerciseSlice";
import {store} from "../app/store";
import valuesFactory from "../stuffToPackage/valuesFactory";

export class Camera {
  constructor() {
    this.video = document.getElementById('video');
    this.isPostureDetectionEnabled = false;
    this.nameOfExercise = '';
    this.exerciseValues = null;
    this.frameId = null;
  }

  drawResults(poses) {
    for (const pose of poses) {
      this.drawResult(pose);
    }
  }

  drawResult(pose) {
    if (selectIsStarted(store.getState())) {
      if (pose.keypoints != null) {
        // todo need a better way to enumerate exercises
        const isNotAtStageFour = selectStage(store.getState()) !== 4;
        if (this.nameOfExercise === exerciseIds[0]) {
          if (isNotAtStageFour) {
            assessment.assess_pushups(pose.keypoints, this.exerciseValues);
          }
        } else if (this.nameOfExercise === exerciseIds[1]) {
          if (isNotAtStageFour) {
            assessment.assess_situps(pose.keypoints, this.exerciseValues);
          }
        } else if (this.nameOfExercise === exerciseIds[2]) {
          if (isNotAtStageFour) {
            assessment.assess_bicepcurls(pose.keypoints, this.exerciseValues);
          }
        } else if (this.nameOfExercise === exerciseIds[3]) {
          if (isNotAtStageFour) {
            assessment.assess_shoulderpress(pose.keypoints, this.exerciseValues);
          }
        } else {
          console.log("No exercise detected, check Redux state for the value of nameOfExercise")
        }
      } else {
        console.log("Error in pose detection")
      }
    }
  }

  static async setupCamera(cameraParam, parentStreamRef) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
    }

    const videoConfig = {
      'audio': false,
      'video': {
        facingMode: 'user',
        frameRate: {
          ideal: 60,
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

    camera.nameOfExercise = selectNameOfExercise(store.getState());

    //todo terrible software design, but the whole webcam / exercise start page needs a rewrite
    camera.exerciseValues = valuesFactory();
    return camera;
  }
}