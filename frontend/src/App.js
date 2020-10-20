import React from 'react';
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import './App.css';
import Heading from './components/Heading'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Posts from './components/Posts'
import PostPage from './components/PostPage'
import Category from './components/Category'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/categories')
    .then(fetchedcategories => {
      // console.log("4")
      console.log(fetchedcategories.data)

      return fetchedcategories.data.map(tag => ({
        id: tag._id,
        name: tag.name
      }))

    })
    .then(allcategories => {
      console.log(allcategories)
      setTags(allcategories)  
    })
  }, [])

  return (
    <Router>
    <div className="App">
      <Navbar tags={tags}/>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/posts/:id" exact component={PostPage} />
        <Route path="/category/:id" exact component={Category} />
      </Switch>
    </div>
    </Router>
  );
}


export default App;
