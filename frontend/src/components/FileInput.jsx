import React, { useState } from 'react';
import axios from 'axios';
import Display from './Display';
import UserService from '../services/UserServices';
import { useHistory } from 'react-router-dom';

function FileInput() {
    const history = useHistory();
    const fileInput = React.createRef();
    const [isPublic, setIsPublic] = useState(true);
    const [errorMessage, setErrorMessage] = useState("")
    const [toDelete, setToDelete] = useState(new Set());

    function handleSubmit(event) {
        event.preventDefault();
        const fileArr = fileInput.current.files
        const formData = new FormData();
        for (var i = 0; i < fileArr.length; i++) {
            formData.append('file', fileArr[i])
        }
        formData.append('isPublic', isPublic)
        formData.append('numFiles', fileArr.length)
        const http = axios.create({
            baseURL: "https://lj-image-storage.herokuapp.com/api",
            //baseURL: "http://localhost:8989/api",
            headers: {
                'Content-type': `multipart/form-data; boundary=${formData._boundary}`
            },
            withCredentials: true,
        });
        http.post("/images", formData)
            .then(response => {
                if (isPublic) {
                    history.push("/")
                }
                window.location.reload();
            })
            .catch(err => {
                const message = err.response.data.message
                if (err.response.status == 401) {
                    history.push("/")
                }
                if (message == "no file attached") {
                    setErrorMessage("Didn't attach any file")
                }
                else if (message == "too many images") {
                    setErrorMessage("Attempted to upload too many files (max 1000) or too much data (max 100 megabytes)");
                } else {
                    setErrorMessage("Unknown error, please try again later");
                }
            })
    }
  
    function handleChange(event) {
        //const { value, name } = event.target;
        setIsPublic(!isPublic)
    }

    function handleDelete(event) {
        UserService.deleteImages({images: Array.from(toDelete)})
            .then(response => {
                window.location.reload()
            })
            .catch(err => {
                setErrorMessage("Unknown error, please try again later")
            })
    }

    return (
        <div> 
            <div className="errorMessage" style={{color: 'red', textAlign: 'center'}}>&nbsp;{errorMessage}</div>
            <label>
                Upload files (PNG and JPEG only): 
                <input type="file" id="files" name="files" accept="image/png, image/jpeg" ref={fileInput} multiple />
            </label>
            <label>
                Make images private: 
                <input type="checkbox" id="isPublic" name="isPublic" value="private" onChange={handleChange} />
            </label>
            <button id="fileInputButton" type="submit" onClick={handleSubmit}>Submit</button>
            <label>
                Delete selected images: 
            <button id="fileInputButton" type="submit" onClick={handleDelete}>Delete</button>
            </label>
            <h3>Your Images:</h3>
            <Display isLanding={false} toDelete={toDelete} setToDelete={setToDelete} />
        </div>
    );
}

export default FileInput;