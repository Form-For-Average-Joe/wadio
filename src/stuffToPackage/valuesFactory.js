const globals = () => structuredClone({
  stage: 0,
});

const valuesFactory = () => {
  const exerciseValues = structuredClone({
    pushupval: {
      depthLimit: 0,
      side: 0,
      isCalibrated: false,
      depthThres: Array(0.9, 1.3, 1.6),
      armThres: Array(0.97, 0.9, 0.8),
      backThres: Array(0.97, 0.9, 0.7),
    },
    situpval: {
      elbowLimit: 0,
      hipLimit: 0,
      side: 0,
      isCalibrated: false,
    },
    bicepcurlval: {
      compressLimit: 0,
      stretchLimit: 0,
      side: 0,
      isCalibrated: false,
    },
    shoulderpressval: {
      depthLimit: 0,
      isCalibrated: false,
    },
  });
  return {
    ...globals(),
    ...exerciseValues
  }
}

export default valuesFactory;