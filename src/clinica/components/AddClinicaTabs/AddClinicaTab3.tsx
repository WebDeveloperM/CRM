import { useClinica } from "@clinica/context/ClinicaContext";
import YandexMap2 from "../YandexMap2";
import { useClinicRegister } from "@clinica/hooks/addClinic";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { ClinicaFormData } from "@clinica/types";

type Props = {
  onPrevious: (status: boolean) => void
  onNext: (status: boolean) => void
}

export default function AddClinicaTab3({ onPrevious, onNext }: Props) {
  const { data } = useClinica();
  const { mutateAsync, isLoading } = useClinicRegister()
  const methods = useForm<ClinicaFormData>({ mode: "onBlur" })

  async function onSubmit() {
    if (isLoading) return

    const response = await mutateAsync(data)
    console.log(response);

    const result = confirm("Barcha ma`lumotlarni tasdiqlaysizmi?")

    if (!result) {
      toast.warning("Ma`lumotlarni tasdiqlang")
      return
    }

    if (response.success && response.message == "Clinic registered successfully.") {
      toast.success("Ma'lumotlar qabul qilindi")
      localStorage.setItem("clinicId", response.data[0].clinicId)
      onNext(true)
      return
    }


  }


  return (
    <div className="overflow-x-auto bg-white rounded-md text-gray-700 z-[-1] h-full pb-5 overflow-y-scroll  ">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} action="" className="mb-7">

          <YandexMap2 />
          <br />
          <div className="flex gap-2 justify-between">
            <button
              onClick={() => onPrevious(true)}
              className="w-24 p-1.5 my-2 mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
            >
              Oldingi
            </button>
            <button
              type="submit"
              className="w-24 p-1.5 my-2 mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
            >
              Keyingi
            </button>
          </div>

        </form>
      </FormProvider>

    </div>
  )
}

// onClick={() => onNext(true)}