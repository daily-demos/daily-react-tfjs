import * as fp from 'fingerpose';

// describe victory gesture ✌️
const victoryGesture = new fp.GestureDescription('victory');

// thumb:
victoryGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
victoryGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
victoryGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

// index:
victoryGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
victoryGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
victoryGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1.0);
victoryGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);
victoryGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
victoryGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);

// middle:
victoryGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
victoryGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
victoryGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpLeft, 1.0);
victoryGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 1.0);
victoryGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.HorizontalLeft, 1.0);
victoryGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.HorizontalRight, 1.0);

// ring:
victoryGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
victoryGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.HalfCurl, 0.9);

// pinky:
victoryGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
victoryGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.HalfCurl, 0.9);

export default victoryGesture;
