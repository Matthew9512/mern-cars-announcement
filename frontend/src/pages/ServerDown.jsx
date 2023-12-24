import LinkButton from '../ui/LinkButton';

function ServerDown() {
   return (
      <section className='flex relative flex-col px-8 h-full justify-center items-center lg:flex-row lg:h-screen'>
         <img className='w-fill h-full object-cover mix-blend-multiply' src='/500-com2.png' alt='server-down-img' />
         <div className='w-4/5 text-center lg:w-1/3'>
            <div className='flex flex-col pb-12 items-center'>
               <LinkButton variant='primary' className='mb-8' to='/'>
                  Go Back
               </LinkButton>
               <p>
                  We have a little problem.
                  <br />
                  Looks like our server is currently down...
                  <br />
                  We are working to fix this problem, please come back later.
               </p>
            </div>
            <p className='absolute bottom-1 left-1/2 -translate-x-1/2  font-bold'>
               <a href='https://storyset.com/internet'>
                  Internet illustrations by <span className='underline'>Storyset </span>
               </a>
            </p>
         </div>
      </section>
   );
}

export default ServerDown;
