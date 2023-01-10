import * as fp from "fingerpose";

// describe sign of horns 🤘
const hornsGesture = new fp.GestureDescription('horns');

// Index
hornsGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
hornsGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);
hornsGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.9);

// Middle, Ring
// eslint-disable-next-line no-restricted-syntax
for (const finger of [fp.Finger.Middle, fp.Finger.Ring]) {
  hornsGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  hornsGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}

// Thumb, pinky
// eslint-disable-next-line no-restricted-syntax
for (const finger of [fp.Finger.Thumb, fp.Finger.Pinky]) {
  hornsGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  hornsGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}

export default hornsGesture;
