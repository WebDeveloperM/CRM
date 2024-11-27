import Layout from "@core/components/Layout";
import { useState } from "react";
import CheckoutStepper from "../components/CheckoutStepper";
// import AddClinicaTab from "../components/AddClinicaTabs/AddClinicaTab";



export default function AddClinice() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Layout open={open} setOpen={setOpen}>

        <div className=" bg-secondary-light/80 md:max-w-[97%] 2xl:w-full mx-auto bg-white h-[80vh] overflow-y-auto rounded-md text-gray-700 pb-5 mt-[15px] 2xl:mx-5">
          <CheckoutStepper />
        </div>
      </Layout>
    </>
  )
}
