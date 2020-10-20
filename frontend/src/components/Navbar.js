import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const [categoryID, setCategoryID] = useState([])
  useEffect(() => {
    if (props.tags && props.tags[0]) {
      setCategoryID((arr) => {
        arr.push(props.tags[0].id);
        arr.push(props.tags[1].id);    
        arr.push(props.tags[2].id);     
      })     
    }
  }, [props.tags])

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Maths for Geeks</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">  
            {
              props.tags[0] ? 
              <Link to={`/category/${props.tags[1].id}`}><a class="nav-link" href="#">Test Category<span class="sr-only"></span></a></Link>
              :
              <Link to={`/`}><a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a></Link>
            }
            </li>
            <li class="nav-item">
              <Link to="/"><a class="nav-link" href="#">Basic Math</a></Link>
            </li>
            <li class="nav-item">
              <Link to="/"><a class="nav-link" href="#">Middle School Maths</a></Link>
            </li>
          </ul>
          <span class="navbar-text">
            All the Maths Help You Need
          </span>
        </div>
      </nav>
    );
}

export default Navbar;

// {
//   "categories": [
//     {
//       "id": "5f87f4f1f019e7a807079fcd",
//       "name": "the geek blog"
//     },
//     "{id: \"5f87f4f1f019e7a807079fce\", name: \"middle scho…}",
//     "{id: \"5f87f4f1f019e7a807079fcf\", name: \"basic math\"}",
//     "{id: \"5f87f4f2f019e7a807079fd0\", name: \"higher leve…}"
//   ]
// }