import { InputHTMLAttributes, ReactNode } from "react"
import { RefCallBack, useFormContext } from "react-hook-form"
import { clsx } from "clsx"

type Props = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label: string | ReactNode
    value?: string
    errorText?: string
    required?: boolean
    className?: string
    labelClassName?: string
    inputClassName?: string
    errorClassName?: string
    isIcon?: boolean
    iconRight?: boolean
    iconLeft?: boolean
    iconValue?: ReactNode
    inputRef?: React.MutableRefObject<HTMLInputElement | null>
    formInputRef?: RefCallBack
}

const FormInput = ({
    name,
    label,
    value,
    errorText = "Bu majburiy maydon",
    required = true,
    className,
    labelClassName,
    inputClassName,
    errorClassName,
    isIcon = false,
    iconLeft = false,
    iconRight = false,
    iconValue,
    inputRef,
    formInputRef,
    ...rest

}: Props) => {
    const { register, formState: { errors } } = useFormContext();



    return (
        // <div className={className}>
        //     <label className={clsx(labelClassName)}>
        //         <span className="text-base label-text">{label}</span>
        //     </label>

        //     <input
        //         {...register(name, { required: required, value })}
        //         aria-invalid={errors[name] ? "true" : "false"}
        //         {...rest}
        //         className={clsx(
        //             "w-full input input-bordered flex items-center gap-2  input-sm mt-1 bg-white hover:border-secondary cursor-pointer placeholder:text-gray-500 focus:ring-1 focus:ring-secondary focus:outline-none",
        //             inputClassName
        //         )}
        //     />

        //     {errors[name] && <p className={clsx("text-red-500  mb-1 text-sm", errorClassName)}>{errorText}</p>}
        // </div>


        <>
            <label className={clsx(labelClassName, "block  text-sm font-medium text-gray-900 dark:text-white mt-1")}>
                {label}
            </label>
            <div className={clsx(
                "flex ",
                className
            )}>

                {isIcon && iconLeft ? iconValue : null}


                {inputRef && formInputRef ?
                    <input
                        {...register(name, { required: required, value })}
                        aria-invalid={errors[name] ? "true" : "false"}
                        {...rest}
                        ref={(e) => {
                            formInputRef ? formInputRef(e) : ""
                            inputRef ? inputRef.current = e : ""

                        }}
                        className={`
                     "rounded-none 
                     ${!isIcon ? "rounded-lg" : ""}
                     ${isIcon && iconRight ? "rounded-l-lg" : ""}
                     ${isIcon && iconLeft ? "rounded-r-lg" : ""}
                     
                     
                     bg-gray-50 border text-gray-900  flex-1 min-w-0 w-full text-sm focus:ring-1 focus:ring-secondary focus:outline-none border-gray-300 p-1.5`}
                    /> : <input
                        {...register(name, { required: required, value })}
                        aria-invalid={errors[name] ? "true" : "false"}
                        {...rest}

                        className={`
                        "rounded-none 
                        ${!isIcon ? "rounded-lg" : ""}
                        ${isIcon && iconRight ? "rounded-l-lg" : ""}
                        ${isIcon && iconLeft ? "rounded-r-lg" : ""}
                        
                        
                        bg-gray-50 border text-gray-900  flex-1 min-w-0 w-full text-sm focus:ring-1 focus:ring-secondary focus:outline-none border-gray-300 p-1.5`}
                    />
                }


                {isIcon && iconRight ? iconValue : null}


            </div>
            {errors[name] && <p className={clsx("text-red-500 block mb-1 text-sm", errorClassName)}>{errorText}</p>}
        </>

    )
}

export default FormInput
// < label label  for= "website-admin" className = "block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Username</ >
//     <div className="flex">
//         <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
//             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
//             </svg>
//         </span>
//         <input type="text" id="website-admin"
//             className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="elonmusk">
//     </div>