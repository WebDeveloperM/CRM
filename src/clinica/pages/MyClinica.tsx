import MyClinicaTable from "@clinica/components/MyClinicaTable";
import Layout from "@core/components/Layout";
import { useState } from "react";

export default function MyClinica() {
    const [open, setOpen] = useState(true);


    return (
        <Layout open={open} setOpen={setOpen}>
            <div className=" bg-secondary-light/80 md:max-w-[97%] 2xl:w-full mx-auto bg-white h-[80vh] overflow-y-auto rounded-md text-gray-700 pb-5 mt-[15px] 2xl:mx-5">
                <div className="overflow-x-auto bg-white rounded-md text-gray-700  h-full pb-5 overflow-y-scroll 2xl:m-5 m-3 p-3">
                    <div className="flex items-center justify-start  pt-3 mb-5">
                        <h4 className="text-lg font-semibold">Mening shifoxonam</h4>
                    </div>




                    <div className="clear-both"></div>
                    <MyClinicaTable />
                </div>
            </div>
        </Layout>
    )
}