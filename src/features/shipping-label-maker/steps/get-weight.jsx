import React, { useState } from "react";
import PropTypes from "prop-types";

import { PrevButton, NextButton } from "../../../core/components/buttons"

const Weight = (props) => {
    const {wizardContext, onAction} = props;
    let [weight, setWeight] = useState(wizardContext.weight);

    function handleChange(event) {
        setWeight(event.target.value)
    }

    function handleAction(e, action) {
        e.preventDefault();
        if (action === 1) {
            return onAction(action, 'WEIGHT', weight);
        } else {
            if (!weight) {
                alert("Please fill out the weight field")
                return;
            }
            return onAction(action, 'WEIGHT', weight);
        }
    }

    return (
        <div>
            <div className="weight-step">
                <span id="weight-header">Enter the weight of the package:</span>
                <input type="text" onChange={handleChange} placeholder="Weight in lbs" value={(weight) ? weight : null}/>
            </div>
            <div className="action-btns">
                <PrevButton handleAction={handleAction} />
                <NextButton handleAction={handleAction} />
            </div>
        </div>
    )
}

Weight.propTypes = {
    wizardContext: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired
}

export default Weight;
