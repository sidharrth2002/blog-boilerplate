import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './Posts'

const Category = (match) => {
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/category/${match.match.params.id}`)
        .then(fetchedposts => {
            console.log(fetchedposts.data)
            return fetchedposts.data.map(post => ({
                id: post._id,
                title: post.title,
                body: post.body,
                createdAt: post.createdAt
            }))
        })
        .then(allposts => {
            console.log(allposts)
            setPosts(allposts)
        });
    }, [])

    return (
        <div className="container">
            <h1 className="mt-4">In this category:</h1>
            <br />
            <br />
            <Posts posts={posts} />
        </div>
    );
};

export default Category;