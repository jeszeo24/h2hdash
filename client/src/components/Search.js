import React, { useState } from "react";
import { MdSearch } from "react-icons/md"
import "./Search.css";

function Search(props) {
    const [input, setInput] = useState("");
    
    function handleChange(event) {
        setInput(event.target.value);
        props.searchCb(event.target.value); // searchCb passed down by parent NotesView
        // not input, because line 9 is asynchronous
        // if want to do something right after, don't use state (don't need to wait for state to be updated)
    }

    return (
        <div className="search">
            <form >
            {/*<form onSubmit={handleSubmit}> */}
            <MdSearch className="search-icons" size="2em" />
            <input 
            type="text" 
            placeholder="   type to search..."
            value={input}
            onChange={handleChange}
            /> 
            </form>
        </div>

    )
}

export default Search;