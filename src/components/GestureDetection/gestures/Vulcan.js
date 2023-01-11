import * as fp from 'fingerpose';

// describe Vulcan salute  🖖
const vulcanGesture = new fp.GestureDescription('vulcan');

// Thumb, index
for (const finger of [fp.Finger.Thumb, fp.Finger.Index]) {
  vulcanGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  vulcanGesture.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 1.0);
}

// Middle, Ring, pinky
for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  vulcanGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  vulcanGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}

export default vulcanGesture;
