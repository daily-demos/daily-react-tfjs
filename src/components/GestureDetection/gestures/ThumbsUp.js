import * as fp from 'fingerpose';

// describe thumbs up gesture 👍
const thumbsUpGesture = new fp.GestureDescription('thumbs_up');

thumbsUpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
thumbsUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
thumbsUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.9);
thumbsUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);

for (const finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  thumbsUpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

thumbsUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1.0);
thumbsUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
thumbsUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);
thumbsUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);

export default thumbsUpGesture;
