import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuEye } from "react-icons/lu";


export default function MyClinicaTable() {

    return (

        <div className=' ' >
            <table className="table-md  min-w-full text-left  whitespace-nowrap rounded-md  scrollbar h-2/3 overflow-y-scroll " >

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
                        <td className="2xl:px-5 px-3 py-1.5 min-w-[250px]">Prof med service Bukhara</td>
                        <td className="2xl:px-5 px-3 py-1.5  flex items-center gap-2">
                            ул. Хафиза Таниша Бухари, 22, Бухара
                        </td>
                        <td className="2xl:px-5 px-3 py-1.5 ">+998907150260</td>
                        <td className="2xl:px-5 px-3 py-1.5 ">promedservice@gmail.com</td>
                        <td className="2xl:px-5 px-3 py-1.5  ">Xususiy</td>
                        <td className="2xl:px-5 px-3 py-1.5  border-r">
                            <div className="flex items-center gap-6 justify-center float-left text-base">
                                <FaRegTrashAlt className="text-red-500 cursor-pointer" />
                                <BiSolidEdit className="text-blue-500 cursor-pointer" />
                                <LuEye className="text-green-500 cursor-pointer" />
                            </div>
                        </td>
                    </tr>


                </tbody>

            </table>




        </div>
    )
}
