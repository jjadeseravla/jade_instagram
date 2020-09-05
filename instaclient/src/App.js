import React from 'react';
// import { ReactComponent as Logo} from './Instagram_logo.svg';
import logo from './insta.png';
import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="App">

      <div className="app__header">
        <img src={logo} className="app__headerImage" alt="logo"/>
      </div>

      <h1>hello</h1>

      <Post username="jade" caption="here I am" imageUrl="./me3.png"/>
      <Post/>
      <Post/>

    </div>
  );
}

export default App;
