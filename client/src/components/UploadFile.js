// NOTE: Followed CodeOp's video here: https://www.youtube.com/watch?v=HU4wdKseOks&ab_channel=CodeOpTeam

import axios from "axios";
import React, { Component } from "react";

class UploadFile extends Component {
    state = {
        selectedFile: null,
    }

    // On file select
    onFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0 ]});
    };
    // function onFileChange(event) {
    //     setSelectedFile({
    //         selectedFile: event.target.files[0]
    //     })
    //     console.log(event.target.files[0]);
    // }

   // On file upload 
  onFileUpload = () => {
       // FormData is an interface that provides a way to esasily construct a set of key/value pairs representing form fields and their values
       // allows us to include files in a post request
       const formData = new FormData();

       // Update the formData object
       formData.append(
           "imagefile", // called this because in the backend images route, is called imagefile
           this.state.selectedFile, // what we changed with onFileChange
           this.state.selectedFile.name // optional, grab name and send along
       );

       axios
       // wrapper for fetch, provides backend compatibility (fetch does not work on explorer 11)
       // with Axios, don't need to convert it back to JSON (when we receive a response)
       // also don't need to send the body
       // returns a promise then can do something (in most cases can just replace the word fetch with axios)
            .post("/images", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => console.log(res));
   };  

   render() {
  return (
    <div className="UploadFile">

      <input type="file" onChange={this.onFileChange}/>
      <button onClick={this.onFileUpload}>Click</button>
    </div>
  );
}
}

export default UploadFile;