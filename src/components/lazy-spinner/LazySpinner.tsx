import { Loader } from '@mantine/core';
import { useState, useEffect } from 'react';

interface Props {
  show: boolean;
  delay?: number;
}

const LazySpinner = (props: Props) => {
  const { show = false, delay = 0 } = props;
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!show) {
      setShowSpinner(false);
      return;
    }

    if (delay === 0) {
      setShowSpinner(true);
    } else {
      timeoutId = setTimeout(() => setShowSpinner(true), delay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [show, delay]);

  return showSpinner ? <Loader /> : null;
};

export default LazySpinner;
