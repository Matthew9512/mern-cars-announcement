import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';

const firebaseConfig = {
   apiKey: 'AIzaSyARmn-MQrvAp0J3mj5nCTjsjmBdFyvMqFU',
   authDomain: 'car-ads-22d35.firebaseapp.com',
   projectId: 'car-ads-22d35',
   storageBucket: 'car-ads-22d35.appspot.com',
   messagingSenderId: '56095565397',
   appId: '1:56095565397:web:6d33a80b8ab20edd7596dc',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const useFileUpload = (setUploadedImgArr) => {
   const [err, setErr] = useState(false);
   const [loading, setLoading] = useState(false);
   const [filePerc, setFilePerc] = useState(0);

   const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         'state_changed',
         (snapshot) => {
            setLoading(true);
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePerc(Math.round(progress));
         },
         (error) => {
            setErr(true);
            setLoading(false);
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

   return { handleFileUpload, filePerc, err, loading };
};
