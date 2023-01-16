import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import './ObjectDetection.css';

import useModel from '../../hooks/useModel';
import CocoSSDLoader from '../../models/CocoSSD';

let timeout1;
const ObjectDetection = forwardRef((props, ref) => {
  const { modelLoaded, modelRef } = useModel('cpu', CocoSSDLoader);
  const [objectPredictions, setObjectPredictions] = useState([]);
  const [isWatching, setIsWatching] = useState(false);
  const [showCatEmoji, setShowCatEmoji] = useState(false);

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
    if (objectPredictions.includes('cell phone') || objectPredictions.includes('cat')) {
      setShowCatEmoji(true);
    } else {
      setShowCatEmoji(false);
    }
  }, [objectPredictions]);

  const stopCocoSsd = () => {
    clearTimeout(timeout1);
    setIsWatching(false);
    setObjectPredictions([]);
    setShowCatEmoji(false);
    console.log('🔶 Stopped scanning for objects.');
  };

  return (
    <>
      {showCatEmoji && <div className="cat-emoji">🐈</div>}

      <div className="object-status">
        <div className="badge">
          {objectPredictions.length > 0 ? 'Objects detected!' : 'No objects detected'}
        </div>
        {isWatching && modelLoaded && (
          <button type="button" onClick={stopCocoSsd}>
            Stop cat scan
          </button>
        )}
        {!isWatching && modelLoaded && (
          <button type="button" onClick={startCocoSsd}>
            Start cat scan
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
