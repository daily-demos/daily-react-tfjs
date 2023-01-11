import * as fp from 'fingerpose';

// describe thumbs down gesture 👎
const thumbsDownGesture = new fp.GestureDescription('thumbs_down');

// THUMB
thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.9);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.9);

// OTHER FINGERS
for (const finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  thumbsDownGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  thumbsDownGesture.addDirection(finger, fp.FingerDirection.HorizontalRight, 1.0);
  thumbsDownGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

export default thumbsDownGesture;
