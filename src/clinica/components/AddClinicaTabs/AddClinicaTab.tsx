import AddClinicaTab1 from "./AddClinicaTab1";
import AddClinicaTab4 from "./AddClinicaTab4";
import AddClinicaTab2 from "./AddClinicaTab2";
import AddClinicaTab3 from "./AddClinicaTab3";

export default function AddClinicaTab() {
    return (
        <div role="tablist" className="tabs tabs-bordered text-sm mt-2 overflow-x-auto scrollbar-thin pt-3 ">

            <input type="radio" name="my_tabs_1" defaultChecked role="tab" className="tab text-secondary text-base px-4 ml-3 " aria-label="Umumiy ma'lumotlar" />
            <div role="tabpanel" className="tab-content px-4 py-2">
                <AddClinicaTab1 />
            </div>

            <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab text-secondary px-4 text-base"
                aria-label="Profile"
            />
            <div role="tabpanel" className="tab-content px-4 py-2">
                <AddClinicaTab2 />
            </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab text-secondary text-base px-4" aria-label="Ish vaqti" />
            <div role="tabpanel" className="tab-content px-4 py-2">
                <AddClinicaTab3 />
            </div>
            <input type="radio" name="my_tabs_1" role="tab" className="tab text-secondary text-base px-4" aria-label="Account" />
            <div role="tabpanel" className="tab-content px-4 py-2">
                <AddClinicaTab4 />

            </div>
        </div>
    )
}


