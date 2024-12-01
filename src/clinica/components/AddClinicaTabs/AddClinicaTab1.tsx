import FormInput from "@core/components/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { ClinicaFormData } from "src/clinica/types";
import { useClinica } from "../../context/ClinicaContext";
import { FaLink } from "react-icons/fa";
import { useState } from "react";
import instagram from "../../static/instagram.webp";
import telegram from "../../static/telegram.png";
import facebook from "../../static/facebook.png";
import youtube from "../../static/youtube.png";
import TreeSelectComponent from "../TreeSelect";
import { useWorkerPositions } from "@clinica/hooks/addClinic";

type Props = {
  onPrevious: (status: boolean) => void
  onNext: (status: boolean) => void
}



export default function AddClinicaTab1({ onPrevious, onNext }: Props) {
  const methods = useForm<ClinicaFormData>({ mode: "onBlur" })
  const { data, setData } = useClinica();
  const [openMedia, setOpenMedia] = useState(false);

  const workerPositions = useWorkerPositions()

  if (!workerPositions.data || !workerPositions.data.data) {
    return <p>Ma'lumotlar yuklanmoqda...</p>; // Yuklanayotgan holat
  }

  const handleSelection = (selected: number[]) => {
    console.log("Selected IDs:", selected);
  };

  // const handleSelection = (selected: number[]) => {
  //   console.log("Selected IDs:", selected);
  // };

  return (
    <div className="overflow-x-auto rounded-md text-gray-700  h-full pb-5 overflow-y-scroll 2xl:mt-6 " >
      <FormProvider {...methods}>
        <div className="mb-7">
          <div className="sm:grid grid-cols-12 gap-3 px-0.5">
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Shifoxona rasmiy nomi
                    <span className="text-red-500">*</span>
                  </label>
                }
                value={data.clinicName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, clinicName: e.target.value })}
                className="mt-1"
                name="clinicName"
                placeholder={"Shifoxona nomini kiriting"}
              />
            </div>
            {/* <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Manzili
                    <span className="text-red-500">*</span>
                  </label>
                }
                value={data.legalAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, legalAddress: e.target.value })}
                className="mt-1"
                name="legalAddress"
                placeholder={"Manzil kiriting"}
              />
            </div> */}
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Telefon raqam
                    <span className="text-red-500">*</span>
                  </label>
                }
                value={data.phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, phoneNumber: e.target.value })}
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
                value={data.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value })}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, website: e.target.value })}
                className="mt-1"
                name="website"
                value={data.website}
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
                value={data.taxpayerIdNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, taxpayerIdNumber: e.target.value })}
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
                value={data.stateRegistrationNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, stateRegistrationNumber: e.target.value })}
                className="mt-1"
                name="stateRegistrationNumber"
                placeholder={"STIR raqami"}
              />
            </div>

            <div className="2xl:col-span-3 col-span-4 px-0.5 mt-1">
              <label className="block mb-1 text-sm font-medium text-gray-900 ">Shifoxona turi</label>
              <select id="countries" name="clinicType"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData({ ...data, clinicType: e.target.value })}
                value={data.clinicType}
                className="bg-white border border-gray-300 select-sm text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary block w-full  ">
                <option>Shifoxona turini tanlang</option>
                <option value="Xususiy">Xususiy</option>
                <option value="Davlat tashkiloti">Davlat tashkiloti</option>
                <option value="Ixtisoslashtirilgan">Ixtisoslashtirilgan</option>
              </select>
            </div>

            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Xodimlar soni
                    <span className="text-red-500">*</span>
                  </label>
                }
                value={data.employeeCount.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, employeeCount: parseInt(e.target.value) })}
                type="number"
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
                   
                  </label>
                }
                required={false}
                value={data.licenseNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, licenseNumber: e.target.value })}
                className="mt-1"
                name="licenseNumber"
                placeholder={"Litsenziya raqamini kiriting"}

              />
            </div>

            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Litsenziya amal qilish muddati
                    <span className="text-red-500">*</span>
                  </label>
                }
                required={false}
                value={data.licenseExpiryDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, licenseExpiryDate: e.target.value })}
                className="mt-1"
                name="licenseExpiryDate"
                type="date"
              />
            </div>

            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Bank xisob raqami
                    <span className="text-red-500">*</span>
                  </label>
                }
                value={data.bankAccountDetails}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, bankAccountDetails: e.target.value })}
                className="mt-1"
                name="bankAccountDetails"
                placeholder={"Bank xisob raqamini kiriting"}
              />
            </div>

            <div className="2xl:col-span-3 col-span-4 mt-1">
              <label className="text-gray-700 font-medium mt-2">
                Xizmat turlari
                <span className="text-red-500">*</span>
              </label>

              <TreeSelectComponent
                data={workerPositions.data?.data}
                language="uz"
                placeholder="Xodimlarni tanlang"
                onChange={handleSelection}
              />

            </div>
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Qayd qilish tizimi
                  </label>
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, accountingSystem: e.target.value })}
                value={data.accountingSystem}
                className="mt-1"
                placeholder="Qayd qilish tizimini kiriting"
                name="accountingSystem"
                required={false}
              />
            </div>

          </div>


          <div className="mt-2 px-1">
            <label className="block mb-1 text-sm font-medium text-gray-900 ">Ta'rif</label>
            <textarea id="message" rows={3}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData({ ...data, description: e.target.value })}
              value={data.description}
              name="description"
              className=" p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-1 focus:ring-secondary focus:outline-none block " placeholder="Shifoxona to'grisida ma'lomotlar..."></textarea>
          </div>

          <p
            onClick={() => setOpenMedia(!openMedia)}
            className="p-1.5 pl-3 my-4 cursor-pointer w-full sm:w-52 flex items-center gap-2 bg-primary hover:bg-primary/80 text-sm text-white rounded-md duration-200"
          >
            <FaLink />
            Ijtimoiy tarmoq manzillari
          </p>

          {openMedia ?
            <div className="sm:grid grid-cols-10 gap-2">
              <div className="col-span-2 ml-0.5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Instagram</label>
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <img src={instagram} alt="" className="w-5 h-5" />
                  </div>
                  <input type="text" id="input-group-1"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, instagram: e.target.value })}
                    value={data.instagram}
                    className="bg-white input-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none block ps-10 p-2.5 2xl:w-64 sm:w-48 w-full" placeholder="Username kiriting" />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Telegram</label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <img src={telegram} alt="" className="w-5 h-5" />
                  </div>
                  <input type="text" id="input-group-1"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, telegram: e.target.value })}
                    value={data.telegram}
                    className="bg-white input-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none block  ps-10 p-2.5 2xl:w-64 sm:w-48 w-full" placeholder="Username kiriting" />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Facebook</label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <img src={facebook} alt="" className="w-5 h-5" />
                  </div>
                  <input type="text" id="input-group-1"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, facebook: e.target.value })}
                    value={data.facebook}

                    className="bg-white input-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none block ps-10 p-2.5 2xl:w-64 sm:w-48 w-full" placeholder="Username kiriting" />
                </div>
              </div>
              <div className="col-span-4 mr-0.5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Youtube</label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <img src={youtube} alt="" className="w-5 h-5" />
                  </div>
                  <input type="text" id="input-group-1"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, youtube: e.target.value })}
                    value={data.youtube}
                    className="bg-white input-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none block ps-10 p-2.5 w-full" placeholder="Havola kiriting" />
                </div>
              </div>
            </div>
            : null}


          <div className="flex gap-2 justify-between">
            <button
              disabled
              onClick={() => onPrevious(true)}
              className="w-24 p-1.5 cursor-not-allowed mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
            >
              Oldingi
            </button>
            <button
              onClick={() => onNext(true)}
              className="w-24 p-1.5  mt-4 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
            >
              Keyingi
            </button>
          </div>
        </div>
      </FormProvider>
    </div >
  )
}
