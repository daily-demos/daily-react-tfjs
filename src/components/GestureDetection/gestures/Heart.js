import * as fp from 'fingerpose';

// describe heart hands gesture 🫶
const heartGesture = new fp.GestureDescription('heart');

// Thumb
heartGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
heartGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalRight, 1.0);
heartGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.9);

// Other fingers
for (const finger of [fp.Finger.Index, fp.Finger.Ring, fp.Finger.Middle, fp.Finger.Pinky]) {
  heartGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);

  heartGesture.addDirection(finger, fp.FingerDirection.HorizontalRight, 1.0);
}

export default heartGesture;
