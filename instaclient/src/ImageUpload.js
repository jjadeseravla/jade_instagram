import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { storage, db, firebase } from './firebase';

function ImageUpload({username}) {

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) { //get first file you selected and setImage to that
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () =>{
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function -> as it gets updated, keep giving me snapshots as it gets updated
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      //when upload completes
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            //post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          })
      }
    )
  }

  return (
    <div>
      <progress value={progress} mac="100" />
      <input type="text" placeholder="Enter a caption..." onChange={e => setCaption(e.target.value)} value={caption} />
      <input type="file" onChange={handleChange}/>
      <Button onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )

}

export default ImageUpload;
