import React from "react";

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <div className="filler" style={{width: `${props.percentage}%`}}/>
        </div>
    )
}

export default ProgressBar;
