'use client';

import { useEffect } from 'react';

let aosInitialization: Promise<void> | undefined;

export function ClientRuntime() {
  useEffect(() => {
    aosInitialization ??= import('aos').then(({ default: AOS }) => {
      AOS.init({
        anchorPlacement: 'top-bottom',
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
      });
      document.documentElement.classList.remove('no-reveal');
      document.documentElement.classList.add('aos-ready');
    });
  }, []);

  return null;
}
