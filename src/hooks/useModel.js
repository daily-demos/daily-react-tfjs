/* Adapted from https://codesandbox.io/s/react-blazepalm-rdst8 */
import * as tf from '@tensorflow/tfjs';
import { useCallback, useEffect, useRef, useState } from 'react';

const useModel = (backend, loader) => {
  const modelRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  const loadModel = useCallback(async () => {
    modelRef.current = await loader();
  }, [loader]);

  useEffect(() => {
    const initializeBackend = async () => {
      await tf.setBackend(backend);
      await tf.ready();
    };

    initializeBackend()
      .then(() => {
        console.log(`🔶 TensorFlowJS backend «${backend}» is ready.`);
        loadModel().then(() => {
          console.log(`🔶 TensorFlowJS model «${loader.name}» is ready.`);
          setModelLoaded(true);
        });
      })
      .catch((e) => console.log('🔶 TensorFlow error:', e));
  }, [backend, loadModel, loader.name]);

  return { modelRef, modelLoaded };
};

export default useModel;
