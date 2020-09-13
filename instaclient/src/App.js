import React, { useState, useEffect } from 'react';
// import { ReactComponent as Logo} from './Instagram_logo.svg';
import logo from './insta.png';
import './App.css';
import Post from './Post';
import imageUrl from './me3.png';
import { db, auth } from './firebase';
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
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => { //useEffect is front end listener and unsubscribe is a back end listener
    //listens to any authentication change, eg login or out or create a user
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser);
        setUser(authUser); //it survives refresh cos os cookie tracking
      } else {
        //user has logged out
        setUser(null);
      }
    })
    //if useEffect fires again, perform some clean up actions before refire useEffect
    return () => {
      unsubscribe(); //so it doesnt spam cos you could press login 100 times and useEffect fired 100 times but this will only fire backend listener once
    }
  }, [user, username]);


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
    e.preventDefault(); //so doesnt refresh when submit form
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))

      setOpen(false);
  }

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

      setOpenSignIn(false);
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

    <Modal
      open={openSignIn}
      onClose={()=> setOpenSignIn(false)}
    >
    <div style={modalStyle} className={classes.paper}>

    <form className="app__signup">
      <center>
          <img src={logo} className="app__headerImage" alt="logo"/>
      </center>
        <input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button onClick={signIn}>Sign In</Button>

      </form>
    </div>
  </Modal>

      <div className="app__header">
        <img src={logo} className="app__headerImage" alt="logo"/>
      </div>

      {user ? (
        <Button type="submit" onClick={() => auth.signOut()}>Log out</Button>
      ): (
        <div className="app__loginContainer">
          <Button type="submit" onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button type="submit" onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}

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
