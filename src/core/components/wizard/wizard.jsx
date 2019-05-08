import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";

function reducer(state, action) {
    switch (action.type) {
        case 'FROM':
            return { ...state, from: action.value };
        case 'TO':
            return { ...state, to: action.value };
        case 'WEIGHT':
            return { ...state, weight: action.value };
        case 'SHIPPING_OPTION':
            return { ...state, shippingOption: action.value };
        case 'EDIT_INFO':
            return { ...state }
        default:
            throw new Error("case not found");
    }
}

const Wizard = (props) => {
    const { header, steps, wizardContext, onComplete } = props;
    const wizardAction = { prev: 1, next: 2, end: 3 }
    let [currentStep, setCurrentStep] = useState(1);

    const [state, dispatch] = useReducer(reducer, wizardContext)
    if (!state) return null;
    const stepProps = { wizardContext: state, onAction }

    function onAction(action, actionType, value) {
        if (action === wizardAction.prev && currentStep !== 1) {
            dispatch({ type: actionType, value });
            setCurrentStep(currentStep - 1);
            header(true);
        } else if (action === wizardAction.next) {
            dispatch({ type: actionType, value });
            setCurrentStep(currentStep + 1)
            header(false);
        } else if (action === wizardAction.end) {
            onComplete(state);
        }
    }

    return (
        <div>
            { React.cloneElement(steps[currentStep - 1], { ...stepProps })}
        </div>

    )
}

Wizard.propTypes = {
    header: PropTypes.func.isRequired,
    steps: PropTypes.array.isRequired,
    wizardContext: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired
};

export default Wizard;
