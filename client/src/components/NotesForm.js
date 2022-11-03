import React, { useState } from "react";
import "./NotesForm.css";

function NotesForm(props) {
  const [input, setInput] = useState("");

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // receive addNoteCb from App parent, and pass input to parent
    props.addNoteCb3(input); // sends input to NotesForm component within NotesList
    setInput(""); // reset form fields
    // QUESTION: WHY IS IT NOT RESETTING?
  }

  return (
<<<<<<< HEAD
      <div>
    <form className="NoteForm lh-sm" onSubmit={handleSubmit}>
        <textarea
            rows="8"
            cols="18"
            type="text"
            name="text"
            placeholder='type to add a note...'
            value={input.text}
            onChange={handleChange}
        >
      </textarea>
||||||| d3e480d
      <div>
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
=======
    <form className="NoteForm" onSubmit={handleSubmit}>
      <textarea
        rows="8"
        cols="18"
        type="text"
        name="text"
        placeholder="Type to add a note..."
        value={input}
        onChange={handleChange}
      ></textarea>
>>>>>>> test

      <button className="Notebutton" type="submit">
        Save
      </button>
    </form>
  );
}

export default NotesForm;
