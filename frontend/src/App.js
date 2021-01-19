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
import Dashboard from './components/Dashboard'
import WithAuth from './middleware/withAuth'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import withAuth from './middleware/withAuth';

function App() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('/api/post/categories')
    .then(fetchedcategories => {
      // console.log("4")
      console.log('the categories are ')
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
        <Route path="/dashboard" component={WithAuth(Dashboard)} />
        <Route path="/login" component={Login} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/posts/:id" exact component={PostPage} />
        <Route path="/category/:id" exact component={Category} />
      </Switch>
    </div>
    </Router>
  );
}


export default App;
