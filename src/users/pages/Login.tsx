import logo from "@core/static/logo.svg"
import { useAccountLogin } from "@users/hooks/superUser"
import { AccountLogin } from "@users/types"
import { login } from "@users/utils/auth"
import FormInput from "@core/components/FormInput"
import { FormProvider, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import MathCaptcha from "@core/components/Captcha"
import { useState } from "react"

export default function Login() {
    const methods = useForm<AccountLogin>()
    const navigate = useNavigate()
    const { mutateAsync, isLoading } = useAccountLogin()
    const [isVerified, setIsVerified] = useState(false);
    const [showPass, setShowPass] = useState(false)
    const [password, setPasword] = useState("")

    setTimeout(() => { setShowPass(false) }, 5000)

    const handleCaptchaVerify = (status: boolean) => {
        setIsVerified(status);
    };
    async function onSubmit(data: AccountLogin) {

        if (isLoading) return

        if (!isVerified) {
            toast.warning("Robot emasligizni tasdiqlang")
            return
        }
        data = { ...data, password }

        const response = await mutateAsync(data)

        console.log(response);


        if (response.success) {
            toast.success("Ma'lumotlaringiz yuborildi")
            login(response)
            setTimeout(() => {
                navigate("/dashboard")
            }, 3000)
        }
        else if (!response.success && response.message == "Invalid username or password.") {
            toast.error("Login yoki parol noto'g'ri")
            return
        }
    }

    return (
        <div className="bg-[url('/src/users/static/login-bg.svg')] h-screen w-full bg-cover sm:bg-bottom relative">

            <div className="border-[0.7px] border-secondary rounded-lg p-2 bg-white sm:bg-white/70 pt-[2%] 
                            max-w-[90%] min-w-[85%] mx-auto sm:max-w-[50%] sm:min-w-[40%] md:max-w-[35%] md:min-w-[25%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:left-[70%] xl:left-[75%] xl:max-w-[25%] xl:min-w-[20%]">
                <div className="">
                    <img src={logo} alt="logo" className="w-1/4 mx-auto mt-5 sm:mt-0" />
                    <div className="px-2 lg:px-3 xl:px-4">

                        <h5 className="text-xl font-medium text-gray-700 py-3 whitespace-normal tracking-wider text-center">Kirish</h5>
                        <FormProvider {...methods}>

                            <form onSubmit={methods.handleSubmit(onSubmit)} action="" className="mb-7">
                                <div className="w-full">
                                    <FormInput
                                        label={
                                            <label htmlFor="firstName" className="text-gray-700">
                                                Login
                                                <span className="text-red-500">*</span>
                                            </label>
                                        }
                                        className="mt-1"
                                        name="username"
                                        placeholder="Login kiriting"
                                    />
                                </div>

                                <div className="mt-1">
                                    <span>Parol</span><span className="text-red-500">*</span>
                                    <div className="flex">
                                        <input
                                            type={showPass ? "text" : "password"}
                                            onChange={(e) => setPasword(e.target.value)}
                                            name="password"
                                            value={password}
                                            placeholder="Parol kiriting"
                                            id="website-admin" className="rounded-none placeholder:text-gray-500 rounded-l-lg focus:ring-1 mr-[0.5px] focus:ring-secondary focus:outline-none bg-white border text-gray-900  block flex-1 min-w-0 w-full text-sm border-gray-300 px-2.5 py-[4.5px]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 0" />

                                        <span className="inline-flex cursor-pointer text-secondary items-center px-3 text-sm  bg-gray-200 border rounded-l-0 border-gray-300 border-l-0 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                            <svg
                                                onClick={() => {
                                                    setShowPass(!showPass)
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4 opacity-70 hover:text-secondary">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </div>


                                </div>


                                <div className="flex justify-end text-sm text-gray-500 underline mt-2 hover:text-secondary duration-200 cursor-pointer">
                                    Parolni unutdingizmi?
                                </div>

                                <div className="mt-2">

                                    {isVerified ? (
                                        <p></p>
                                    ) : (
                                        <MathCaptcha onVerify={handleCaptchaVerify} />
                                    )}
                                </div>

                                <button type="submit" className="w-full p-1.5 my-2 mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200">
                                    Kirish
                                </button>

                                <Link to="/register">
                                    <p className="w-full text-center  p-1.5 bg-neutral text-gray-700 rounded-md text-sm hover:bg-neutral/80 duration-200">
                                        Hisobingiz yo'qmi? Ro'yhatdan o'tish
                                    </p>
                                </Link>

                            </form>

                        </FormProvider>

                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}


// focus:border-secondary focus:ring-2 focus:ring-secondary focus:shadow-secondary/40