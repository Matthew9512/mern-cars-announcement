function Empty({ resourceName, children }) {
   return (
      <>
         <p className='text-xl font-semibold'>Ups... {resourceName} couldn&apos;t be found.</p>
         {children}
      </>
   );
}

export default Empty;
