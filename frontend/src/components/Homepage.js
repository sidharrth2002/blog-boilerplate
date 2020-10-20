import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Heading from './Heading'
import Posts from './Posts'

const Homepage = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:3000/api/posts')
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
      <div>
        <Heading />
        <Posts posts={posts}/>
        {/* <p>{categories[0].name}</p> */}
      </div>
    );
  }
  
  export default Homepage