import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import App from './app';
import Wizard from "./core/components/wizard/wizard";
import AddressForm from "./features/shipping-label-maker/steps/get-address";
import ConfirmationPage from "./features/shipping-label-maker/steps/confirm";
import ShippingLabelMaker from './features/shipping-label-maker/shipping-label-maker';

it('renders without crashing', () => {
    shallow(<App />);
});

describe('Component tests', () => {
    describe('<Wizard />', () => {
        let wrapper;
        let onCompleteSpy, headerSpy;

        beforeAll(() => {
            onCompleteSpy = jest.fn();
            const shippingInfo = {
                from: {},
                to: {},
                shippingOption: {
                    ground: 1,
                    priority: 2
                },
                weight: 0
            }

            const steps = [<AddressForm person="sender" />, <AddressForm person="recipient" />, <ConfirmationPage isConfirm={true} />]
            wrapper = mount(<Wizard wizardContext={shippingInfo} onComplete={onCompleteSpy} header={headerSpy} steps={steps} />);
        });

        describe('Moves backwards and forwards based on actions sent by steps', () => {
            it ("Moves to the next step when the Next button is clicked", () => {
                expect(wrapper.find('#next').text()).toBe("Next");
                //simulate click and check for the next step's className

            });

            it ("Moves to the previous step when the Previous button is clicked", () => {
                expect(wrapper.find('#previous').text()).toBe("Previous");
                //simulate click and check for the next step's className
            });
        });

        it('Calls onComplete() of the parent when a step sends the end action', () => {
            wrapper.find('#confirm-btn').simulate('click');
            expect(onCompleteSpy).toHaveBeenCalled();
        });
    });

    describe('<ConfirmationPage />', () => {
        let wrapper;
        let onActionSpy;

        beforeAll(() => {
            onActionSpy = jest.fn();
            const shippingInfo = {
                from: { name: "Bob White", street: "90 Cloudberry St", city: "New York", state: "NY", zip: "00009" },
                to: { name: "Bob Ross", street: "85 Forrest St", city: "New York", state: "NY", zip: "10001" },
                shippingOption: 2,
                weight: 11
            }

            wrapper = mount(<ConfirmationPage isConfirm={true} wizardContext={shippingInfo} onAction={onActionSpy} />)
        })

        it("Prints the cost correctly according to formula", () => {
            expect(wrapper.find('#cost').text()).toBe('Cost of Shipping: $6.6')
        })
    })

    describe('<ShippingLabelMaker />', () => {
        let wrapper;

        beforeAll(() => {
            wrapper = mount(<ShippingLabelMaker/>)
        })
        it('Prints the shipping label when onComplete() is called', () => {
            //find "confirm-btn" and simulate click
            //find the "shipping-label" classname and expect it to exist
            expect(wrapper.find('.shipping-label')).toHaveLength(1);
        });
    });

});
