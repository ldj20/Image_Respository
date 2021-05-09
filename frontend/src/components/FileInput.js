import React, { useState } from 'react';
import axios from 'axios';
import Display from './Display';

function FileInput() {
    const fileInput = React.createRef();
    const [isPublic, setIsPublic] = useState(true);
    const [errorMessage, setErrorMessage] = useState("")

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
            baseURL: "http://localhost:8989/api",
            headers: {
                'Content-type': `multipart/form-data; boundary=${formData._boundary}`
            },
            withCredentials: true,
        });
        for (let obj of formData) {
            console.log(obj)
        }
        http.post("/images", formData)
            .then(response => {
                window.location.reload();
            })
            .catch(err => {
                if (err.response.data.message == "too many images") {
                    setErrorMessage("Attempted to upload too many files (max 1000)");
                } else {
                    setErrorMessage("Unknown error, please try again later");
                }
            })
    }
  
    function handleChange(event) {
        //const { value, name } = event.target;
        setIsPublic(!isPublic)
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
            <button type="submit" onClick={handleSubmit}>Submit</button>

            <h3>Your Images:</h3>
            <Display isLanding={false} />
        </div>
    );
}

export default FileInput;