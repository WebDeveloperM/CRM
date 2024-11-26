import { Steps, Panel } from 'rsuite';
import React from 'react';
import AddClinicaTab1 from './AddClinicaTabs/AddClinicaTab1';
import AddClinicaTab2 from './AddClinicaTabs/AddClinicaTab2';

import AddClinicaTab3 from './AddClinicaTabs/AddClinicaTab3';
import AddClinicaTab4 from './AddClinicaTabs/AddClinicaTab4';

export default function CheckoutStepper() {
    const [step, setStep] = React.useState(0);

    const onChange = (nextStep: number) => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    return (
        <div className='pt-9' >
            <Steps current={step} className='px-10'>
                <Steps.Item title="Umumiy ma'lumotlar" />
                <Steps.Item title="Profile" />
                <Steps.Item title="Ish vaqti" />
                <Steps.Item title="Account" />
            </Steps>
            <hr />

            <Panel 
                className='px-5'
                header={`
                    ${step == 0 ? "Umumiy ma'lumotlar" : ""}  
                    ${step == 1 ? "Profile" : ""} 
                    ${step == 2 ? "Ish vaqti" : ""}  
                    ${step == 3 ? "Account" : ""} 
                `}>
                {step == 0 ? <AddClinicaTab1 onPrevious={onPrevious} onNext={onNext} /> : ""}
                {step == 1 ? <AddClinicaTab2 onPrevious={onPrevious} onNext={onNext} /> : ""}
                {step == 2 ? <AddClinicaTab3 onPrevious={onPrevious} onNext={onNext} /> : ""}
                {step == 3 ? <AddClinicaTab4 onPrevious={onPrevious} onNext={onNext} /> : ""}
            </Panel>
        </div>
    );
};
