import React from "react";

function TimeZone(props) {
let t = props.time;

  return (
    <div className="TimeZone">
       <p>
           {t.datetime}
       </p>
    </div>
  );
}

export default TimeZone;
