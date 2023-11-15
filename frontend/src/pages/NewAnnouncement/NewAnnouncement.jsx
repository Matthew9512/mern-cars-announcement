import InputComponent from './components/InputComponent';
import UploadFile from './components/UploadFile';

function NewAnnouncement() {
   return (
      <section className='flex-center bg-secondary-white'>
         <UploadFile />
         <InputComponent />
      </section>
   );
}

export default NewAnnouncement;
