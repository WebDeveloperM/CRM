import { SetStateAction, useState } from "react";
import AddClinicaTab1 from "./AddClinicaTabs/AddClinicaTab1";

export default function CheckoutStepper() {
    const [step1, setStep1] = useState<boolean>(false)
    const [step2, setStep2] = useState<boolean>(false)
    const [step3, setStep3] = useState<boolean>(false)
    const [step4, setStep4] = useState<boolean>(false)


    console.log(setStep1, "22222222222222222222");

    const handlerStep1 = (status) => {
        setStep1(status)
    }
    return (
        <div className="z-50 mt-3">
            <ul className="steps w-full my-2 -z-10">
                <li className={`step step-secondary `}>Umumiy ma'lumotlar</li>
                <li className={`step  `}>Profile</li>
                <li className={`step  `}>Ish vaqti</li>
                <li className={`step `}>Account</li>
            </ul>


            <AddClinicaTab1 step1={step1} stepHandler={handlerStep1} />


        </div>
    )
}
