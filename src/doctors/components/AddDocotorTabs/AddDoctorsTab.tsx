import AddDoctorTab1 from "@doctors/components/AddDocotorTabs/AddDoctorTab1";
import AddDoctorTab2 from "@doctors/components/AddDocotorTabs/AddDoctorTab2";

import AddDoktorTab3 from "./AddDoctorTab3";
// import AddDoktorTab33 from "./AddDoktorTab33";
// import AddDoctorTab4 from "@doctors/components/AddDocotorTabs/AddDoctorTab4";


export default function AddDoctorsTab() {

    
    return (
        <div role="tablist" className="tabs tabs-bordered mt-2 overflow-x-auto scrollbar-thin ml-2 pt-3">

            <input type="radio" name="my_tabs_1" defaultChecked role="tab" className="tab text-secondary  ml-5 mx-5 px-4" aria-label="Ma'lumotlar" />
            <div role="tabpanel" className="tab-content px-4 py-4">
                <AddDoctorTab1 />
            </div>

            <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab text-secondary mx-5 "
                aria-label="Profile"
            />
            <div role="tabpanel" className="tab-content px-4 py-4">
                <AddDoctorTab2 />
            </div>

            <input type="radio" name="my_tabs_1" role="tab" className=" tab text-secondary mx-5" aria-label="Account" />
            <div role="tabpanel" className="tab-content px-4 ">
                <AddDoktorTab3 />
            </div>
            {/* <input type="radio" name="my_tabs_1" role="tab" className="tab  text-secondary mx-5" aria-label="Account" />
            <div role="tabpanel" className="tab-content px-2 ">
                <AddDoctorTab4 />

            </div> */}
        </div>
    )
}


