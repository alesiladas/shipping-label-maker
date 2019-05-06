import React, {useState} from "react";
import PropTypes from "prop-types";

import { PrevButton, NextButton } from "../../../core/components/buttons"

const ShippingOption = (props) => {
    const {onAction, wizardContext} = props;
    let [option, setOption] = useState(
        (wizardContext.shippingOption) ? wizardContext.shippingOption : 1
    );

    function handleAction(e, action) {
        e.preventDefault();
        return onAction(action, 'SHIPPING_OPTION', option);
    }

    return (
        <div>
            Please choose a delivery method:
            <div className="delivery-methods">
                <button onClick={() => setOption(1)}>Ground</button>
                <button onClick={() => setOption(2)}>Priority</button>
            </div>
            <div className="action-btns">
                <PrevButton handleAction={handleAction} />
                <NextButton handleAction={handleAction} />
            </div>
        </div>
    )
}

ShippingOption.propTypes = {
    wizardContext: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired
}

export default ShippingOption;
