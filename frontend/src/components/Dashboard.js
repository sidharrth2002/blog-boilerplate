import Axios from 'axios';
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {useState} from 'react';
import './Dashboard.css';
import axios from 'axios';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const editorConfiguration = {
    // plugins: [ImagePlugin],
    // plugins: [EasyImage],
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'MathType', 'image', 'imageUpload']
};

const Dashboard = () => {
    const [postHTML, setPostHTML] = useState('');
    const [title, setTitle] = useState('');

    const getUserData = () => {
        
    }

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
            <div className="mt-4 mb-4">
                <h2>Welcome Sidharrth.</h2>
                <h5>Add a new post below</h5>
            </div>
            <div class="form-group">
              <label for=""></label>
              <input onChange={(e) => setTitle(e.target.value)} type="text"
                class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
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