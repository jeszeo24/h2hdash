// IMPORTANT NOTE: From Jim's FiledUpload demo
// NOTE: Also watched CodeOp's video here: https://www.youtube.com/watch?v=HU4wdKseOks&ab_channel=CodeOpTeam
import "./UploadForm.css";

import React, { useState } from 'react';

function UploadForm(props) {
    const [file, setFile] = useState(null);

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Create FormData obj and append everything to upload
        let formData = new FormData();
        formData.append('clientfile', file, file.name);

        // Call parent's callback, uploadCb function passed down by PhotoCarouselView
        props.uploadCb(formData);

        setFile(null);  // remove filename of previous file
        event.target.reset();
    }

    return (
        <div className="UploadForm">
            <form onSubmit={handleSubmit}>

                    <input 
                        type="file"
                        onChange={handleFileChange}
                        required
                    />

                    {"  "}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UploadForm;