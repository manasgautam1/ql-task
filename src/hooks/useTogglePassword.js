import { useState } from 'react';

export const useTogglePassword = (initialValue = 'password') => {
  const [state, setState] = useState(initialValue);
  
  const toggle = () => {
    if (state === 'password') {
      setState('text');
    }
    else {
      setState('password');
    }
  }

  return [state, toggle];

}