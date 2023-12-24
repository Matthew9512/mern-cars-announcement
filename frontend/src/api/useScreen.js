import { useEffect, useState } from 'react';

export const useScreen = function (arrivalMessage) {
   const [dimension, setDimension] = useState(false);

   useEffect(() => {
      const debouncedResizeHandler = debounce(() => {
         console.log(`***** ${window.innerWidth} debounced resize`); // See the cool difference in console
         if (window.innerWidth > 642) return setDimension(false);
         if (window.innerWidth <= 640) return setDimension(true);
      }, 100);
      window.addEventListener('resize', debouncedResizeHandler);

      if (window.innerWidth > 642) return setDimension(false);
      if (window.innerWidth <= 640) return setDimension(true);

      return () => window.removeEventListener('resize', debouncedResizeHandler);
   }, [arrivalMessage]); // Note this empt

   function debounce(fn, ms) {
      let timer;
      return (_) => {
         clearTimeout(timer);
         timer = setTimeout((_) => {
            timer = null;
            fn.apply(this, arguments);
         }, ms);
      };
   }

   return dimension;
};
