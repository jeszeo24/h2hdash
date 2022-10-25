import React from "react";


function NotesList(props) {
  return (
    <div className="NotesList">
      <ul>
        {props.notes.map(n => (
          <li key={n.id}>
            {n.text}
            <button
              type="button"
              title="delete"
              onClick={e => props.deleteCb(n.id)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
