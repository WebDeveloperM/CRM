import Layout from "@core/components/Layout";
import { useState } from "react";
import CheckoutStepper from "../components/CheckoutStepper";
// import AddClinicaTab from "../components/AddClinicaTabs/AddClinicaTab";



export default function AddClinice() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Layout open={open} setOpen={setOpen} >

        <div className="overflow-x-auto bg-white  rounded-md text-gray-700  pb-5 overflow-y-scroll 2xl:m-5">
          <CheckoutStepper />
        </div>
      </Layout>
    </>
  )
}