import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ImageService from '../services/ImageServices';
import UserService from '../services/UserServices';
import { arrayBufferToBlob, createObjectURL } from 'blob-util';

function Landing (props) {

    const history = useHistory();
    const [images, setImages] = useState([]);

    function convert(images) {
        const converted = []
        for (var i = 0; i < images.length; i++) {
            const unit8 = new Uint8Array(images[i][0].data);
            const blob = arrayBufferToBlob(unit8);
            const blobURL = createObjectURL(blob);
            converted.push([blobURL, images[i][1]])
        }
        setImages(converted)
    }

    useEffect(() => {
        if (props.isLanding) {
            ImageService.getImages()
                .then(response => {
                    console.log(response.data.results)
                    const results = response.data.results
                    //const extensions = response.data.extensions
                    convert(results)
                })
                .catch(err => {
                    console.log(err)
                    if (err.response.status == 401) {
                        history.push("/")
                    }
                })
        } else {
            UserService.getImages()
                .then(response => {
                    const results = response.data.results
                    convert(results)
                })
                .catch(err => {
                    if (err.response.status == 401) {
                        history.push("/")
                    }
                })
        }
    }, []);

    function createImage(image) {
        return (
            <figure class="gallery-frame" key={image[1]}>
                <img class="gallery-img" src={image[0]} />
            </figure>
        )
    }

    return (
        images ?
        <div class="gallery-grid">
            {images.map(createImage)}    
        </div>
        : 
        <div />
    )
};

export default Landing
