import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import './ObjectDetection.css';

import useModel from '../../hooks/useModel';
import CocoSSDLoader from '../../models/CocoSSD';

let timeout1;
const ObjectDetection = forwardRef((props, ref) => {
  const { modelLoaded, modelRef } = useModel('cpu', CocoSSDLoader);
  const [objectPredictions, setObjectPredictions] = useState([]);
  const [isWatching, setIsWatching] = useState(false);
  const [objectEmoji, setObjectEmoji] = useState('');

  const internalRef = useRef(null);
  const videoRef = ref || internalRef;

  async function startCocoSsd() {
    if (!modelLoaded) return;
    setIsWatching(true);

    /* main estimation loop */
    const startEstimatingObject = async () => {
      if (!videoRef.current) return;

      const predictions = await modelRef.current.detect(videoRef?.current);
      const classes = predictions.map((pred) => pred.class);

      setObjectPredictions(classes);

      timeout1 = setTimeout(() => {
        if (videoRef?.current?.videoHeight !== 0) {
          console.log('🔶 Scanning for objects...');
          startEstimatingObject();
        }
      }, 1000);
    };

    setTimeout(() => {
      console.log('🔶 Start scanning for objects');
      startEstimatingObject();
    }, 1000);
  }

  useEffect(() => {
    if (objectPredictions.includes('cell phone')) {
      setObjectEmoji('📱');
    } else if (objectPredictions.includes('cat')) {
      setObjectEmoji('🐈');
    } else {
      setObjectEmoji('');
    }
  }, [objectPredictions]);

  const stopCocoSsd = () => {
    clearTimeout(timeout1);
    setIsWatching(false);
    setObjectPredictions([]);
    setObjectEmoji('');
    console.log('🔶 Stopped scanning for objects.');
  };

  return (
    <>
      {objectEmoji && <div className="object-emoji">{objectEmoji}</div>}

      <div className="object-status">
        <div className="badge">
          {objectPredictions.length > 0 ? 'Objects detected!' : 'No objects detected'}
        </div>
        {isWatching && modelLoaded && (
          <button type="button" onClick={stopCocoSsd}>
            Stop object scan
          </button>
        )}
        {!isWatching && modelLoaded && (
          <button type="button" onClick={startCocoSsd}>
            Start object scan
          </button>
        )}

        {objectPredictions.length > 0 && (
          <ol className="list">
            {objectPredictions.map((pred, index) => (
              <li key={`${index}-${pred}`}>{pred}</li>
            ))}
          </ol>
        )}
        {isWatching && <p className="watching">🔦</p>}
      </div>
    </>
  );
});
export default ObjectDetection;
