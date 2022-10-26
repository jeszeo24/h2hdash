import React, { useState } from "react";
import { MdSearch } from "react-icons/md"
import "./Search.css";

function Search(props) {
    const [input, setInput] = useState("");
    
    function handleChange(event) {
        setInput(event.target.value);
        props.handleSearchNote(input);
    }

    return (
        <div className="search">
            <MdSearch className="search-icons" size="1em" />
            <input 
            type="text" 
            placeholder="type to search..."
            onChange={handleChange}
            /> 

        </div>

    )
}

export default Search;