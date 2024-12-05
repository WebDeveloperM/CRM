
import FormInput from "@core/components/FormInput"
import { FaLink } from "react-icons/fa"
import { useWorkerPositions } from "@clinica/hooks/addClinic"
import { useGetClinicData } from "@my-clinica/hooks/getClinic"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import instagram from "@my-clinica/static/instagram.webp"
import telegram from "@my-clinica/static/telegram.png"
import facebook from "@my-clinica/static/facebook.png"
import youtube from "@my-clinica/static/youtube.png"
import { useMask } from "@react-input/mask"
import { ClinicaFormData } from "@clinica/types"
import TreeSelectComponent from "./TreeSelectComponent"
import { MdOutlineEditLocation } from "react-icons/md";
import YandexMap2 from "./YandexMap2"
import { FaUserEdit } from "react-icons/fa";
import Profile from "./Profile"
import { IoWarningOutline } from "react-icons/io5"

export default function MyClinicaEditTable() {
    const clinicId = localStorage.getItem("clinicId")
    const clinicData = useGetClinicData(clinicId ? clinicId as string : "0")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [___, setConfirmModal] = useState(false)
    const [_, setSelectedIds] = useState<number[]>([])
    // const methods = useForm<ClinicResponse>({ mode: "onBlur" })

    const methods = useForm<ClinicaFormData>({ mode: "onBlur" })
    const inputRef = useMask({ mask: "+998(__) ___-__-__", replacement: { _: /\d/ } })

    const { ref: formInputRef } = methods.register("phoneNumber")

    // const inputRefINN = useMask({ mask: "_________", replacement: { _: /\d/ } })
    // const { ref: formInputRefINN } = methods.register("taxpayerIdNumber")

    // const inputRefSTIR = useMask({ mask: "_________", replacement: { _: /\d/ } })
    // const { ref: formInputRefSTIR } = methods.register("stateRegistrationNumber")

    // const inputRefLits = useMask({ mask: "__________________________________", replacement: { _: /\d/ } })

    // const { ref: formInputRefLits } = methods.register("licenseNumber")


    const [openMedia, setOpenMedia] = useState(false)
    const [openYandex, setOpenYandex] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const workerPositions = useWorkerPositions()

    const handleChange = (ids: number[]) => {
        setSelectedIds(ids)
    }




    if (!workerPositions.data || !workerPositions.data.data) {
        return <p className="my-5">Ma'lumotlar yuklanmoqda...</p> // Yuklanayotgan holat
    }

    return (
        <div className="overflow-x-auto rounded-md mt-2 text-gray-700  h-full pb-5 overflow-y-scroll 2xl:mt-6 ">

            <FormProvider {...methods}>
                <form action="">
                    <div className="sm:grid grid-cols-12 gap-3 px-0.5">
                        <div className="2xl:col-span-3 col-span-4">
                            <FormInput
                                label={
                                    <label htmlFor="firstName" className="text-gray-700">
                                        Shifoxona rasmiy nomi
                                        <span className="text-red-500">*</span>
                                    </label>
                                }
                                value={clinicData.data?.data.clinicName}
                                className="mt-1"
                                name="clinicName"
                                placeholder={"Shifoxona nomini kiriting"}

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
                                defaultValue={"+" + clinicData.data?.data.phoneNumber}

                                className="mt-1"
                                name="phoneNumber"
                                placeholder={"Telefon raqam kiriting"}
                                inputRef={inputRef}
                                formInputRef={formInputRef}

                            />
                        </div>

                        <div className="2xl:col-span-3 col-span-4">
                            <FormInput
                                label={
                                    <label htmlFor="firstName" className="text-gray-700">
                                        Elektron pochta
                                    </label>
                                }


                                defaultValue={clinicData.data?.data.email}
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
                                defaultValue={clinicData.data?.data.website}
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


                                defaultValue={clinicData.data?.data.taxpayerIdNumber}
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


                                defaultValue={clinicData.data?.data.stateRegistrationNumber}
                                className="mt-1"
                                name="stateRegistrationNumber"
                                placeholder={"STIR raqami"}

                            />
                        </div>

                        <div className="2xl:col-span-3 col-span-4 px-0.5 mt-1">
                            <label className="block mb-1 text-sm font-medium text-gray-900 ">Shifoxona turi</label>
                            <select
                                id="countries"
                                name="clinicType"


                                defaultValue={clinicData.data?.data.clinicType}
                                className="bg-white border border-gray-300 select-sm text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary block w-full  "
                            >
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
                                        Litsenziya raqami
                                    </label>
                                }


                                required={false}
                                defaultValue={clinicData.data?.data.licenseNumber as string}
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
                                    </label>
                                }


                                required={false}
                                defaultValue={clinicData.data?.data.licenseExpiryDate as string}
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
                                defaultValue={clinicData.data?.data.bankAccountDetails}
                                className="mt-1"


                                name="bankAccountDetails"
                                placeholder={"Bank xisob raqamini kiriting"}
                                type="number"
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
                                placeholder="Tanlang"
                                onChange={handleChange}
                                defaultValue={clinicData.data?.data.additionalServices}
                            />
                        </div>
                    </div>

                    {/* <div className="mt-2 px-1">
                        <label className="block mb-1 text-sm font-medium text-gray-900 ">Manzil</label>
                        <textarea

                            id="message"
                            rows={2}
                            defaultValue={clinicData.data?.data.legalAddress as string}
                            name="legalAddress"
                            className=" p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-1 focus:ring-secondary focus:outline-none block "
                            placeholder="Shifoxona to'grisida ma'lomotlar..."
                        ></textarea>
                    </div> */}
                    <div className="mt-2 px-1">
                        <label className="block mb-1 text-sm font-medium text-gray-900 ">Ta'rif</label>
                        <textarea

                            id="message"
                            rows={3}
                            defaultValue={clinicData.data?.data.description as string}
                            name="description"
                            className=" p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-1 focus:ring-secondary focus:outline-none block "
                            placeholder="Shifoxona to'grisida ma'lomotlar..."
                        ></textarea>
                    </div>

                    <p
                        onClick={() => setOpenMedia(!openMedia)}
                        className="p-1.5 pl-3 my-4 cursor-pointer w-full sm:w-52 flex items-center gap-2 bg-primary hover:bg-primary/80 text-sm text-white rounded-md duration-200"
                    >
                        <FaLink />
                        Ijtimoiy tarmoq manzillari
                    </p>

                    {openMedia ? (
                        <div className="sm:grid grid-cols-10 gap-2">
                            <div className="col-span-2 ml-0.5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Instagram</label>
                                <div className="relative mb-2">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <img src={instagram} alt="" className="w-5 h-5" />
                                    </div>
                                    <input

                                        type="text"
                                        id="input-group-1"
                                        defaultValue={clinicData.data?.data.instagram as string}
                                        className="bg-white input-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none block ps-10 p-2.5 2xl:w-64 sm:w-48 w-full"
                                        placeholder="Username kiriting"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Telegram</label>
                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <img src={telegram} alt="" className="w-5 h-5" />
                                    </div>
                                    <input

                                        type="text"
                                        id="input-group-1"
                                        defaultValue={clinicData.data?.data.telegram as string}
                                        className="bg-white input-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none block  ps-10 p-2.5 2xl:w-64 sm:w-48 w-full"
                                        placeholder="Username kiriting"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Facebook</label>
                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <img src={facebook} alt="" className="w-5 h-5" />
                                    </div>
                                    <input

                                        type="text"
                                        id="input-group-1"
                                        defaultValue={clinicData.data?.data.facebook as string}
                                        className="bg-white input-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none block ps-10 p-2.5 2xl:w-64 sm:w-48 w-full"
                                        placeholder="Username kiriting"
                                    />
                                </div>
                            </div>
                            <div className="col-span-4 mr-0.5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Youtube</label>
                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <img src={youtube} alt="" className="w-5 h-5" />
                                    </div>
                                    <input

                                        type="text"
                                        id="input-group-1"
                                        defaultValue={clinicData.data?.data.youtube as string}
                                        className="bg-white input-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none block ps-10 p-2.5 w-full"
                                        placeholder="Havola kiriting"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}



                    <p
                        onClick={() => setOpenYandex(!openYandex)}
                        className="p-1.5 pl-3 my-4 cursor-pointer w-full sm:w-52 flex items-center gap-2 bg-primary hover:bg-primary/80 text-sm text-white rounded-md duration-200"
                    >
                        <MdOutlineEditLocation />
                        Manzilni o'zgartirish
                    </p>


                    {openYandex ? (
                        <YandexMap2 />
                    ) : null}


                    <p
                        onClick={() => setOpenProfile(!openProfile)}
                        className="p-1.5 pl-3 my-4 cursor-pointer w-full sm:w-52 flex items-center gap-2 bg-primary hover:bg-primary/80 text-sm text-white rounded-md duration-200"
                    >
                        <FaUserEdit />
                        Profile o'zgaritirish
                    </p>
          

                    {openProfile ? (
                        <Profile />
                    ) : null}
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="w-32 p-1.5 py-2 bg-secondary float-right hover:bg-secondary/80 text-white rounded-md duration-200"
                    >
                        Tasdiqlash
                    </button>

                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                                <div className="flex justify-center text-4xl mb-4 text-gray-500">
                                    <IoWarningOutline />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800 text-center">
                                    Kiritilgan ma'lumotlarni tasdiqlaysizmi?
                                </h2>
                                <div className="mt-6 flex justify-end space-x-2">
                                    {/* Cancel tugma */}
                                    <button
                                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Bekor qilish
                                    </button>
                                    {/* Confirm/Delete tugma */}
                                    <button

                                        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                                        onClick={() => setConfirmModal(true)}
                                    >
                                        Tasdiqlayman
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </FormProvider>

        </div >
    )
}
