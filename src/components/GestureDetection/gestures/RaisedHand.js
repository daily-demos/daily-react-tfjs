import * as fp from 'fingerpose';

// describe raised hand gesture ✋
const raisedHandGesture = new fp.GestureDescription('raised_hand');

// Thumb
raisedHandGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
raisedHandGesture.addCurl(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
raisedHandGesture.addCurl(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);

// Other fingers
for (const finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  raisedHandGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  raisedHandGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  raisedHandGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  raisedHandGesture.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.5);
}

export default raisedHandGesture;
