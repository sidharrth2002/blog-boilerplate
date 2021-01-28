import Axios from 'axios';
import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {useState} from 'react';
import './Dashboard.css';
import axios from 'axios';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const editorConfiguration = {
    // plugins: [ImagePlugin],
    // plugins: [EasyImage],
    toolbar: [ 'heading', '|', 'bold', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'MathType', 'image', 'imageUpload']
};

const Dashboard = () => {
    const [postHTML, setPostHTML] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [numPosts, setNumPosts] = useState(0);

    //should use redux soon
    useEffect(() => {
        axios.get('/api/post/posts')
        .then(fetchedposts => {
          return fetchedposts.data.length
        })
      .then(allposts => {
          console.log(allposts)
          setNumPosts(allposts)
      });    
    }, []);

    const sendPost = () => {
        console.log('Sending to server');
        axios.post('/api/post/createpost', {
            title: title,
            htmlData: postHTML    
        }, {
            withCredentials: true
        })
        .then(response => console.log(response));
    }

    return (
        <div className="container">
            <div className="mt-4 mb-4 text-center">
                <h2>Welcome Sidharrth.</h2>
                <h3>You have published {numPosts} posts.</h3>
                <h5>Add a new post below.</h5>
            </div>
            <div className="row mb-4">
                <div className="col-md-3">
                    <label for="title">Title:</label>
                </div>
                <div className="col-md-9">
                <input onChange={(e) => setTitle(e.target.value)} type="text"
                    className="form-control" name="" id="title" aria-describedby="helpId" placeholder="" />
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md-3">
                    <label for="title">Description:</label>
                </div>
                <div className="col-md-9">
                <input onChange={(e) => setDescription(e.target.value)} type="text"
            className="form-control" name="description" aria-describedby="helpId" />                
                </div>
            </div>
            <div className="editorArea">
                <CKEditor
                        editor={ Editor }
                        config={ editorConfiguration }
                        data="<p>Start Typing your post here</p>"
                        onReady={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setPostHTML(data);
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>
                <button className="mt-4 btn btn-primary" onClick={sendPost}>Add Post</button>
        </div>
    );
};

export default Dashboard;