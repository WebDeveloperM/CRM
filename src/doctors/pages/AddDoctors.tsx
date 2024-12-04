import Layout from "@core/components/Layout";
import { useState } from "react";
import AddDoctorsTab from "@doctors/components/AddDocotorTabs/AddDoctorsTab";
import { Navigate } from "react-router-dom";
import { isCheckClinic } from "@users/utils/auth";

export default function AddDoctors() {
    const [open, setOpen] = useState(true);
    if (!isCheckClinic()) {
        return <Navigate to='/clinica' />
    }
    return (
        <>
            <Layout open={open} setOpen={setOpen}>
                <div className="overflow-x-auto bg-white rounded-md text-gray-700  h-full pb-5 overflow-y-scroll 2xl:m-5 m-3 ">
                    <AddDoctorsTab />
                </div>
            </Layout>
        </>
    )
}
