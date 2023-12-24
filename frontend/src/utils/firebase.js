import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';

const firebaseConfig = {
   apiKey: import.meta.env.FIREBASE_apiKey,
   authDomain: import.meta.env.FIREBASE_authDomain,
   projectId: import.meta.env.FIREBASE_projectId,
   storageBucket: import.meta.env.FIREBASE_storageBucket,
   messagingSenderId: import.meta.env.FIREBASE_messagingSenderId,
   appId: import.meta.env.FIREBASE_appId,
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
