import React from 'react';
import me from './me3.png';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post() {
  return (
    <div className="post">

      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="username"
          src={me}
        />
        <h3>Username</h3>
      </div>


        <img className="post__image" src={me} alt="me"/>
        <h4 className="post__text">
          <strong>Username: </strong>
            caption
          </h4>
    </div>
  )
}

export default Post;
