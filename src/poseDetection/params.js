import { SupportedModels } from "@tensorflow-models/pose-detection";

export const STATE = {
  backend: 'tfjs-webgl',
  modelConfig: {},
  model: SupportedModels.MoveNet
};

export const MODEL_BACKEND_MAP = ['tfjs-webgl', 'tfjs-wasm'];