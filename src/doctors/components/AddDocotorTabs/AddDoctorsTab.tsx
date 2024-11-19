import AddDoctorTab1 from "./AddDoctorTab1";
import AddDoctorTab2 from "./AddDoctorTab2";
import AddDoctorTab3 from "./AddDoctorTab3";
import AddDoctorTab4 from "./AddDoctorTab4";

export default function AddDoctorsTab() {
    return (
        <div role="tablist" className="tabs tabs-bordered mt-2 overflow-x-auto scrollbar-thin ">

            <input type="radio" name="my_tabs_1" defaultChecked role="tab" className="tab text-secondary ml-3" aria-label="Shaxsiy ma'lumotlar" />
            <div role="tabpanel" className="tab-content px-4 py-2">
                <AddDoctorTab1 />
            </div>

            <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab text-secondary"
                aria-label="Profile"
            />
            <div role="tabpanel" className="tab-content px-4 py-2">
                <AddDoctorTab2 />
            </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab text-secondary" aria-label="Ish vaqti" />
            <div role="tabpanel" className="tab-content px-4 py-2">
                <AddDoctorTab3 />
            </div>
            <input type="radio" name="my_tabs_1" role="tab" className="tab text-secondary" aria-label="Account" />
            <div role="tabpanel" className="tab-content px-4 py-2">
                <AddDoctorTab4 />

            </div>
        </div>
    )
}


