import * as fp from 'fingerpose';

// describe pointing up gesture ☝️
const pointUpGesture = new fp.GestureDescription('point_up');

// Thumb
pointUpGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);

// Index
pointUpGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
pointUpGesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 0.9);
pointUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);

// Middle, ring, pinky
for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  pointUpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  pointUpGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  pointUpGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  pointUpGesture.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.9);
}

export default pointUpGesture;
