import React, { useState, useEffect } from "react";
import NotesForm from "../components/NotesForm";
import NotesList from "../components/NotesList";
import Search from "../components/Search";

function NotesView(props) {
    const [searched, setSearched] = useState([]);

  useEffect(() => {
    setSearched(props.notes);
  }, [props.notes]);
  //state stores as searched again (when state changes, rerenders)

  function search(input) {
    let tempNotes = props.notes.filter((n) => {
    return n.text.includes(input);
    });
    console.log(tempNotes);
    setSearched(tempNotes);
  }

//   function reset() {
//     setSearched(props.notes);
//     console.log(props.notes);
//   }
    
    return (
        <div>
            <Search 
            searchCb={input => search(input)} />
            {/* resetAllCb={reset}/> */}

            <NotesForm addNoteCb2={props.addNoteCb}/> 
            
            <NotesList notes2={props.notes}
            deleteCb2={props.deleteCb}
            searched={searched}
            // these are the notes that want to display in NotesList
            // not calling the function, sending searched
            />
            
        </div>
        
    )
}

export default NotesView;

//NOTES:
// left is the key for child to use
// right is the function we are calling
{/* props.addNoteCb is the function passed by parent, send addNoteCb2 key to NotesForm */}
{/* props.notes and props.deleteCb is function passed by parent,
            send notes2 and deleteCb2 to NotesList */}

// RESOURCE REFERENCES:
// https://www.youtube.com/watch?v=KcXsX1XXa2s&ab_channel=codebubb
// https://www.youtube.com/watch?v=8KB3DHI-QbM&ab_channel=ChrisBlakely
