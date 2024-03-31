import { useState, useEffect } from 'react';

function useHide(initialValue = false) 
{
  const [isHide, setValue] = useState(initialValue);

  const toggle = () => {
    setValue(!isHide);
  };

  return [isHide, toggle];
}

export default useHide;