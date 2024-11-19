import Layout from "@core/components/Layout";
import { useState } from "react";

import AddDoctorsTab from "../components/AddDocotorTabs/AddDoctorsTab";

export default function AddDoctors() {
    const [open, setOpen] = useState(true);

    return (
        <>
            <Layout open={open} setOpen={setOpen}>
                <div className="overflow-x-auto bg-white rounded-md text-gray-700  h-full pb-5 overflow-y-scroll 2xl:m-5 m-3 ">
                    {/* <div className="flex items-center justify-between px-4 2xl:px-5 pt-3">
                        <h4 className="text-sm font-semibold">Add Doctors</h4>
                    </div> */}

                    <AddDoctorsTab />
                </div>
            </Layout>
        </>
    )
}
