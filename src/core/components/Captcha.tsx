import { useState } from "react";
import { useMask } from "@react-input/mask";
const MathCaptcha = (setOnVerify: any, submitHandleVerify: boolean) => {
    const [num1, setNum1] = useState(generateRandomNumber());
    const [num2, setNum2] = useState(generateRandomNumber());
    const [userInput, setUserInput] = useState("");
    const [error, setError] = useState("");
    const inputRef = useMask({ mask: "____", replacement: { _: /\d/ } })

    // Tasodifiy son yaratish funksiyasi
    function generateRandomNumber() {
        return Math.floor(Math.random() * 10) + 1; // 1 dan 10 gacha
    }

    const handleChange = (e: any) => {
        setUserInput(e.target.value);
    };


    const handleVerify = () => {
        const correctAnswer = num1 + num2;
        if (parseInt(userInput, 10) === correctAnswer) {
            setError("")
            setOnVerify(true)
        } else {
            setError("Natija noto‘g‘ri. Iltimos, qayta urinib ko'ring.");
            setOnVerify(false);
        }
    };
    submitHandleVerify ? handleVerify() : null

    return (
        <div>
            <div className="flex items-center gap-2 col-span-8 max-h-8">
                <p
                    onClick={() => {
                        setNum1(generateRandomNumber())
                        setNum2(generateRandomNumber())
                    }}
                    className=" 2xl:text-lg cursor-pointer">
                    {num1} + {num2} =
                </p>

                <input
                    type="text"
                    value={userInput}
                    onChange={handleChange}
                    placeholder="Javobni kiriting"
                    className="xl:placeholder:pl-0.5 placeholder:text-sm py-1 2xl:pl-2 pl-0.5 my-1 text-xs lg:text-base border 
                    max-w-[65%] md:max-w-[65%] lg:max-w-[%] 2xl:max-w-[60%] sm:max-w-full 
                    
                    "
                    ref={(e) => {
                        inputRef.current = e
                    }}
                />
            </div>
            {/* <button className="bg-secondary-light col-span-4 my-1 px-2" onClick={handleVerify}>Tasdiqlash</button> */}

            {error &&

                <p style={{ color: "red" }} className="text-sm mt-1.5">{error}</p>
            }
        </div>
    );
};

export default MathCaptcha;
