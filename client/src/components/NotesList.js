import React from "react";
import "./NotesList.css";
import { TbTrash } from "react-icons/tb"
// NOTE: From https://react-icons.github.io/react-icons/

function NotesList(props) {
  return (
    <div className="NotesList">
      <ul>
        {props.searched.map(n => (
          <li key={n.id}>
            {n.text}

            <div className="footer">
                {/* Because date also displays time, slice to only display date */}
            <small>{(n.date).slice(0,10)}</small>
            <TbTrash 
            className="delete-icon"
            onClick={e => props.deleteCb2(n.id)} />
            </div>
    
          </li>
        ))}
      </ul>

    </div>
  );
}

export default NotesList;
