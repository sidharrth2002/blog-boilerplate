import React from 'react';
import { Link } from 'react-router-dom';

const Post = (props) => {
    const handleClick = () => {
    
    }

    const createMarkup = (html) => {
        return {__html: html};
    }

    return (
            <div className="col-md-6">
                <div class="card mb-3">
                    {/* <img class="card-img-top" src="..." alt="Card image cap" /> */}
                    <div class="card-body">
                        <h5 class="card-title">{props.data.title}</h5>
                        {/* <p class="card-text" dangerouslySetInnerHTML={createMarkup(props.data.body)}></p> */}
                        <p class="card-text"><small class="text-muted">{props.data.createdAt}</small></p>
                        <Link to={`/posts/${props.data.id}`}><button className="btn btn-success text-align-center">Read More</button></Link>
                        </div>
                    </div>
                </div>
    );
};

export default Post;