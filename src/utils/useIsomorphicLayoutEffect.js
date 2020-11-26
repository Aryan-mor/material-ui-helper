import {useLayoutEffect, useEffect} from 'react';

export default function useIsomorphicLayoutEffect() {
  return typeof window !== 'undefined' ? useLayoutEffect : useEffect;
}
