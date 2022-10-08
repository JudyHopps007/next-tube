/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

const useOutsideDetection = (
  ref: React.MutableRefObject<any>,
  cb: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useOutsideDetection;
