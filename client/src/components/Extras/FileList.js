import React from 'react';
// import './FileList.css';

function FileList(props) {
    function formatDate(dt) {
        return new Date(dt).toLocaleString();
    }

    return (
        <div className="FileList">
            <table>
                <thead>
                    <tr>
                        <th>Note</th>
                        <th>File Name</th>
                        <th>Uploaded On</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.files.map(f => (
                        <tr key={f.id}>
                            <td>{f.note}</td>
                            <td><a href={f.url}>{f.filename}</a></td>
                            <td>{formatDate(f.uploadedOn)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default FileList;