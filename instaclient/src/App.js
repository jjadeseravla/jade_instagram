import React, { useState } from 'react';
// import { ReactComponent as Logo} from './Instagram_logo.svg';
import logo from './insta.png';
import './App.css';
import Post from './Post';
import imageUrl from './me3.png';

function App() {

  const [posts, setPosts] = useState([
    {
      username: "jade",
      caption: "here I am",
      imageUrl: "./me3.png"
    },
    {
      username: "liam",
      caption: "yaaassssss",
      imageUrl: "./me3.png"
    }
  ]);

  return (
    <div className="App">

      <div className="app__header">
        <img src={logo} className="app__headerImage" alt="logo"/>
      </div>

      <h1>hello</h1>

      {
        posts.map(post => (
          <Post
                username={post.username}
                caption={post.caption}
                imageUrl={posts.imageUrl}
          />
        ))
      }

      // <Post username="liam" caption="it works" imageUrl={ imageUrl}/>
      // <Post username="someone" caption="yasssssssss" imageUrl={ imageUrl}/>

    </div>
  );
}

export default App;
