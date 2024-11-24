import FormInput from "@core/components/FormInput";
import Select, { Option } from "@core/components/Select";
import { FormProvider, useForm } from "react-hook-form";
import { CreateClinica } from "src/clinica/types";


export default function AddClinicaTab1() {
  const methods = useForm<CreateClinica>({ mode: "onBlur" })


  async function onSubmit(data: CreateClinica) {

  }

  return (
    <div className="overflow-x-auto bg-white rounded-md text-gray-700 z-[-1] h-full pb-5 overflow-y-scroll 2xl:m-5 m-3 ">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} action="" className="mb-7">
          <div className="grid grid-cols-12 gap-3 px-0.5">
            <div className="col-span-3">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Nomi
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="username"
                placeholder={"Nomini kiriting"}
                errorText={""}
              />
            </div>
            <div className="col-span-3">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Manzili
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="username"
                placeholder={"Manzil kiriting"}
                errorText={""}
              />
            </div>
            <div className="col-span-3">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Telefon nomer
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="username"
                placeholder={"Telefon raqam kiriting"}
                errorText={""}
              />
            </div>
            <div className="col-span-3">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Elektrom pochta
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="username"
                placeholder={"Elektron manzil kiriting"}
                errorText={""}
              />
            </div>
            <div className="col-span-3">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Website nomi
                  </label>
                }
                className="mt-1"
                name="username"
                placeholder={"Web sahifa kiriting"}
                errorText={""}
              />
            </div>
            <div className="col-span-3">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    INN
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="username"
                placeholder={"INN raqam kiriting"}
                errorText={""}
              />
            </div>
            <div className="col-span-3">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    OGRN
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="username"
                placeholder={"Ro'yxatdan o'tgan raqami"}
                errorText={""}
              />
            </div>
            <div className="col-span-3 px-0.5 mt-1">
              <Select
                className="bg-white focus:ring-1  focus:outline-none focus:ring-secondary select-sm mt-1" labelText="Turi"
                requiredLabel={true}>
                <Option className="" disabled selected>Turini tanlang </Option>
                <Option className="">Xususiy</Option>
                <Option className=""> Davlat tashkiloti</Option>
                <Option className="">Ixtisoslashtirilgan</Option>
              </Select>



            </div>


          </div>




          <button
            type="submit"
            className="w-full p-1.5 my-2 mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
          >
            Qo'shish
          </button>

        </form>
      </FormProvider>
    </div>
  )
}
