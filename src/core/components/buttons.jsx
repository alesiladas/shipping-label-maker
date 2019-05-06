import React from "react";
import PropTypes from "prop-types";

export const PrevButton = (props) => {
    const {handleAction} = props;
    return <button id="prev" onClick={(e) => handleAction(e, 1)}>Previous</button>
}

export const NextButton = (props) => {
    const {handleAction, isConfirm} = props;

    if (isConfirm) return <button id="confirm-btn" onClick={(e) => handleAction(e, 3)}>Confirm</button>
    return <button id="next" onClick={(e) => handleAction(e, 2)}>Next</button>
}

PrevButton.propTypes = {
    handleAction: PropTypes.func.isRequired,
}

NextButton.propTypes = {
    handleAction: PropTypes.func.isRequired,
    isConfirm: PropTypes.bool
}
