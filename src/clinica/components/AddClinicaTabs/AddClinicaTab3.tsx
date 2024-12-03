import { useClinica } from "@clinica/context/ClinicaContext";
import YandexMap2 from "../YandexMap2";
import { useClinicRegister } from "@clinica/hooks/addClinic";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { ClinicaFormData } from "@clinica/types";
import { useNavigate } from "react-router-dom";
// import { useState } from 'react';
// import { TiWarningOutline } from "react-icons/ti";

type Props = {
  onPrevious: (status: boolean) => void
  onNext: (status: boolean) => void
}

export default function AddClinicaTab3({ onPrevious, onNext }: Props) {
  const { data } = useClinica();
  const { mutateAsync, isLoading } = useClinicRegister()
  const methods = useForm<ClinicaFormData>({ mode: "onBlur" })
  const navigate = useNavigate()
 

  async function onSubmit() {
    if (isLoading) return
    if (!data.legalAddress) {
      toast.warning("Manzil kiritish majburiy")
      return
    }

    const result = confirm("Ma'lumotlarni tasdiqlaysizmi?")

    if (!result) {
      toast.warning("Ma'lumotlar tasdiqlanmagan")
      return
    }

    const response = await mutateAsync(data)
    if (!response.success && response.message == "A clinic with the same name already exists.") {
      toast.warning("Bunday shifoxona nomi mavjud")
      return
    }
    if (!response.success && response.message == "A clinic with the same taxpayer ID already exists.") {
      toast.warning("Sizning shifoxonangiz mavjud")
      return
    }
    if (!response.success && response.message == "This admin already has a clinic registered.") {
      toast.warning("Sizning shifoxonangiz mavjud")
      return
    }
    if (!response.success && response.message == "Invalid UniqueToken. Admin not found.") {
      toast.error("Tizimga kirishda nosozlik aniqlandi.")
      navigate("/")
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
              Tasdiqlash
            </button>
          </div>
        </form>
      </FormProvider>
      {/* <dialog id="my_modal_2" className={`modal  ${showModal ? "modal-open" : ""} `}>
        <div className="modal-box bg-white">
          <div>
            <div className="relative text-center bg-white rounded-lg ">
              <button onClick={() => setShowModal(false)} type="button" className="text-gray-400 absolute top-2 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="flex justify-center mb-3">
                <TiWarningOutline className="text-5xl " />
              </div>
              <p className="mb-4 text-gray-500 text-xl">Kiritilgan ma'lumotlarni tasdiqlaysizmi?</p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  hover:text-gray-900 focus:z-10">
                  Bekor qilish
                </button>
                <button
                  onClick={() => setConfirm(true)}
                  type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-secondary rounded-lg hover:bg-secondary/80 duration-200">
                  Tasdiqlayman
                </button>
              </div>
            </div>
          </div>


        </div>
      </dialog> */}
    </div>
  )
}

// onClick={() => onNext(true)}