function LoadingSpinner() {
   return (
      <div className='absolute inset-0 flex items-center justify-center bg-secondary-white/20 backdrop-blur-sm'>
         <svg className='svg-loader' viewBox='25 25 50 50'>
            <circle className='circle-loader' r='20' cy='50' cx='50'></circle>
         </svg>
      </div>
      // <div className='absolute inset-0 flex items-center justify-center bg-secondary-white/20 backdrop-blur-sm'>
      //    <div className='loader'></div>
      // </div>
   );
}

export default LoadingSpinner;
