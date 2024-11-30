import FormInput from "@core/components/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { ClinicaFormData } from "src/clinica/types";
import { SetStateAction, useState } from "react";
import { Space, TimePicker } from 'antd';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { TimeRangePickerProps } from 'antd/es/time-picker';
import { useDoctorRols } from "@doctors/hooks/addDoctors";
import { useTranslation } from "react-i18next";
import MathCaptcha from "@core/components/Captcha";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";



export default function AddDoctorTab1() {
  const [check, setCheck] = useState<SetStateAction<boolean>>(false)
  const [isVerified, setIsVerified] = useState(false)
  const { t, i18n } = useTranslation()
  const methods = useForm<ClinicaFormData>({ mode: "onBlur" })
  const doctorRols = useDoctorRols()
  // const { data, setData } = useClinica();
  // const [openMedia, setOpenMedia] = useState(false);

  if (!doctorRols.data || !doctorRols.data.data) {
    return <p className="my-3">Ma'lumotlar yuklanmoqda...</p>
  }

  dayjs.extend(customParseFormat);

  const onChange: TimeRangePickerProps['onChange'] = (dates, dateStrings) => {
    console.log('Dates:', dates);
    console.log('Date Strings:', dateStrings);
  };

  const handleCaptchaVerify = (status: boolean) => {
    setIsVerified(status);

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  };
  const handleChekc = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  };


  async function onSubmit() {

    // if (isLoading) return
    // if (error) {
    //   toast.error(error.message)
    //   return
    // }

    if (!check) {
      toast.warning(t("agreeTerms"))
      return
    }
    if (!isVerified) {
      toast.warning(t("proveNotRobot"))
      return
    }




  }
  return (
    <div className="overflow-x-scroll rounded-md text-gray-700  h-full pb-5 overflow-y-scroll 2xl:mt-6 " >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} action="" className="mb-7 ">
          <div className="sm:grid grid-cols-12 gap-3 px-0.5">
            <div className="2xl:col-span-3 col-span-4">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    F.I.O
                    <span className="text-red-500">*</span>
                  </label>
                }
                // value={data.clinicName}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, clinicName: e.target.value })}
                className="mt-1"
                name="clinicName"
                placeholder={"Shifokor ism va familiyasi"}
              />
            </div>
            <div className="2xl:col-span-3 col-span-4 sm:mt-0 mt-2">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Manzili
                    <span className="text-red-500">*</span>
                  </label>
                }
                // value={data.legalAddress}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, legalAddress: e.target.value })}
                className="mt-1"
                name="legalAddress"
                placeholder={"Manzil kiriting"}
              />
            </div>
            <div className="2xl:col-span-3 col-span-4 sm:mt-0 mt-2">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Telefon raqam
                    <span className="text-red-500">*</span>
                  </label>
                }
                // value={data.phoneNumber}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, phoneNumber: e.target.value })}
                className="mt-1"
                name="phoneNumber"
                placeholder={"Telefon raqam kiriting"}
              />
            </div>

            <div className="2xl:col-span-3 col-span-4 sm:mt-0 mt-2">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Time Out (minut)
                  </label>
                }
                // value={data.website}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, website: e.target.value })}
                className="mt-1"
                name="website"
                placeholder={"Web sahifa kiriting"}
                required={false}
              />
            </div>

            <div className="2xl:col-span-3 col-span-4 sm:mt-1 mt-2">
              <p className="text-gray-700 pb-1">
                Kirish imkoniyati (08:00 - 20:00)
              </p>

              <Space direction="vertical" >
                <TimePicker.RangePicker className="sm:w-[338px] w-[100%]"
                  onChange={onChange}
                  defaultValue={[dayjs('08:00', 'HH:mm'), dayjs('20:00', 'HH:mm')]}
                  placeholder={['Boshlash', 'Tugash']}
                />
              </Space>
            </div>
            <div className="2xl:col-span-3 col-span-4 mt-2">
              <div className="flex flex-col items-start space-y-2">
                <label className="">Jinsi:</label>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="erkak"
                      name="gender"

                      onChange={handleChange}
                      className="w-3 h-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="">Erkak</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="ayol"
                      name="gender"
                      onChange={handleChange}
                      className="w-3 h-3 text-pink-600 focus:ring-pink-500"
                    />
                    <span className="">Ayol</span>
                  </label>
                </div>

              </div>
            </div>

            <div className="2xl:col-span-3 col-span-4 sm:mt-0 mt-2">
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    Ish haqqi
                    <span className="text-red-500">*</span>
                  </label>
                }
                // value={data.stateRegistrationNumber}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, stateRegistrationNumber: e.target.value })}
                className="mt-1"
                name="stateRegistrationNumber"
                placeholder={"Oylik ish haqqi"}
              />
            </div>

            <div className="2xl:col-span-3 col-span-4 px-0.5 sm:mt-1 mt-2">
              <label className="block mb-1 text-sm font-medium text-gray-900 ">Shifokor imkoniyati</label>
              <select id="countries" name="clinicType"
                // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData({ ...data, clinicType: e.target.value })}
                // value={data.clinicType}
                className="bg-white border border-gray-300 select-sm text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary block w-full  ">
                <option>Shifokor imkoniyatlarini tanlang</option>
                {doctorRols && doctorRols.data.data?.map((value, key) => (
                  <option key={key} value={value.nameUz}>{value.nameUz}</option>
                ))}
              </select>
            </div>


            <div className="2xl:col-span-3 col-span-4 pt-2">
              <div className="flex flex-col items-start space-y-2">
                <label className="">Faqat o'z hisbotlarini ko'ra olsin:</label>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="no"
                      name="check"

                      onChange={handleChekc}
                      className="w-3 h-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="">Ha</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="yes"
                      name="check"

                      onChange={handleChekc}
                      className="w-3 h-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="">Yo'q</span>
                  </label>


                </div>

              </div>
            </div>

          </div>

          <div className="flex items-center my-5 font-semibold">
            <input
              id="link-radio"
              type="radio"
              onChange={(e) => setCheck(e.target.checked)}
              className="w-3 h-3 text-secondary bg-gray-100 border-gray-300 "
            />
            <label className="ms-2 text-sm  text-gray-900 ">
              {i18n.language == 'ru' ?
                <>
                  Я согласен на использование и обработку моих персональных данных в соответствии
                  <a
                    target="_blank"
                    href="https://lex.uz/docs/-4396419"
                    className="text-secondary hover:underline ml-1 mr-1"
                    rel="noreferrer"
                  >
                    с требованиями законодательства.
                  </a> </>
                :
                <>
                  <a
                    target="_blank"
                    href="https://lex.uz/docs/-4396419"
                    className="text-secondary hover:underline mr-1"
                    rel="noreferrer"
                  >
                    Qonun talablari
                  </a>
                  doirasida shaxsga doir maʼlumotlarimdan foydalanishga va ishlov berishga rozilik
                  bildiraman.
                </>
              }
            </label>
          </div>

          <div className="my-5 2xl:max-w-[20%] sm:max-w-[25%] max-w-[80%]">
            <MathCaptcha onVerify={handleCaptchaVerify} />
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
    </div >
  )
}
