function LoadingSpinner() {
   return (
      <div className='absolute inset-0 flex items-center justify-center bg-secondary-white/20 backdrop-blur-sm'>
         <div className='loader'></div>
      </div>
   );
}

export default LoadingSpinner;
