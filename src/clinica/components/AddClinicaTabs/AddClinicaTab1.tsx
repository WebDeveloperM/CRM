import FormInput from "@core/components/FormInput";
import Select, { Option } from "@core/components/Select";
import { FormProvider, useForm } from "react-hook-form";
import { CreateClinica } from "src/clinica/types";
import SelectedData from "../SelectedData";
import { DatePicker, Form, Space } from 'antd';
import { useState } from "react";


type Props = {
  onPrevious: (status: boolean) => void
  onNext: (status: boolean) => void
}


export default function AddClinicaTab1({ onPrevious, onNext }: Props) {
  const methods = useForm<CreateClinica>({ mode: "onBlur" })
  const [__, setSelectedDates] = useState<string[] | null>(null)
  const [_, setIsTouched] = useState(false);


  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    console.log(dates);
    setSelectedDates(dateStrings)
  };

  const handleBlur = () => {
    setIsTouched(true)
  };
  async function onSubmit() {

  }


  return (
    <div className="overflow-x-auto rounded-md text-gray-700  h-full pb-5 overflow-y-scroll 2xl:mt-6 ">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} action="" className="mb-7">
          <div className="sm:grid grid-cols-12 gap-3 px-0.5">
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Shifoxona rasmiy nomi
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="clinicName"
                placeholder={"Shifoxona nomini kiriting"}
              />
            </div>
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Manzili
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="string"
                placeholder={"Manzil kiriting"}
              />
            </div>
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Telefon raqam
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="phoneNumber"
                placeholder={"Telefon raqam kiriting"}
              />
            </div>
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Elektron pochta
                  </label>
                }
                type="email"
                className="mt-1"
                name="email"
                placeholder={"Elektron manzil kiriting"}
                required={false}
              />
            </div>
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Website nomi
                  </label>
                }
                className="mt-1"
                name="website"
                placeholder={"Web sahifa kiriting"}
                required={false}
              />
            </div>
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    INN
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="taxpayerIdNumber"
                placeholder={"INN raqam kiriting"}
              />
            </div>
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    STIR
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="stateRegistrationNumber"
                placeholder={"STIR raqami"}
              />
            </div>
            <div className="2xl:col-span-3 col-span-4 px-0.5 mt-1">
              <Select
                className="bg-white focus:ring-1  focus:outline-none focus:ring-secondary select-sm mt-1" labelText="Shifoxona turi"
                requiredLabel={true}>
                <Option className="" disabled selected>Turini tanlang </Option>
                <Option className="" value="Xusisiy">Xususiy</Option>
                <Option className="" value="Davlat tashkilot"> Davlat tashkiloti</Option>
                <Option className="" value="Ixtisoslashtirilgan">Ixtisoslashtirilgan</Option>
              </Select>
            </div>

            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Xodimlar soni
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="employeeCount"
                placeholder={"Xodimlar sonini kiriting"}
              />
            </div>
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Litsenziya raqami
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="licenseNumber"
                placeholder={"Litsenziya raqamini kiriting"}

              />
            </div>


            <div className="2xl:col-span-3 col-span-4">
              <div className="pt-1">
                <label htmlFor="firstName" className="text-gray-700">
                  Litsenziya amal qilish muddati
                  <span className="text-red-500">*</span>
                </label>

                <Space direction="vertical" style={{ width: '100%' }} className="mt-1" >
                  <Form.Item
                    name="dateRange"
                    rules={[
                      { required: true, message: "Bu majburiy maydon!", validateTrigger: "onBlur", }
                    ]}
                  >
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      placement="topRight"
                      onChange={handleDateChange}
                      placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
                      format="DD-MM-YYYY"
                      onBlur={handleBlur}
                    />
                  </Form.Item>

                </Space>


              </div>
            </div>
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Bank xisob raqami
                    <span className="text-red-500">*</span>
                  </label>
                }
                className="mt-1"
                name="bankAccountDetails"
                placeholder={"Bank xisob raqamini kiriting"}
              />
            </div>
            <div className="2xl:col-span-3 col-span-4">
              <label className="text-gray-700 font-medium mt-2">
                Xizmat turlari
                <span className="text-red-500">*</span>
              </label>

              <SelectedData />
            </div>
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Qayd qilish tizimi
                  </label>
                }
                className="mt-1"
                placeholder="Qayd qilish tizimini kiriting"
                name="accountingSystem"
                required={false}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-between">
            <button
              disabled
              onClick={() => onPrevious(true)}
              type="submit"
              className="w-24 p-1.5 cursor-not-allowed mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
            >
              Oldingi
            </button>
            <button
              onClick={() => onNext(true)}
              type="submit"
              className="w-24 p-1.5  mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
            >
              Keyingi
            </button>
          </div>
        </form>
      </FormProvider>
   
    </div >
  )
}
