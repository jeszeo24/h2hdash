import React from "react";
import "./NotesList.css";
import { TbTrash } from "react-icons/tb"
// NOTE: From https://react-icons.github.io/react-icons/
// Sticky Notes Drag and Drop: https://www.youtube.com/watch?v=KcXsX1XXa2s&ab_channel=codebubb


// NOTE: Drag function as per video not working
function NotesList(props) {
    function dropNote(event) {
        event.target.style.left = `${event.pageX - 50}px`;
        event.target.style.top = `${event.pageY - 50}px`;
    }

function dragOver(event) {
    event.stopPropagation();
    event.preventDefault();
}

  return (
    <div className="NotesList" onDragOver={dragOver}>
      <ul>
        {props.searched.map(n => (
          <li key={n.id}>
        
        <div className="text"
        draggable="true"
        onDragEnd={dropNote}
        key={n.id}>
            {n.text}

            <div className="footer">
                {/* Because date also displays time, slice to only display date */}
            <small>{(n.date).slice(0,10)}</small>
            <TbTrash 
            className="delete-icon"
            onClick={e => props.deleteCb2(n.id)} />
            </div>
            </div>
    
          </li>
        ))}
      </ul>

    </div>
  );
}

export default NotesList;
