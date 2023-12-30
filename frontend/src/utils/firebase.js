import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import toast from 'react-hot-toast';

const firebaseConfig = {
   apiKey: import.meta.env.FIREBASE_apiKey,
   authDomain: 'car-ads-22d35.firebaseapp.com',
   projectId: 'car-ads-22d35',
   storageBucket: 'car-ads-22d35.appspot.com',
   messagingSenderId: '56095565397',
   appId: '1:56095565397:web:6d33a80b8ab20edd7596dc',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const useFileUpload = (setUploadedImgArr) => {
   const [loading, setLoading] = useState(false);

   const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         'state_changed',
         () => {
            setLoading(true);
         },
         (error) => {
            setLoading(false);
            toast.error(error);
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               console.log(downloadURL);
               setUploadedImgArr((prev) => [...prev, downloadURL]);
               setLoading(false);
            });
         }
      );
   };

   return { handleFileUpload, loading };
};
