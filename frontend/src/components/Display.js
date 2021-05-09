import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ImageService from '../services/ImageServices';
import UserService from '../services/UserServices';
import { arrayBufferToBlob, createObjectURL } from 'blob-util';

function Landing (props) {

    const [images, setImages] = useState([]);

    function convert(images) {
        const converted = []
        for (var i = 0; i < images.length; i++) {
            const unit8 = new Uint8Array(images[i].data);
            const blob = arrayBufferToBlob(unit8);
            const blobURL = createObjectURL(blob);
            converted.push(blobURL)
        }
        setImages(converted)
    }

    useEffect(() => {
        if (props.isLanding) {
            ImageService.getImages()
                .then(response => {
                    const results = response.data.results
                    //const extensions = response.data.extensions
                    convert(results)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            UserService.getImages()
                .then(response => {
                    const results = response.data.results
                    console.log(results)
                    //const extensions = response.data.extensions
                    convert(results)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, []);


    function createImage(image) {
        console.log(image)
        return (
            <img src={image} />
        )
    }


    return (
        images ?
        <div className="center-styling">
            {images.map(createImage)}
        </div> : 
        <div />
    )
};

export default Landing
