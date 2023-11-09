import Button from '../ui/Button';

function Pagination({ page, handleSetPage, pagesAmount }) {
   return (
      <div className='flex items-center justify-center gap-12 my-8'>
         <Button onClick={(e) => handleSetPage(e)} data-type='prev' disabled={page === 1} variant='primary'>
            prev
         </Button>
         <p>
            {page || 1}/{pagesAmount}
         </p>
         <Button onClick={(e) => handleSetPage(e)} data-type='next' disabled={page === pagesAmount} variant='primary'>
            next
         </Button>
      </div>
   );
}

export default Pagination;
