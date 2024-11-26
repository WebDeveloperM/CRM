import { Steps, Panel } from 'rsuite';
import React, { useState } from 'react';
import AddClinicaTab1 from './AddClinicaTabs/AddClinicaTab1';
import AddClinicaTab2 from './AddClinicaTabs/AddClinicaTab2';

import AddClinicaTab3 from './AddClinicaTabs/AddClinicaTab3';
import AddClinicaTab4 from './AddClinicaTabs/AddClinicaTab4';

export default function CheckoutStepper() {
    const [step, setStep] = React.useState(0);

    const onChange = (nextStep: number) => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const [screenSize] = useState({
        width: window.innerWidth
    })

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    return (
        <div className='2xl:pt-9 pt-5' >

            <Steps current={step} className='px-10'>
                <Steps.Item title={`${screenSize.width > 768 ? "Umumiy ma'lumotlar" : ""} `} />
                <Steps.Item title={`${screenSize.width > 768 ? "Profile" : ""} `} />
                <Steps.Item title={`${screenSize.width > 768 ? "Ish vaqti" : ""} `} />
                <Steps.Item title={`${screenSize.width > 768 ? "Account" : ""} `} />
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



// ___--------------------------------------------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import { Button, message, Steps, theme } from 'antd';
// import AddClinicaTab1 from './AddClinicaTabs/AddClinicaTab1';

// const steps = [
//     {
//         title: 'First',
//         content: <AddClinicaTab1 />,
//     },
//     {
//         title: 'Second',
//         content: 'Second-content',
//     },
//     {
//         title: 'Last',
//         content: 'Last-content',
//     },
//     {
//         title: 'Last',
//         content: 'Last-content',
//     },
// ];

// export default function CheckoutStepper() {
//     const { token } = theme.useToken();
//     const [current, setCurrent] = useState(0);

//     const next = () => {
//         setCurrent(current + 1);
//     };

//     const prev = () => {
//         setCurrent(current - 1);
//     };

//     const items = steps.map((item) => ({ key: item.title, title: item.title }));

//     const contentStyle: React.CSSProperties = {
//         lineHeight: '260px',
//         textAlign: 'center',
//         color: token.colorTextTertiary,
//         backgroundColor: token.colorFillAlter,
//         borderRadius: token.borderRadiusLG,
//         border: `1px dashed ${token.colorBorder}`,
//         marginTop: 16,
//     };

//     return (
//         <div className='mx-auto max-w-[97%] pt-7'>
//             <Steps current={current} items={items} className='' />
//             <div style={contentStyle}>{steps[current].content}</div>
//             <div style={{ marginTop: 24 }}>

//                 {current > 0 && (
//                     <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
//                         Previous
//                     </Button>
//                 )}
//                 {current < steps.length - 1 && (
//                     <Button type="primary" onClick={() => next()}>
//                         Next
//                     </Button>
//                 )}

//                 {current === steps.length - 1 && (
//                     <Button type="primary" onClick={() => message.success('Processing complete!')}>
//                         Done
//                     </Button>
//                 )}

//             </div>
//         </div>
//     );
// }



// -----------------------------------------------------------------------------------------------------------------



