// to mirror the webcam
export const webcamStyles = {
  video: {
    WebkitTransform: "scaleX(-1)",
    transform: "scaleX(-1)",
  }
};

export const getDeadlineTime = (duration) => {
  let deadline = new Date();
  deadline.setTime(deadline.getTime() + duration * 1000);
  return deadline;
}

export const getFlooredSeconds = (total) => {
  return Math.floor((total / 1000) % 60);
}

export const getFlooredMinutes = (total) => {
  return Math.floor((total / 1000 / 60) % 60);
}

// function handleStart() {
//   if (intervalRef.current) clearInterval(intervalRef.current);
//   clearTimer(getDeadlineTime());
// }
//
// function handleStop() {
//   if (intervalRef.current) clearInterval(intervalRef.current);
//   clearTimer(getDeadlineTime() - duration);
// }
