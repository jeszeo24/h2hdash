// IMPORTANT NOTE: From Jim's FiledUpload demo
// NOTE: Also watched CodeOp's video here: https://www.youtube.com/watch?v=HU4wdKseOks&ab_channel=CodeOpTeam


import React, { useState } from 'react';

function UploadForm(props) {
    const [note, setNote] = useState('');
    const [file, setFile] = useState(null);

    function handleChange(event) {
        setNote(event.target.value);
    }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Create FormData obj and append everything to upload
        let formData = new FormData();
        formData.append('clientnote', note);
        formData.append('clientfile', file, file.name);

        // Call parent's callback
        props.uploadCb(formData);

        // Reset everything
        setNote('');
        setFile(null);  // remove filename of previous file
        event.target.reset();
    }

    return (
        <div className="UploadForm">
            <form onSubmit={handleSubmit}>
                <label>
                    Note
                    <input 
                        type="text"
                        value={note}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    File
                    <input 
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UploadForm;