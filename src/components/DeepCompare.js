import { useRef } from 'react';
import isEqual from 'lodash';

function deepCompareEquals(prevVal, currentVal){
   return isEqual(prevVal,currentVal ); 
}

function useDeepCompareWithRef(value) {
  const ref = useRef() 
  if (!deepCompareEquals(value, ref.current)) { 
    //ref.current contains the previous object value
    ref.current = value;
  }

  return ref.current;
}

export default useDeepCompareWithRef;