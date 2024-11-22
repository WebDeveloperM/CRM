import FormInput from "@core/components/FormInput"
import logo from "@core/static/logo.svg"
import { useAddSuperUserResgiter, useCheckUserUrl } from "@users/hooks/superUser"
import { SignUpSuperUserAddRegister } from "@users/types"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useQueryParams } from "@core/hooks/queryString.ts"
import { errorToast, successToast } from "@core/components/Toastfy"
import { toast } from "react-toastify"
import { useState } from "react"

export default function ComplateRegistrations() {
    const navigate = useNavigate()
    const params = useQueryParams()
    const [showPass, setShowPass] = useState(false)
    const [password, setPasword] = useState("")

    const [showPassConfirm, setShowPassConfirm] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")

    const { isLoading: checkLoading } = useCheckUserUrl(params.uniqueUrl as string)

    const { mutateAsync, isLoading: registerLoading, isError } = useAddSuperUserResgiter()
    const isLoading = registerLoading || checkLoading

    const methods = useForm<SignUpSuperUserAddRegister>()
    // const { ref: formInputRefPassword, ...restPassword } = methods.register("password")

    setTimeout(() => {
        setShowPass(false)
    }, 5000)
    setTimeout(() => {
        setShowPassConfirm(false)
    }, 5000)

    async function onSubmit(data: SignUpSuperUserAddRegister) {

        if (password != confirmPassword) {
            errorToast("Tasdiqlash parol mos kelmadi")
            return
        }

        if (isLoading) return

        data = { token: params.uniqueToken as string, password: password, confirmPassword: confirmPassword, ...data }

        const response = await mutateAsync(data)

        if (!response.success && response.message == "Username already exists. Please choose a different username.") {
            toast.warning("Bunday login mavjud")
            return
        }

        if (!response.success) {
            toast.warning("Parol juda sodda. (A-aZ-z/1-9/-+!@#$%^) belgilar bo'lishi majburiy")
            return
        }

        if (!isError && response.success) {
            successToast("Muvaffaqqiyatli ro`yhatdan o'tdingiz")
        }

        setTimeout(() => {
            navigate("/")
        }, 3000)
    }

    return (
        <div className="bg-[url('/src/users/static/login-bg.svg')] h-screen w-full bg-cover sm:bg-bottom relative">
            <div
                className="border-[0.7px] border-secondary rounded-lg p-2 bg-white sm:bg-white/70 pt-[2%]
                            max-w-[90%] min-w-[85%] mx-auto sm:max-w-[50%] sm:min-w-[40%] md:max-w-[35%] md:min-w-[25%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:left-[70%] xl:left-[75%] xl:max-w-[25%] xl:min-w-[20%]"
            >
                <div className="">
                    <img src={logo} alt="logo" className="w-1/4 mx-auto mt-5 sm:mt-0" />
                    <div className="px-2 lg:px-3 xl:px-4">
                        <h5 className="text-xl font-medium text-gray-700 py-3 whitespace-normal tracking-wider text-center">
                            Login va parol yaratish
                        </h5>
                        <FormProvider {...methods}>
                            <form action="" className="mb-7" onSubmit={methods.handleSubmit(onSubmit)}>
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
                                        placeholder="Login yarating"
                                    />
                                </div>


                                <FormInput
                                    label={
                                        <label htmlFor="firstName" className="text-gray-700">
                                            JSHSHR
                                            <span className="text-red-500">*</span>
                                        </label>
                                    }
                                    errorText="JSH SHR kiritish majburiy"
                                    name="personalNumber"
                                    placeholder="00000000000000"
                                    className="mt-0.5"
                                    isIcon={true}
                                    iconRight={true}

                                    iconValue={
                                        <>
                                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 ml-[1px] border-gray-300 border-s-0 rounded-e-md">
                                                <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z" clipRule="evenodd" />
                                                </svg>

                                            </span>

                                        </>
                                    }

                                />

                                {/* <div className="mt-1">
                                    <span>Parol</span><span className="text-red-500">*</span>
                                    <div className="flex">
                                        <input
                                            type={showPass ? "text" : "password"}
                                            onChange={(e) => setPasword(e.target.value)}
                                            name="password"
                                            value={password}
                                            placeholder="Parol kiriting"
                                            id="website-admin" className="rounded-none placeholder:text-gray-500 rounded-l-lg focus:ring-1 mr-[0.5px] focus:ring-secondary focus:outline-none bg-white border text-gray-900  block flex-1 min-w-0 w-full text-sm border-gray-300 px-2.5 py-[4.5px] " />

                                        <span className="inline-flex cursor-pointer text-secondary items-center px-3 text-sm  bg-gray-200 border rounded-l-0 border-gray-300 border-l-0 rounded-r-md">
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

                                <div className="mt-1">
                                    <span>Parolni takrorlang</span><span className="text-red-500">*</span>
                                    <div className="flex">
                                        <input
                                            type={showPassConfirm ? "text" : "password"}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            placeholder="Parolni takrorlang"
                                            id="website-admin" className="rounded-none placeholder:text-gray-500 rounded-l-lg focus:ring-1 mr-[0.5px] focus:ring-secondary focus:outline-none bg-white border text-gray-900  block flex-1 min-w-0 w-full text-sm border-gray-300 px-2.5 py-[4.5px]" />

                                        <span className="inline-flex cursor-pointer text-secondary items-center px-3 text-sm  bg-gray-200 border rounded-l-0 border-gray-300 border-l-0 rounded-r-md ">
                                            <svg
                                                onClick={() => {
                                                    setShowPassConfirm(!showPass)
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


                                </div> */}

                                {/*


                                <div className="flex justify-end text-sm text-gray-500 underline mt-2 hover:text-secondary duration-200 cursor-pointer">
                                    Parolni unutdingizmi?
                                </div>

                                <button
                                    type="submit"
                                    className="w-full p-1.5 my-2 mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
                                >
                                    Kirish
                                </button>

                                {/* <button className="w-full p-1.5 bg-neutral text-gray-700 rounded-md text-sm hover:bg-neutral/80 duration-200">
                                    Hisobingiz yo'qmi? <Link to="/register" className="px-1">Ro'yhatdan o'tish</Link>
                                </button> */}
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}
