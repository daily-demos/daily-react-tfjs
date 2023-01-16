# Daily React app with object and hand gesture detection
[Open the app in CodeSandbox](https://codesandbox.io/s/github/daily-demos/daily-react-tfjs), or [see it in action here](https://890sio.csb.app/).
![CleanShot 2023-01-11 at 18 02 52](https://user-images.githubusercontent.com/12814720/211870277-885759c0-481e-4121-bf94-d4b6ae53ad1b.gif)

## Features

This app includes:

- A basic multi-participant call UI built with React and the [Daily React library](https://docs.daily.co/reference/daily-react)
- Hand gesture detection with [TensorFlowJS](https://github.com/tensorflow/tfjs) and [Fingerpose](https://github.com/andypotato/fingerpose)
  - Sending gestures to other call participants
- Object detection with [TensorFlowJS](https://github.com/tensorflow/tfjs) and [coco-ssd](https://www.npmjs.com/package/@tensorflow-models/coco-ssd)

Note on object detection: coco-ssd is powerful, but can take up computing resources. This app may be less performant on lower-end devices. A Start/stop scan button is added to give the user control over when to run the detection. Predictions run only every 1000 ms, slowing down new object detection.

This is a demo app meant to showcase how to interact with the Daily APIs. It is not optimized for large calls. (Read our [large meetings series](https://www.daily.co/blog/tag/large-meeting-series/) for more information.)

## Requirements

To use this demo, you will first need to [create a Daily account](https://dashboard.daily.co/signup). 
You will also need a Daily room URL. You can use any existing Daily room in the demo by pasting the room URL into the input. The room URL should be in this format to be valid: `https://your-domain.daily.co/room-name`, with `daily-domain` changed to your domain, and `room-name` changed to the name of the existing room you would like to use.

## Running locally

To run this demo locally:

1. Clone the repo: `git clone git@github.com:daily-demos/daily-react-tfjs`
2. Install dependencies `npm install`
3. Start dev server `npm start`
4. Then open your browser and go to `http://localhost:3000`.
