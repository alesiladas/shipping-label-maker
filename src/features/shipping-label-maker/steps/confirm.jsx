import React from "react";
import PropTypes from "prop-types";

import { PrevButton, NextButton } from "../../../core/components/buttons"

const ConfirmationPage = (props) => {
    const { wizardContext, onAction } = props;
    const { to, from, shippingOption, weight } = wizardContext;

    const shippingRate = 0.40;
    let shippingCost = weight * shippingRate *
        (shippingOption === shippingOption.ground ? 1 : 1.5);

    shippingCost = Math.round(shippingCost * 100) / 100;

    function handleAction(e, action) {
        e.preventDefault();
        return onAction(action, 'EDIT_INFO');
    }

    return (
        <div className="confirmation-page">
            <div className="information">
                <div>
                    <span>Sender {from.name}</span>
                    <br />
                    <span>Sender's Address: {from.street} {from.city}, {from.state} {from.zip}</span>
                </div>
                <div>
                    <span>Recipient {to.name}</span>
                    <br />
                    <span>Recipient's Address: {to.street} {to.city}, {to.state} {to.zip}</span>
                </div>
                <span>Weight: {weight} lbs</span>
                <br/>
                <span>
                    Shipping Option: {(shippingOption === 1) ? "Ground" : "Priority"}
                </span>
                <br/>
                <span id='cost'>Cost of Shipping: ${shippingCost}</span>
            </div>
            <div className="action-btns">
                <PrevButton handleAction={handleAction} />
                <NextButton handleAction={handleAction} isConfirm={true}/>
            </div>
        </div>
    )
}

ConfirmationPage.propTypes = {
    wizardContext: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired
}

export default ConfirmationPage;
