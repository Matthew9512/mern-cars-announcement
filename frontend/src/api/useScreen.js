import { useEffect, useState } from 'react';

export const useScreen = function (arrivalMessage) {
   const [dimension, setDimension] = useState(false);

   function debounce(fn, ms) {
      let timer;
      return () => {
         clearTimeout(timer);
         timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments);
         }, ms);
      };
   }

   useEffect(() => {
      const debouncedResizeHandler = debounce(() => {
         if (innerWidth > 642) return setDimension(false);
         if (innerWidth <= 640) return setDimension(true);
      }, 100);
      addEventListener('resize', debouncedResizeHandler);

      if (innerWidth > 642) return setDimension(false);
      if (innerWidth <= 640) return setDimension(true);

      return () => removeEventListener('resize', debouncedResizeHandler);
   }, [arrivalMessage]);

   return dimension;
};
