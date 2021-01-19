import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import moment from 'moment';

const PostPage = (match) => {
    const [post, setPost] = useState({post: []})
    const [postid, setPostid] = useState('')
    const [formattedDate, setDate] = useState()
    useEffect(() => {
        axios.get(`http://localhost:3000/api/post/${match.match.params.id}`)
        .then((postData) => {
            return {
                id: postData.data._id,
                title: postData.data.title,
                body: postData.data.body,
                createdAt: postData.data.createdAt
            }
        })
        .then((postData) => setPost({post: postData}))
        .then(() => setDate(moment(post.post.createdAt).format('YYYY-MM-DD')))
        .catch((err) => console.log(err))
    }, []);

    function createMarkup(html) {
        return {__html: html};
    }

    return (
        <div className="container">
            <div class="jumbotron">
                <h1 class="display-4">{post.post.title}</h1>
                <p class="lead" dangerouslySetInnerHTML={createMarkup(post.post.body)}></p>
                <hr class="my-4" />
                <p>{formattedDate}</p>
            </div>
        </div>
    );
};

export default PostPage;

