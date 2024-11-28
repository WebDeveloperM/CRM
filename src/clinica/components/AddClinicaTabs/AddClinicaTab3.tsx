
import { FormProvider, useForm } from "react-hook-form";
import { CreateClinica } from "src/clinica/types";
import GoogleMapComponent from "../GoogleMapComponent";

type Props = {
  onPrevious: (status: boolean) => void
  onNext: (status: boolean) => void
}

export default function AddClinicaTab3({ onPrevious, onNext }: Props) {
  const methods = useForm<CreateClinica>({ mode: "onBlur" })

  async function onSubmit() {

  }


  return (
    <div className="overflow-x-auto bg-white rounded-md text-gray-700 z-[-1] h-full pb-5 overflow-y-scroll  mt-6 ">
      <FormProvider {...methods}>

        <form onSubmit={methods.handleSubmit(onSubmit)} action="" className="mb-7">
          <GoogleMapComponent />


          <div className="flex gap-2 justify-between">
            <button
              onClick={() => onPrevious(true)}
              type="submit"
              className="w-24 p-1.5 my-2 mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
            >
              Oldingi
            </button>
            <button
              onClick={() => onNext(true)}
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
