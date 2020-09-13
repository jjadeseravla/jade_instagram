import React, { useState, useEffect } from 'react';
// import { ReactComponent as Logo} from './Instagram_logo.svg';
import logo from './insta.png';
import './App.css';
import Post from './Post';
import imageUrl from './me3.png';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left:`${left}%`,
    transform: `translate(-${top}%, =${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

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
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  //runs  apiece of coded based ona  specific condition -> useEffect
//snapshot is a powerful listeneer.  everytime documents gets modified/changed in posts, snapshot is taken.  everty time new post is added
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
         id: doc.id,
         post: doc.data()
      })));
    })
  }, []);

  const signUp = (e) => {

  }


  return (
    <div className="App">
      <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>

      <form className="app__signup">
        <center>
            <img src={logo} className="app__headerImage" alt="logo"/>
        </center>

          <input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button onClick={signUp}>Sign Up</Button>
        </form>
      </div>
    </Modal>

      <div className="app__header">
        <img src={logo} className="app__headerImage" alt="logo"/>
      </div>

      <Button onClick={() => setOpen(true)}>Sign Up</Button>

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
