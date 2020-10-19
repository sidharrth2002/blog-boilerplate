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
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/posts/:id" exact component={PostPage} />
      </Switch>
    </div>
    </Router>
  );
}


export default App;
