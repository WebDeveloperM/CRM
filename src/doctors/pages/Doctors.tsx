import Layout from "@core/components/Layout";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isCheckClinic } from "@users/utils/auth";
import DoctorsTab from "@doctors/components/AddDocotorTabs/DoctorsTab";

export default function Doctors() {
    const [open, setOpen] = useState(true);
    
    if (!isAuthenticated()) {
        return <Navigate to="/" />
    }
    if (!isCheckClinic()) {
        return <Navigate to='/clinica' />
    }


    return (
        <>
            <Layout open={open} setOpen={setOpen}>
                <div className="overflow-x-auto bg-white rounded-md text-gray-700  h-full pb-5 overflow-y-scroll 2xl:m-5 m-3 ">
                    <DoctorsTab />
                </div>
            </Layout>
        </>
    )
}
