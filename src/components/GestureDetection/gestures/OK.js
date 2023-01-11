import * as fp from 'fingerpose';

// describe OK gesture 👌
const okGesture = new fp.GestureDescription('ok');

okGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
okGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.8);
okGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);

okGesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
okGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 0.7);
okGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.9);

for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  okGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  okGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  okGesture.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.9);
}

export default okGesture;
