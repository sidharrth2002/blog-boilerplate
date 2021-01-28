import React, { useEffect, useState } from 'react';
import Post from './Post'
import { ModalTitle } from 'react-bootstrap';

const Posts = (props) => {
    return (
        <div className="container">
            <div className="row text-center">
                {props.posts.map(post => 
                    <Post key={post.id} data={post} />
                )}
            </div>
        </div>
    );
};

export default Posts;