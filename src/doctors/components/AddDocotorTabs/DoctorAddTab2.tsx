import FormInput from "@core/components/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { ClinicaFormData } from "src/clinica/types";
import { SetStateAction, useRef, useState } from "react";
import { Space, TimePicker } from 'antd';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { TimeRangePickerProps } from 'antd/es/time-picker';
import { useDoctorRols } from "@doctors/hooks/addDoctors";
import { useTranslation } from "react-i18next";
import MathCaptcha from "@core/components/Captcha";
import { Link } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { VscRefresh } from "react-icons/vsc";
import { toast } from "react-toastify";
import TextEditor from "../TextEditor";
import { useMask } from "@react-input/mask";

// import TextEditor from "../TextEditor";

const possibleRoles: string[] = ["Shifokor", "Laboratoriya", "Kassa"]


export default function DoctorAddTab2() {
  const [check, setCheck] = useState<SetStateAction<boolean>>(false)
  const [role, setRole] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const { t, i18n } = useTranslation()
  const methods = useForm<ClinicaFormData>({ mode: "onBlur" })
  const doctorRols = useDoctorRols()
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const cropperRef = useRef<HTMLImageElement>(null);

  const inputRoleWord = useMask({
    mask: "жж | _______",
    replacement: { ж: /[A-Za-z]/, _: /\d/ },
    onMask: (mask) => (mask.target.value = mask.target.value.toUpperCase()),
  })
  //@ts-ignore
  const { ref: formRoleWord } = methods.register("roleWord")



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



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [content, setContent] = useState<string>('');

  const handleContentChange = (value: string) => {
    setContent(value);
  };


  const getCropData = () => {
    const cropper = (cropperRef.current as any)?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob: Blob | null) => {
        if (blob) {
          const croppedFile = new File([blob], "cropped-image.png", { type: "image/png" });
          setFile(croppedFile);
          console.log(croppedFile, "Cropped File");
          toast.success("Ma'lumot saqlandi");
        }
      }, 'image/png');
    }
  };

  if (!doctorRols.data || !doctorRols.data.data) {
    return <p className="my-3">Ma'lumotlar yuklanmoqda...</p>
  }

  return (
    <div className="px-3 mt-4" >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} action="" className="  ">
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
                placeholder={"Ism va familiyasi"}
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
                placeholder={"Ishlash muddati"}
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
              <div className="flex flex-col items-start space-y-2 ml-2">
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
              <label className="block mb-1 text-sm font-medium text-gray-900 ">Hodim roli</label>
              <select id="countries" name="clinicType"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
                value={role}
                className="bg-white border border-gray-300 select-sm text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary block w-full  ">
                <option>Hodim rolini tanlang</option>
                {doctorRols && doctorRols.data.data?.map((value, key) => (
                  <option key={key} value={value.nameUz}>{value.nameUz}</option>
                ))}
              </select>
            </div>

            <div className={`2xl:col-span-3 col-span-4 sm:mt-0 mt-2 ${possibleRoles.includes(role) ? "block" : "hidden"}`}>
              <FormInput
                label={
                  <label htmlFor="firstName" className="text-gray-700">
                    {`${role}da navbat uchun harf kiriting`}
                    <span className="text-red-500">*</span>
                  </label>
                }
                // value={data.stateRegistrationNumber}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, stateRegistrationNumber: e.target.value })}
                className="mt-1"
                name="doctorWord"
                placeholder="AA"
                inputRef={inputRoleWord}
                formInputRef={formRoleWord}
              />
            </div>

          </div>

          <div className="sm:grid grid-cols-12 gap-4 px-0.5 mt-3">

            <div className="col-span-8">
              <p className="mb-2">Hodim haqida malumot</p>
              <TextEditor value={content} onChange={handleContentChange} />

              {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
            </div>
            <div className="col-span-4 pt-2 ml-0.5 mt-12 sm:mt-0">
              {!image ?
                <div className="flex items-center justify-start">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center  w-full sm:h-40 h-32 text-center   border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 text-center"><span className="font-semibold">Profile rasmini yuklash</span></p>
                      <p className="text-xs text-gray-500 sm:block hidden text-center">SVG, PNG, JPG or GIF (MAX. 400x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                </div> : null}

              {image && !file && (
                <Cropper
                  src={image}
                  style={{ height: 200, width: '100%' }}
                  initialAspectRatio={9 / 9}
                  guides={false}
                  ref={cropperRef}
                />

              )}

              {image && !file ?
                <button type="button" onClick={getCropData} className="w-24 p-1.5 my-2 mt-4 bg-primary hover:bg-primary/80 text-sm text-white rounded-md duration-200">Yuklash</button>
                :
                null}



              {file ?
                <>
                  <img src={URL.createObjectURL(file)} alt="" className="w-40 rounded-xl" />
                  <button onClick={() => {
                    setImage(null)
                    setFile(null)
                  }}
                    type="button"
                    className="w- p-1.5  bg-slate-400 mt-2 text-sm text-white rounded-md duration-200 flex items-center gap-2">
                    <VscRefresh />
                    Rasmni yangilash
                  </button>
                </>
                : null
              }
            </div>


          </div>





          <div className="flex flex-col items-start space-y-2 mt-5">
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
          <div className="flex items-center my-5 font-semibold ">
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

          <div className="my-5 2xl:max-w-[25%] sm:max-w-[25%] max-w-[80%]">
            <MathCaptcha onVerify={handleCaptchaVerify} />
          </div>



          <div className="flex gap-2 justify-end ">

            <Link to={'/doctors'}>
              <button
                type="submit"
                className="w-24 p-1.5  mt-2 bg-white border hover:bg-secondary-light text-sm text-secondary rounded-md duration-200"
              >
                Bekor qilish
              </button>
            </Link>
            <button
              type="submit"
              className="w-24 p-1.5  mt-2 bg-secondary hover:bg-secondary/80 text-sm text-white rounded-md duration-200"
            >
              Qo'shish
            </button>
          </div>

        </form>
      </FormProvider>
    </div >
  )
}
