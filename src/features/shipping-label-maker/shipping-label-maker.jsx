import React from "react";

import Wizard from "../../core/components/wizard/wizard";
import ProgressBar from "../../core/components/progress-bar";
import ShippingLabel from "./shipping-label";
import AddressForm from "./steps/get-address";
import Weight from "./steps/get-weight";
import ShippingOption from "./steps/get-shipping-option";
import ConfirmationPage from "./steps/confirm";

export default class ShippingLabelMaker extends React.Component {
    constructor(props) {
        super()
        this.state = {
            shippingInfo: {
                from: {},
                to: {},
                shippingOption: {
                    ground: 1,
                    priority: 2
                },
                weight: null
            },
            percentComplete: 0,
            isComplete: false
        }

        this.onComplete = this.onComplete.bind(this);
        this.header = this.header.bind(this);
    }

    onComplete(newShippingInfo) {
        this.setState((prevState) => {
            return { ...prevState, shippingInfo: newShippingInfo, isComplete: true }
        });
    }

    header(isGoingBackwards) {
        if (isGoingBackwards) {
            this.setState((prevState) => {
                return { ...prevState, percentComplete: prevState.percentComplete - 25 }
            })
        } else {
            this.setState((prevState) => {
                return { ...prevState, percentComplete: prevState.percentComplete + 25 }
            })
        }
    }

    render() {
        if (this.state.isComplete) return (
            <div className="shipping-label-maker">
                <ShippingLabel shippingInfo={this.state.shippingInfo} />
            </div>
        )
        else return (
            <div className="shipping-label-maker">
                <h3>Shipping Label Maker</h3>
                <ProgressBar percentage={this.state.percentComplete} />
                <Wizard wizardContext={this.state.shippingInfo}
                    steps={[<AddressForm person="sender" />,
                    <AddressForm person="recipient" />,
                    <Weight />, <ShippingOption />,
                    <ConfirmationPage isConfirm={true} />]}
                    onComplete={this.onComplete}
                    header={this.header} />
            </div>
        )
    }
}
