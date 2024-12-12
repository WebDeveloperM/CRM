import FormInput from "@core/components/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Space, TimePicker } from 'antd';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { TimeRangePickerProps } from 'antd/es/time-picker';
import { useTranslation } from "react-i18next";
import MathCaptcha from "@core/components/Captcha";
import { Link, useNavigate } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { VscRefresh } from "react-icons/vsc";
import { toast } from "react-toastify";
import { useMask } from "@react-input/mask";
import { useWorkerPositions } from "@clinica/hooks/addClinic";
import { getRelevantIds } from "@doctors/utils/selectedIDS";;
import { DoctorUpdate } from "@doctors/types";
import { useAddDoctors } from "@doctors/hooks/addDoctors";
import TreeSelectComponent from "./TreeSelectComponent";
import TextEditor from "./TextEditor";
import { useDocorView } from "@doctors/hooks/viewDoctor";
import { useUpdateDoctor } from "@doctors/context/updateDoctorsContext";

export default function DoctorEdit() {
    const [check, setCheck] = useState<SetStateAction<boolean>>(false)
    const { t, i18n } = useTranslation()
    const { userData, setUserData } = useUpdateDoctor()
    const uniqueToken = localStorage.getItem("doctorToken")
    const doctorData = useDocorView(uniqueToken as string)
    console.log(doctorData, "11111111111111");

    const methods = useForm<DoctorUpdate>({ mode: "onBlur" })

    const [isVerified, setIsVerified] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [image, setImage] = useState<string | null>(null);
    const [imageDoctor, setImageDoctor] = useState<string | null>(doctorData.data?.data.base64Photo as string);
    const cropperRef = useRef<HTMLImageElement>(null);
    const workerPositions = useWorkerPositions()
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [_, setSalary] = useState<number>()
    const [allowTime, setAllowTime] = useState<string[]>(["08:00:00", "20:00:00"])


    const [gender, setGender] = useState("")
    const [canSeeReports, setCanSeeReports] = useState(false)
    const navigate = useNavigate()


    const { mutateAsync } = useAddDoctors()
    const handleChangeSelect = (ids: number[]) => {
        setSelectedIds(ids)
        setUserData({ ...userData, position: ids })
    }
    const inputRoleWord = useMask({
        mask: "жж",
        replacement: { ж: /[A-Za-z]/ },
        onMask: (mask) => (mask.target.value = mask.target.value.toUpperCase()),
    })
    const { ref: formRoleWord } = methods.register("orderSign")

    const inputRef = useMask({ mask: "(__) ___-__-__", replacement: { _: /\d/ } })
    const { ref: formInputRef } = methods.register("phoneNumber")


    const inputTimeOutRef = useMask({ mask: "___", replacement: { _: /\d/ }, })
    const { ref: formTimeOutRef } = methods.register("timeOutMinutes")

    const possibleRoles = getRelevantIds("uz")

    dayjs.extend(customParseFormat);

    const timePickerChange: TimeRangePickerProps['onChange'] = (dates, dateStrings) => {
        console.log(dates);
        setAllowTime(dateStrings)
        setUserData({ ...userData, allowedWorkingHours: dateStrings })
    };



    const handleCaptchaVerify = (status: boolean) => {
        setIsVerified(status);
    };


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
        setUserData({ ...userData, description: value })
    };


    const getCropData = () => {
        const cropper = (cropperRef.current as any)?.cropper;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob: Blob | null) => {
                if (blob) {
                    const croppedFile = new File([blob], "cropped-image.png", { type: "image/png" });
                    setFile(croppedFile);
                    toast.success("Ma'lumot saqlandi");
                }
            }, 'image/png');
        }
    };

    console.log(doctorData.data?.data.allowedWorkingHours)

    // useEffect(() => {
    //     setUserData({
    //         ...userData,
    //         firstName: doctorData.data?.data.firstName ? doctorData.data?.data.firstName : "",
    //         lastName: doctorData.data?.data.lastName ? doctorData.data?.data.lastName : "",
    //         fatherName: doctorData.data?.data.fatherName ? doctorData.data?.data.fatherName : "",
    //         base64Photo: doctorData.data?.data.base64Photo ? doctorData.data?.data.base64Photo : "",
    //         phoneNumber: doctorData.data?.data.phoneNumber ? doctorData.data?.data.phoneNumber : "",
    //         salary: doctorData.data?.data.salary ? doctorData.data?.data.salary : 0,
    //         orderSign: doctorData.data?.data.orderSign ? doctorData.data?.data.orderSign : "",
    //         sex: doctorData.data?.data.sex ? doctorData.data?.data.sex : "",

    //         // salary: doctorData.data?.data.salary ? doctorData.data?.data.salary : "",
    //         // salary: doctorData.data?.data.salary ? doctorData.data?.data.salary : "",
    //         // timeOutMinutes: doctorData.data?.data.timeOutMinutes ? doctorData.data?.data.timeOutMinutes : 0,
    //         // allowedWorkingHours: doctorData.data?.data.allowedWorkingHours ? [doctorData.data?.data.allowedWorkingHours.slice(0, 8), doctorData.data?.data.allowedWorkingHours.slice(9, 8)] : [],


    //     })
    // }, [])


    // console.log(doctorData, "1111111111111");
    console.log(userData, "22222222");


    async function onSubmit(data: DoctorUpdate) {
        // data.allowedWorkingHours = allowTime
        // data.clinicId = clinicId ? parseInt(clinicId) : 0
        // data.base64Photo = image as string
        // data.sex = gender
        // data.position = selectedIds
        // data.canSeeReports = canSeeReports
        // data.description = content


        if (!check) {
            toast.warning(t("agreeTerms"))
            return
        }
        if (!isVerified) {
            toast.warning(t("proveNotRobot"))
            return
        }

        // const response = await mutateAsync(data)



        // if (!response.success && response.message == "Username already exists.") {
        //     toast.warning("Bunday foydalanuvchi mavjud. Boshqa login kiriting")
        //     return
        // }
        // if (!response.success && response.message == "Failed to create user.") {
        //     toast.warning("Parol kiritishda xatolik. (A-Za-z/1-9/) belgilar bo'lishi majburiy")
        //     return
        // }
        // if (!response.success && response.message == "Clinic not found.") {
        //     toast.warning("Shifoxona ma'lumotlarida xatolik mavjud. ")
        //     return
        // }
        // if (!response.success && response.message == "Invalid position ID:") {
        //     toast.warning("Hodimning rolida xatolik mavjud")
        //     navigate("/")
        //     return
        // }

        // if (response.success && response.message == "Employee created successfully.") {
        //     toast.success("Hodim muvaffaqqaiyatli qo'shildi")
        //     navigate("/doctors")
        //     navigate(0)
        //     return
        // }
    }



    if (!workerPositions.data || !workerPositions.data.data) {
        return <p className="px-5">Ma'lumotlar yuklanmoqda...</p> // Yuklanayotgan holat
    }



    return (
        <div className="px-6 mt-6">
            <h4 className="mb-5">Hodim ma'lumotlarini tahrirlash</h4>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} action="" className="  ">
                    <div className="sm:grid grid-cols-12 gap-3 px-0.5">
                        <div className="2xl:col-span-3 col-span-4">
                            <FormInput
                                label={
                                    <label htmlFor="firstName" className="text-gray-700">
                                        Familiya
                                        <span className="text-red-500">*</span>
                                    </label>
                                }
                                defaultValue={doctorData.data?.data.firstName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, lastName: e.target.value })}
                                className="mt-1"
                                name="lastName"
                                placeholder={"Familiya kiriting"}
                            />
                        </div>
                        <div className="2xl:col-span-3 col-span-4">
                            <FormInput
                                label={
                                    <label htmlFor="firstName" className="text-gray-700">
                                        Ism
                                        <span className="text-red-500">*</span>
                                    </label>
                                }
                                defaultValue={doctorData.data?.data.lastName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, firstName: e.target.value })}
                                className="mt-1"
                                name="firstName"
                                placeholder={"Ism kiriting"}
                            />
                        </div>
                        <div className="2xl:col-span-3 col-span-4">
                            <FormInput
                                label={
                                    <label htmlFor="firstName" className="text-gray-700">
                                        Otasining ismi
                                        <span className="text-red-500">*</span>
                                    </label>
                                }
                                defaultValue={doctorData.data?.data.fatherName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, fatherName: e.target.value })}
                                className="mt-1"
                                name="fatherName"
                                placeholder={"Otasining ismini kiriting"}
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
                                defaultValue={doctorData.data?.data.phoneNumber}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, phoneNumber: e.target.value })}
                                className="mt-1"
                                name="phoneNumber"
                                placeholder={"Telefon raqam kiriting"}
                                inputRef={inputRef}
                                formInputRef={formInputRef}
                            />
                        </div>

                        <div className="2xl:col-span-3 col-span-4 sm:mt-0 mt-2">
                            <FormInput
                                label={
                                    <label htmlFor="firstName" className="text-gray-700">
                                        Time Out (minut)
                                    </label>
                                }

                                defaultValue={doctorData.data?.data.timeOutMinutes}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, timeOutMinutes: parseInt(e.target.value) })}
                                className="mt-1"
                                name="timeOutMinutes"
                                placeholder={"Ishlash muddati"}
                                inputRef={inputTimeOutRef}
                                formInputRef={formTimeOutRef}

                            />
                        </div>

                        <div className="2xl:col-span-3 col-span-4 sm:mt-1 mt-2">
                            <p className="text-gray-700 pb-1">
                                Kirish imkoniyati (08:00 - 20:00)
                            </p>

                            <Space direction="vertical" >
                                <TimePicker.RangePicker className="sm:w-[338px] w-[100%]"
                                    onChange={timePickerChange}
                                    defaultValue={[dayjs(`${doctorData ? doctorData.data?.data.allowedWorkingHours.slice(0, 8) : "08:00"}`, 'HH:mm'), dayjs(`${doctorData.data?.data.allowedWorkingHours.slice(9, 16)}`, 'HH:mm')]}
                                    placeholder={['Boshlash', 'Tugash']}

                                />
                            </Space>
                        </div>

                        <div className="2xl:col-span-3 col-span-4 sm:mt-0 mt-2">
                            <FormInput
                                label={
                                    <label htmlFor="firstName" className="text-gray-700">
                                        Ish haqqi
                                        <span className="text-red-500">*</span>
                                    </label>
                                }
                                defaultValue={doctorData.data?.data.timeOutMinutes}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, salary: parseInt(e.target.value) })}

                                className="mt-1"
                                name="salary"
                                placeholder={"Oylik ish haqqi"}
                                type="number"

                            />
                        </div>

                        <div className="2xl:col-span-3 col-span-4 mt-1">
                            <label className="text-gray-700 font-medium mt-2">
                                Hodimning roli
                                <span className="text-red-500">*</span>
                            </label>

                            <TreeSelectComponent
                                data={workerPositions.data?.data}
                                language="uz"
                                placeholder="Tanlang"
                                onChange={handleChangeSelect}
                                defaultValue={doctorData.data?.data.position}
                            />
                        </div>

                        <div className="2xl:col-span-3 col-span-4 gap-2">
                            <div className="grid grid-cols-12">
                                <div className={`col-span-7 sm:mt-0 mt-2 `}>
                                    <FormInput
                                        label={
                                            <label htmlFor="firstName" className="text-gray-700">
                                                {`Navbat uchun harf`}
                                                <span className="text-red-500">*</span>
                                            </label>
                                        }
                                        defaultValue={doctorData.data?.data.orderSign}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, orderSign: e.target.value })}
                                        className="mt-1"
                                        name="orderSign"
                                        placeholder="AA"

                                        inputRef={inputRoleWord}
                                        formInputRef={formRoleWord}
                                    />
                                </div>

                                <div className="mt-2 col-span-4">
                                    <div className="flex flex-col items-start space-y-2 ml-2">
                                        <label className="">Jinsi:</label>

                                        <div className="flex items-center space-x-4">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    value="Male"
                                                    name="sex"
                                                    checked={doctorData.data?.data.sex == 'Male' ? true : false}
                                                    onChange={(e => setGender(e.target.value))}
                                                    className="w-3 h-3 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="">Erkak</span>
                                            </label>

                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    value="Female"
                                                    name="sex"
                                                    checked={doctorData.data?.data.sex == 'Female' ? true : false}
                                                    onChange={(e => setGender(e.target.value))}
                                                    className="w-3 h-3 text-pink-600 focus:ring-pink-500"
                                                />
                                                <span className="">Ayol</span>
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="sm:grid grid-cols-12 gap-4 px-0.5 mt-2">

                        <div className="col-span-8">
                            <p className="mb-2">Hodim haqida malumot</p>
                            <TextEditor value={doctorData.data?.data.description} onChange={handleContentChange} />

                            {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
                        </div>
                        <div className="col-span-4 pt-2 ml-0.5 mt-[70px] sm:mt-0">
                            {!image && !imageDoctor ?
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



                            {file || imageDoctor ?
                                <>
                                    <img src={doctorData ? doctorData.data?.data.base64Photo : URL.createObjectURL(file)} alt="" className="w-40 rounded-xl" />
                                    <button onClick={() => {
                                        setImage(null)
                                        setFile(null)
                                        setImageDoctor(null)
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
                                    value="yes"
                                    name="canSeeReports"
                                    checked={doctorData.data?.data.canSeeReports ? true : false}
                                    onChange={() => setCanSeeReports(true)}
                                    className="w-3 h-3 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="">Ha</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value="no"
                                    name="canSeeReports"
                                    checked={doctorData.data?.data.canSeeReports ? true : false}
                                    onChange={() => setCanSeeReports(false)}
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
