import React, { useState } from "react";
import PropTypes from "prop-types";

import { PrevButton, NextButton } from "../../../core/components/buttons"

const AddressForm = (props) => {
    const { person, wizardContext, onAction } = props;
    const wizardContextProperty = (person === "sender") ? "from" : "to";
    const currentField = wizardContext[wizardContextProperty];

    let [name, setName] = useState(currentField.name);
    let [street, setStreet] = useState(currentField.street);
    let [city, setCity] = useState(currentField.city);
    let [state, setState] = useState(currentField.state);
    let [zip, setZip] = useState(currentField.zip);

    function handleAction(e, action) {
        e.preventDefault();
        const actionType = (person === "sender") ? "FROM" : "TO";
        if (action === 1) {
            return onAction(action, actionType, {
                name, street, city, state, zip
            });
        } else {
            if (!name || !street || !city || !state || !zip) {
                alert("Please fill out all fields")
                return;
            }
            return onAction(action, actionType, {
                name, street, city, state, zip
            });
        }
    }

    function handleChange(event, field) {
        event.preventDefault();
        const value = event.target.value;
        switch (field) {
            case "name":
                setName(value);
                break;
            case "street":
                setStreet(value);
                break;
            case "city":
                setCity(value);
                break;
            case "state":
                setState(value);
                break;
            case "zip":
                setZip(value);
                break;
            default:
                throw new Error("Case Not Defined")
        }
    }

    const addressFields = ["name", "street", "city", "state", "zip"].map((field) => {
        return <input type="text" placeholder={field} onChange={e => handleChange(e, field)}
            value={(currentField) ? currentField[field] : null} />
    })

    return (
        <div className="address-form">
            <span id="form-header">Enter the {person}'s address:</span>
            <form>
                {addressFields}
            </form>
            <div className="action-btns">
                <PrevButton handleAction={handleAction} />
                <NextButton handleAction={handleAction} />
            </div>
        </div>
    )
}

AddressForm.propTypes = {
    wizardContext: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired,
    person: PropTypes.oneOf(['sender', 'recipient'])
}

export default AddressForm;
