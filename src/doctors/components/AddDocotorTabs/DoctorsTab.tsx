
import { useState } from "react";
import DoctorAddTab2 from "@doctors/components/AddDocotorTabs/DoctorAddTab2";
import DoctorsListTab1 from "./DoctorsListTab1";
// import AddDoktorTab33 from "./AddDoktorTab33";
// import AddDoctorTab4 from "@doctors/components/AddDocotorTabs/AddDoctorTab4";


export default function DoctorsTab() {

    const [search, setSearch] = useState<string>("")

    return (
        <div role="tablist" className="tabs tabs-bordered mt-2 overflow-x-auto scrollbar-thin  pt-3 mx-3">

            <input type="radio" name="my_tabs_1" defaultChecked role="tab" className="tab text-secondary min-w-[120px] ml-5 " aria-label="Hodimlar ro'yhati" />
            <div role="tabpanel" className="tab-content ">
                <form className="m-[2px] mb-3 mr-3 float-right flex items-center gap-2 mt-4">
                    <span>Qidirish</span>
                    <label htmlFor="inputSearch" className="sr-only">Qidirish </label>
                    <input id="inputSearch" placeholder="Ism va Familiya bo'yicha" type="text" onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())} className="block w-48 2xl:w-64 rounded-lg border px-2 py-1  text-sm focus:border-secondary/50 focus:outline-none focus:ring-1 focus:ring-secondary/50" />
                </form>
                <DoctorsListTab1 search={search} />
            </div>


            <input type="radio" name="my_tabs_1" defaultChecked role="tab" className="tab text-secondary min-w-[120px]  ml-10" aria-label="Hodim qo'shish" />
            <div role="tabpanel" className="tab-content py-4 ">
                <DoctorAddTab2 />
            </div>

            {/* <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab text-secondary mx-5 "
                aria-label="Profile"
            />
            <div role="tabpanel" className="tab-content  py-4">
                <DoctorAddTab2 />
            </div> */}

            {/* <input type="radio" name="my_tabs_1" role="tab" className=" tab text-secondary mx-5" aria-label="Account" />
            <div role="tabpanel" className="tab-content px-4 ">
                <AddDoktorTab3 />
            </div> */}
            {/* <input type="radio" name="my_tabs_1" role="tab" className="tab  text-secondary mx-5" aria-label="Account" />
            <div role="tabpanel" className="tab-content px-2 ">
                <AddDoctorTab4 />

            </div> */}
        </div>
    )
}


