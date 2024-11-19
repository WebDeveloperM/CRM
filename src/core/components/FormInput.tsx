import { InputHTMLAttributes, ReactNode } from "react"
import { useFormContext } from "react-hook-form"
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
    ...rest

}: Props) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className={className}>
            <label className={clsx(labelClassName)}>
                <span className="text-base label-text">{label}</span>
            </label>

            <input
                {...register(name, { required: required, value })}
                aria-invalid={errors[name] ? "true" : "false"}
                {...rest}
                className={clsx(
                    "w-full input input-bordered flex items-center gap-2  input-sm mt-1 bg-white hover:border-secondary cursor-pointer placeholder:text-gray-500 focus:ring-1 focus:ring-secondary focus:outline-none",
                    inputClassName
                )}
            />

            {/* {errors[name] && <p className={clsx("text-red-500  mb-2", errorClassName)}>{errorText}</p>} */}
        </div>
    )
}

export default FormInput
