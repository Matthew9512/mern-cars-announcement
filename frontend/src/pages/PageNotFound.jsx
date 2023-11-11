import LinkButton from '../ui/LinkButton';

export const PageNotFound = () => {
   return (
      <section className='flex relative flex-col px-8 h-full justify-center items-center lg:flex-row lg:h-screen'>
         <img className='w-fill h-full object-cover mix-blend-multiply' src='/404-robot-com.jpg' alt='error-page-img' />
         <div className='w-4/5 text-center lg:w-1/3'>
            <div className='flex flex-col pb-12 items-center'>
               <LinkButton variant='primary' className='mb-8' to='/'>
                  Go Back
               </LinkButton>
               <p>
                  We have a little problem called 404.
                  <br />
                  Looks like the page that you are were looking for doesn&apos;t exist.
                  <br />
                  You may have mistyped the address or page may have moved.
               </p>
            </div>
            <p className='absolute bottom-1 left-1/2 -translate-x-1/2 font-bold'>
               <a href='https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_7906233.htm#page=2&query=404%20error&position=24&from_view=search&track=ais'>
                  Image by <span className='underline'>storyset </span>
               </a>
               on Freepik
            </p>
         </div>
      </section>
   );
};

export default PageNotFound;
