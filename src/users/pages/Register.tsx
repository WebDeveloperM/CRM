import logo from "@core/static/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import { SignUpSuperUser } from "@users/types.ts"
import { FormProvider, useForm } from "react-hook-form"
import FormInput from "@core/components/FormInput.tsx"
import { useSuperUserCreate } from "@users/hooks/superUser.ts"
import { useMask } from "@react-input/mask"
import queryString from "query-string"
import { errorToast } from "@core/components/Toastfy"
import { toast, ToastContainer } from "react-toastify"
import MathCaptcha from "@core/components/Captcha"
import { SetStateAction, useState } from "react"
import { FaRegCircleQuestion } from "react-icons/fa6";
import jshshr from "../static/jshshr.png"

export default function Register() {
    const navigate = useNavigate()
    const { mutateAsync, isLoading, error } = useSuperUserCreate()
    const [isVerified, setIsVerified] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [check, setCheck] = useState<SetStateAction<boolean>>(false);

    const handleCaptchaVerify = (status: boolean) => {
        setIsVerified(status);
    };
    const methods = useForm<SignUpSuperUser>()
    const inputRef = useMask({ mask: "______________", replacement: { _: /\d/ } })
    const inputPasportRef = useMask({
        mask: "__ | _______",
        replacement: { _: /[A-Za-z]/, _: /\d/ },
        onMask: (mask) => (mask.target.value = mask.target.value.toUpperCase()),
    })

    const { ref: formInputRefP, ...rest } = methods.register("personalNumber")
    const { ref: formInputRefPNumber, ...restPerNum } = methods.register("pasportSerNum")

    async function onSubmit(data: SignUpSuperUser) {
        if (isLoading) return
        if (error) {
            errorToast(error.message)
            return
        }

        if (data.personalNumber.toString().length!=14) {
            toast.warning("JSHSHR kiritishda xatolik bor")
            return
        }
        const pasportSerNum = data.pasportSerNum.replace(/ /gi, "").replace("|", "")
        if (pasportSerNum.toString().length!=9) {
            toast.warning("Pasport ma'lumotlari kiritishda xatolik bor")
            return
        }
        
        data = { ...data, pasportSerNum }


        if (!check) {
            toast.warning("Shartlarga rozilik bildiring")
            return
        }

        if (!isVerified) {
            toast.warning("Robot emasligizni tasdiqlang")
            return
        }
        const response = await mutateAsync(data)

        // successToast("Ma'lumotlaringiz yuborildi")
        if (response.success) {
            toast.success("Ma'lumotlaringiz qabul qilindi")
            setTimeout(() => {
                navigate("/add-username/?" + queryString.stringify(response.data as object))
            }, 3000)
        }
        else if (response.message == "Personal number or passport serial number already exists.") {
            toast.error("Bunday foydalanuvchi mavjud!")
            return
        }

    }





    return (
        <div className="bg-[url('/src/users/static/login-bg.svg')] sm:h-screen min-h-[800px] sm:min-h-0 w-full bg-cover sm:bg-bottom relative  sm:py-0">
            <div
                className="border-[0.7px] border-secondary rounded-lg bg-white sm:bg-white/70 pt-[1%]
                            max-w-[90%] min-w-[85%] mx-auto sm:max-w-[50%] sm:min-w-[40%] md:max-w-[35%] md:min-w-[25%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:left-[70%] xl:left-[75%] xl:max-w-[25%] xl:min-w-[20%] "
            >
                <div>
                    <img src={logo} alt="logo" className="w-[20%] xl:w-1/5 2xl:w-1/4 mx-auto mt-5 sm:mt-0" />
                    <div className="px-7 ">
                        <h5 className="text-xl font-medium text-gray-700 py-1 whitespace-normal tracking-wider text-center">
                            Ro'yhatdan o'tish
                        </h5>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} action="" className="mb-3">
                                <div className="w-full">
                                    <FormInput
                                        label={
                                            <label htmlFor="firstName" className="text-gray-700">
                                                Ism
                                                <span className="text-red-500">*</span>
                                            </label>
                                        }
                                        className="mt-1"
                                        name="firstName"
                                        placeholder="Ism kiriting"
                                    />
                                </div>

                                <div className="w-full">
                                    <FormInput
                                        label={
                                            <label htmlFor="firstName" className="text-gray-700">
                                                Familiya
                                                <span className="text-red-500">*</span>
                                            </label>
                                        }
                                        className="mt-1"
                                        name="lastName"
                                        placeholder="Familiya kiriting"
                                    />
                                </div>

                                <div className="w-full">
                                    <FormInput
                                        label={
                                            <label htmlFor="firstName" className="text-gray-700">
                                                Klinika
                                                <span className="text-red-500">*</span>
                                            </label>
                                        }
                                        name="clinicName"
                                        placeholder="Klinika nomi kiriting"
                                        className="mt-1"
                                    />
                                </div>

                                <div className="w-full mt-1 ">
                                    <span className="">JSHSHR</span>
                                    <span className="text-red-500">*</span>

                                    {/* <input
                                        {...rest}
                                        ref={(e) => {
                                            formInputRefP(e)
                                            inputRef.current = e
                                        }}
                                        type="text"
                                        name="personalNumber"
                                        placeholder="00000000000000"
                                        autoFocus
                                        className="w-full input input-bordered mt-1 flex items-center gap-2 input-sm  bg-white hover:border-secondary cursor-pointer placeholder:text-gray-500 focus:ring-2 focus:ring-secondary focus:outline-none"
                                    /> */}

                                    <div className="flex mt-1">
                                        <input
                                            type="text"
                                            {...rest}
                                            ref={(e) => {
                                                formInputRefP(e)
                                                inputRef.current = e
                                            }}

                                            name="personalNumber"
                                            placeholder="00000000000000"
                                            id="website-admin" className="rounded-none rounded-l-lg focus:ring-1 mr-[0.5px] focus:ring-secondary focus:outline-none bg-white border text-gray-900  block flex-1 min-w-0 w-full text-sm border-gray-300 px-2.5 py-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 0" />


                                        <span onClick={() => setShowModal(true)} className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-0 border-gray-300 border-l-0 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                            <FaRegCircleQuestion className="cursor-pointer hover:font-bold text-secondary hover:scale-110 duration-200 text-xl" />
                                        </span>

                                    </div>

                                </div>
                                <div className="w-full mt-1">
                                    <span className="">Passport seria va raqami</span>
                                    <span className="text-red-500">*</span>


                                    <input
                                        {...restPerNum}
                                        ref={(e) => {
                                            formInputRefPNumber(e)
                                            inputPasportRef.current = e
                                        }}
                                        type="text"
                                        name="pasportSerNum"
                                        placeholder="AB | 1234567"
                                        autoFocus
                                        className="w-full input input-bordered mt-1 flex items-center gap-2 input-sm  bg-white hover:border-secondary cursor-pointer placeholder:text-gray-500 focus:ring-2 focus:ring-secondary focus:outline-none"
                                    />
                                </div>
                                <div className="flex items-center my-2">
                                    <input id="link-radio" type="radio" onChange={(e) => setCheck(e.target.checked)} className="w-4 h-4 text-secondary bg-gray-100 border-gray-300 " />
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> <a target="_blank" href="https://lex.uz/docs/-4396419" className="text-secondary hover:underline">Qonun talablari </a> doirasida shaxsga doir maʼlumotlarimdan foydalanishga va ishlov berishga rozilik bildiraman.</label>
                                </div>


                                <div>

                                    {isVerified ? (
                                        <p></p>
                                    ) : (
                                        <MathCaptcha onVerify={handleCaptchaVerify} />
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full p-1.5 my-2 mt-3 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
                                    disabled={isLoading}
                                >
                                    Ro'yhatdan o'tish
                                </button>

                                <Link to="/" className="w-full text-center text-gray-700 mt-1 rounded-md text-sm ">
                                    Hisobingiz mavjudmi? Kirish
                                </Link>
                            </form>
                        </FormProvider>
                        <ToastContainer />

                    </div>
                </div>
            </div>
            <dialog id="my_modal_2" className={`modal  ${showModal ? "modal-open" : ""} `}>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 mb-3" onClick={() => setShowModal(false)} >✕</button>
                    </form>
                    <img src={jshshr} alt="" className="mt-6" />
                </div>
            </dialog>
        </div>
    )
}
