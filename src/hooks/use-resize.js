import { useState, useEffect } from 'react';
import {
  XS,
  SM,
  MD,
  LG,
  XL,
} from "../const/const-breakpoints";

const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isScreenXs: width >= XS,
    isScreenSm: width >= SM,
    isScreenMd: width >= MD,
    isScreenLg: width >= LG,
    isScreenXl: width >= XL
  };
};

export default useResize;