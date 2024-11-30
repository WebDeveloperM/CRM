import AddDoctorTab1 from "@doctors/components/AddDocotorTabs/AddDoctorTab1";
import AddDoctorTab2 from "@doctors/components/AddDocotorTabs/AddDoctorTab2";
import AddDoctorTab3 from "@doctors/components/AddDocotorTabs/AddDoctorTab3";
// import AddDoctorTab4 from "@doctors/components/AddDocotorTabs/AddDoctorTab4";


export default function AddDoctorsTab() {
    return (
        <div role="tablist" className="tabs tabs-bordered mt-2 overflow-x-auto scrollbar-thin ml-2 pt-2">

            <input type="radio" name="my_tabs_1" defaultChecked role="tab" className="tab text-secondary  ml-3 mx-5" aria-label="Ma'lumotlar" />
            <div role="tabpanel" className="tab-content px-2 py-2">
                <AddDoctorTab1 />
            </div>

            <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab text-secondary mx-5 "
                aria-label="Profile"
            />
            <div role="tabpanel" className="tab-content px-2 py-2">
                <AddDoctorTab2 />
            </div>

            <input type="radio" name="my_tabs_1" role="tab" className=" tab text-secondary mx-5" aria-label="Account" />
            <div role="tabpanel" className="tab-content px-2 ">
                <AddDoctorTab3 />
            </div>
            {/* <input type="radio" name="my_tabs_1" role="tab" className="tab  text-secondary mx-5" aria-label="Account" />
            <div role="tabpanel" className="tab-content px-2 ">
                <AddDoctorTab4 />

            </div> */}
        </div>
    )
}


