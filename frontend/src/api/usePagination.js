import { useEffect, useState } from 'react';

export const usePagination = (searchParams, setSearchParams) => {
   const currentPage = +searchParams.get('page');
   const [page, setPage] = useState(currentPage);

   useEffect(() => {
      setPage(currentPage);
   }, [currentPage]);

   const handleSetPage = (e) => {
      const click = e.target;

      if (click.dataset.type === 'prev') {
         setPage((prev) => {
            searchParams.set('page', prev - 1);
            setSearchParams(searchParams);
            return prev - 1;
         });
      }
      if (click.dataset.type === 'next') {
         setPage((prev) => {
            searchParams.set('page', prev + 1);
            setSearchParams(searchParams);
            return prev + 1;
         });
      }
   };

   return { page, setPage, handleSetPage };
};
