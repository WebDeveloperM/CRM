import FormInput from "@core/components/FormInput"
import { useAddSuperUserResgiter, useCheckUserUrl } from "@users/hooks/superUser"
import { SignUpSuperUserAddRegister } from "@users/types"
import { FormProvider, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useQueryParams } from "@core/hooks/queryString.ts"
import { successToast } from "@core/components/Toastfy"
import { toast } from "react-toastify"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import clsx from "clsx"
import MathCaptcha from "@core/components/Captcha"

let passwordTimeOutId: ReturnType<typeof setTimeout>
let confirmPasswordTimeOutId: ReturnType<typeof setTimeout>

export default function AddDoctorTab3() {
  const navigate = useNavigate()
  const params = useQueryParams()
  const [showPass, setShowPass] = useState(false)
  const [password, setPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorConfPassword, setErrorConfPassword] = useState("")
  const [showConfPass, setShowConfPass] = useState(false)
  const [confirmPassword, setconfirmPassword] = useState("")
  const [isVerified, setIsVerified] = useState(false)


  const { t } = useTranslation()


  const onBlurPassword = () => {
    if (password == "") {
      setErrorPassword(t("errorPassword"))
      return
    }
    else {
      setErrorPassword("")
    }
  }


  const onBlurConfPassword = () => {
    if (confirmPassword == "") {
      setErrorConfPassword(t("repeatConfPassword"))
      return
    } else {
      setErrorConfPassword("")
    }
  }

  const handleCaptchaVerify = (status: boolean) => {
    setIsVerified(status);

  };
  const handleShowPassword = () => {
    if (passwordTimeOutId) clearTimeout(passwordTimeOutId)
    if (showPass) return setShowPass(false)

    setShowPass(true)
    passwordTimeOutId = setTimeout(() => setShowPass(false), 5000)
  }

  const handleShowConfPassword = () => {
    if (confirmPasswordTimeOutId) clearTimeout(confirmPasswordTimeOutId)
    if (showConfPass) return setShowConfPass(false)

    setShowConfPass(true)
    confirmPasswordTimeOutId = setTimeout(() => setShowConfPass(false), 5000)
  }
  const { isLoading: checkLoading } = useCheckUserUrl(params.uniqueUrl as string)

  const { mutateAsync, isLoading: registerLoading, isError } = useAddSuperUserResgiter()
  const isLoading = registerLoading || checkLoading

  const methods = useForm<SignUpSuperUserAddRegister>({ mode: "onBlur" })
  const { ref: formInputRefPassword, ...restPassword } = methods.register("password")
  const { ref: formInputRefConfPassword, ...restConfPassword } = methods.register("confirmPassword")

  async function onSubmit(data: SignUpSuperUserAddRegister) {


    if (isLoading) return

    data = { token: params.uniqueToken as string, ...data, password, confirmPassword }

    if (password !== confirmPassword) {
      toast.warning(t("errorConfirmPassword"))
      return
    }
    if (!isVerified) {
      toast.warning(t("proveNotRobot"))
      return
    }
    const response = await mutateAsync(data)

    if (!response.success && response.message == "Username already exists. Please choose a different username.") {
      toast.warning(t("haveLoginError"))
      return
    }

    if (!response.success && response.message == "Passwords must be at least 6 characters.") {
      toast.warning(t("charactersPassword"))
      return
    }
    if (!response.success && response.message == "Password must contain both letters and digits.") {
      toast.warning(t("charactersDigitsPassword"))
      return
    }

    if (!isError && response.success) {
      successToast(t("registerSuccecfuly"))
    }

    navigate("/")
  }

  return (
    <div className=" pt-7">

      <FormProvider {...methods}>
        <form action="" className="mb-7" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className=" max-w-[30%]">
            <div className="w-full">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    {t("createLogin")}
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="username"
                placeholder={t("placeLogin")}
                errorText={t("errorLogin")}
              />
            </div>


            <div className="mt-2">
              <span className="text-sm font-medium text-gray-900 mt-1">{t("password")}</span>
              <span className="text-red-500">*</span>
              <div className="flex mt-1">
                <input
                  {...restPassword}
                  type={showPass ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  ref={(e) => {
                    formInputRefPassword(e)
                  }}
                  name="password"
                  value={password}
                  placeholder={t("placePassword")}
                  id="website-admin"
                  onBlur={onBlurPassword}
                  className="rounded-none  placeholder:text-gray-500 rounded-l-lg focus:ring-1 mr-[1px] focus:ring-secondary focus:outline-none border text-gray-900  block flex-1 min-w-0 w-full text-sm border-gray-300 px-2.5 py-[4.5px]"
                />

                <span onClick={handleShowPassword} className="inline-flex cursor-pointer text-secondary items-center px-3 text-sm bg-gray-200 border rounded-l-0 border-gray-300 border-l-0 rounded-r-md">
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70 hover:text-secondary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              {errorPassword && <p className={clsx("text-red-500 block mb-1 text-sm")}>{errorPassword}</p>}

            </div>


            <div className="mt-2">
              <span className="text-sm font-medium text-gray-900 mt-1">{t("repeatPassword")}</span>
              <span className="text-red-500">*</span>
              <div className="flex mt-1">
                <input
                  {...restConfPassword}
                  type={showConfPass ? "text" : "password"}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  ref={(e) => {
                    formInputRefConfPassword(e)
                  }}
                  name="confirmPassword"
                  onBlur={onBlurConfPassword}
                  value={confirmPassword}
                  placeholder={t("repeatPassword")}
                  id="website-admin"
                  className="rounded-none  placeholder:text-gray-500 rounded-l-lg focus:ring-1 mr-[1px] focus:ring-secondary focus:outline-none  border text-gray-900  block flex-1 min-w-0 w-full text-sm border-gray-300 px-2.5 py-[4.5px]"
                />

                <span onClick={handleShowConfPassword} className="inline-flex cursor-pointer text-secondary items-center px-3 text-sm bg-gray-200 border rounded-l-0 border-gray-300 border-l-0 rounded-r-md">
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70 hover:text-secondary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              {errorConfPassword && <p className={clsx("text-red-500 block mb-1 text-sm")}>{errorConfPassword}</p>}

            </div>

            <div className="my-5 max-w-[80%]">
              <MathCaptcha onVerify={handleCaptchaVerify} />
            </div>

          </div>

          <div className="flex gap-2 justify-end">

            <Link to={'/doctors'}>
              <button
                type="submit"
                className="w-24 p-1.5  mt-4 bg-white border hover:bg-secondary-light text-sm text-secondary rounded-md duration-200"
              >
                Bekor qilish
              </button>
            </Link>
            <button
              type="submit"
              className="w-24 p-1.5  mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
            >
              Qo'shish
            </button>
          </div>

        </form>
      </FormProvider>
    </div>

  )
}
