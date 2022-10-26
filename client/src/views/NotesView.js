import React from "react";
import NotesForm from "../components/NotesForm";
import NotesList from "../components/NotesList";
import Search from "../components/Search";

function NotesView(props) {
    

    return (
        <div>
            <Search handleSearchNote={props.searchNote}/>

            <NotesForm addNoteCb2={props.addNoteCb}/> 
            
            <NotesList notes2={props.notes}
            deleteCb2={props.deleteCb}/>
            
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