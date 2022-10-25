import React, { useState } from "react";
import "./NotesForm.css";

const INIT_STATE = {
  text: ""
};

function NotesForm(props) {
  const [input, setInput] = useState(INIT_STATE);


  function handleChange(event) {
    let { name, value } = event.target;
    setInput(data => ({
      ...data,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // receive addNoteCb from App parent, and pass input to parent
    props.addNoteCb(input);
    setInput(INIT_STATE); // reset form fields
  }

  return (
    <form className="NoteForm" onSubmit={handleSubmit}>
        <textarea
            rows="8"
            cols="18"
            type="text"
            name="text"
            placeholder='Type to add a note...'
            value={input.text}
            onChange={handleChange}
        >
      </textarea>

    <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default NotesForm;