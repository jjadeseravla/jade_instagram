import React, { useState, useEffect } from 'react';
// import { ReactComponent as Logo} from './Instagram_logo.svg';
import logo from './insta.png';
import './App.css';
import Post from './Post';
import imageUrl from './me3.png';
import { db } from './firebase';

function App() {

  const [posts, setPosts] = useState([
    // {
    //   username: "jade",
    //   caption: "here I am",
    //   imageUrl: "./me3.png"
    // },
    // {
    //   username: "liam",
    //   caption: "yaaassssss",
    //   imageUrl: "./me3.png"
    // }
  ]);

  //runs  apiece of coded based ona  specific condition -> useEffect
//snapshot is a powerful listeneer.  everytime documents gets modified/changed in posts, snapshot is taken.  everty time new post is added
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
         id: doc.id,
         post: doc.data()
      })));
    })
  }, [])

  return (
    <div className="App">

      <div className="app__header">
        <img src={logo} className="app__headerImage" alt="logo"/>
      </div>

      <h1>hello</h1>

      {
        posts.map(({ id, post }) => (
          <Post key={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
          />
        ))
      }

      // <Post username="liam" caption="it works" imageUrl={ imageUrl}/>
      // <Post username="someone" caption="yasssssssss" imageUrl={ imageUrl}/>

    </div>
  );
}

export default App;
