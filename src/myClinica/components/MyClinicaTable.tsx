import { useGetClinicData } from "@my-clinica/hooks/getClinic"
import { isCheckClinic } from "@users/utils/auth"
import { useState } from "react"
import { BiSolidEdit } from "react-icons/bi"
import { FaRegTrashAlt } from "react-icons/fa"
import { LuEye } from "react-icons/lu"
import { Navigate, useNavigate } from "react-router-dom"
import { FaTrashAlt } from "react-icons/fa"
import { useDeleteClinicData } from "@my-clinica/hooks/deleteClinic"
import { toast } from "react-toastify"
import Tooltip from "@core/components/Tooltip"
import { useTranslation } from "react-i18next"

export default function MyClinicaTable() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { t } = useTranslation()
    const navigate = useNavigate()

    const clinicId = localStorage.getItem("clinicId")
    const clincData = useGetClinicData(clinicId as string)
    const { mutateAsync } = useDeleteClinicData(clinicId as string)

    const handleDelete = async () => {
        const response = await mutateAsync()
        if (response.success && response.message == "Clinic deleted successfully.") {
            toast.success("Shifoxona ma'lumotlari o'chirildi")
        }
        setIsModalOpen(false)
        navigate("/clinica")
    }

    if (!isCheckClinic()) {
        return <Navigate to="/clinica" />
    }

    return (
        <div className=" ">
            <table className="table-md  min-w-full text-left  whitespace-nowrap rounded-md  scrollbar h-2/3 overflow-y-scroll ">
                <thead className="tracking-wider sticky top-0  bg-secondary  rounded-md text-white  ">
                    <tr>
                        <th scope="col" className=" px-3 py-2 font-semibold   w-[30px] ">
                            №
                            {/*<a href="" className="inline">
                               <img src={tableIcon} alt="" className="w-[0.65rem] h-[0.65rem] inline ml-1 text-neutral-500  mb-[1px]" />
                           </a> */}
                        </th>
                        <th scope="col" className="2xl:px-6 px-3 py-2  font-semibold  w-[60px] ">
                            Nomi
                            {/*<a href="" className="inline">
                               <img src={tableIcon} alt="" className="w-[0.65rem] h-[0.65rem] inline ml-1 text-neutral-500  mb-[1px]" />
                           </a> */}
                        </th>
                        <th scope="col" className="2xl:px-6 px-3 py-2   font-semibold  min-w-[60px] ">
                            Manzil
                            {/*<a href="" className="inline">
                               <img src={tableIcon} alt="" className="w-[0.65rem] h-[0.65rem] inline ml-1 text-neutral-500  mb-[1px]" />
                           </a> */}
                        </th>
                        <th scope="col" className="2xl:px-6 px-3 py-2  font-semibold ">
                            Telefon raqam
                        </th>
                        <th scope="col" className="2xl:px-6 px-3 py-2  font-semibold ">
                            Elektron pochta
                            {/* <a href="" className="inline">
                                <img src={tableIcon} alt="" className="w-[0.65rem] h-[0.65rem] inline ml-1 text-neutral-500  mb-[1px]" />
                            </a> */}
                        </th>
                        <th scope="col" className="2xl:px-6 px-3 py-2  font-semibold ">
                            Shifoxona turi
                            {/* <a href="" className="inline">
                                <img src={tableIcon} alt="" className="w-[0.65rem] h-[0.65rem] inline ml-1 text-neutral-500  mb-[1px]" />

                            </a> */}
                        </th>

                        <th scope="col" className="2xl:px-6 px-3 py-2  font-semibold ">
                            Harakatlar
                        </th>
                    </tr>
                </thead>

                <tbody className="">
                    <tr className="border-b   border-l hover:bg-neutral-100 ">
                        <th scope="row" className="2xl:px-5 px-3 py-1.5  ">
                            1
                        </th>
                        <td className="2xl:px-5 px-3 py-1.5 min-w-[250px]">{clincData.data?.data.clinicName}</td>
                        <td className="2xl:px-5 px-3 py-1.5  flex items-center gap-2">
                            {clincData.data?.data.legalAddress}
                        </td>
                        <td className="2xl:px-5 px-3 py-1.5 ">{clincData.data?.data.phoneNumber}</td>
                        <td className="2xl:px-5 px-3 py-1.5 ">{clincData.data?.data.email}</td>
                        <td className="2xl:px-5 px-3 py-1.5  ">{clincData.data?.data.clinicType}</td>
                        <td className="2xl:px-5 px-3 py-1.5  border-r">
                            <div className="flex items-center gap-6 justify-center float-left text-base">
                                <Tooltip tip={"o'chirish"}>
                                    <FaRegTrashAlt
                                        onClick={() => setIsModalOpen(true)}
                                        className="text-red-500 cursor-pointer"
                                    />
                                </Tooltip>
                                <Tooltip tip={"tahrirlash"}>
                                    <BiSolidEdit className="text-blue-500 cursor-pointer" />
                                </Tooltip>
                                <Tooltip tip={"ko'rish"}>
                                    <LuEye className="text-green-500 cursor-pointer" />
                                </Tooltip>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <div className="flex justify-center text-4xl mb-4 text-gray-500">
                            <FaTrashAlt />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 text-center">
                            Shifoxona ma'lumotlarini o'chirishga rozimisiz?
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
                                onClick={handleDelete}
                            >
                                Roziman
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
