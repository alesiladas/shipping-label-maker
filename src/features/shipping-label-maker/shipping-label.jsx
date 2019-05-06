import React from "react";
import PropTypes from "prop-types";

import Barcode from "react-barcode";

const ShippingLabel = (props) => {
    const { to, from, shippingOption, weight } = props.shippingInfo;

    return (
        <div className="shipping-label">
            <Barcode value='shipping label'/>
            <div className="sender">
                <span>Sender: {from.name}</span>
                <br/>
                <span>{from.street} {from.city}, {from.state} {from.zip}</span>
            </div>
            <div className="recipient">
                <span>Recipient: {to.name}</span>
                <br/>
                <span>{to.street} {to.city}, {to.state} {to.zip}</span>
            </div>
            <span className="weight">{weight} lbs</span>
            <br/>
            <span className="shipping-option">
                {(shippingOption === shippingOption.ground) ? "Ground Shipping" : "Priority Shipping"}
            </span>
        </div>
    )
}

ShippingLabel.propTypes = {
    shippingInfo: PropTypes.object.isRequired,
}

export default ShippingLabel;
