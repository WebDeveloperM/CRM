import Layout from "@core/components/Layout";
import { useState } from "react";
import AddClinicaTab from "../components/AddClinicaTabs/AddClinicaTab";

export default function AddClinice() {
  const [open, setOpen] = useState(true);
  // const [filter, setFilter] = useState(false);


  return (
    <>
      <Layout open={open} setOpen={setOpen}>

        <div className="overflow-x-auto bg-white rounded-md text-gray-700 z-[-1] h-full pb-5 overflow-y-scroll 2xl:m-5 m-3 ">
          <AddClinicaTab />
        </div>
      </Layout>
    </>
  )
}
