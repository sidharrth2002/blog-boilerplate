import Axios from 'axios';
import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {useState} from 'react';
import './Dashboard.css';
import axios from 'axios';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import editorConfiguration from '../config/editorConfiguration'

const ManagePost = (props) => {
    const [postHTML, setPostHTML] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if(props.existinghtml != '') {
            setPostHTML(props.existinghtml)
        } else {
            setPostHTML('<p>Start Typing Your Post here</p>')
        }
        console.log(postHTML)
    }, [])

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
        <div class="container mt-5">
            {
                postHTML == '<p>Start Typing Your Post here</p>' ? 
                <h1>Add a New Post!</h1>
                :
                <h1>Edit Post</h1>
            }
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
                        data= {postHTML}
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
    )
}

export default ManagePost;