function InputValidationMsg({ errorMsg }) {
   return <>{errorMsg && <p className='text-primary-red italic text-sm'>{errorMsg}</p>}</>;
}

export default InputValidationMsg;
