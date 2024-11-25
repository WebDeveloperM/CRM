import Layout from "@core/components/Layout";
import { useState } from "react";
import CheckoutStepper from "../components/CheckoutStepper";
// import AddClinicaTab from "../components/AddClinicaTabs/AddClinicaTab";

const CHECKOUT_STEPS = [
  {
    name: "Umumiy ma'lumotlar",
    Component: () => <div>Info 1</div>
  },
  {
    name: "Profile",
    Component: () => <div>Profile</div>
  },
  {
    name: "Ish vaqti",
    Component: () => <div>Info 1</div>
  },
  {
    name: "Account",
    Component: () => <div>Info 1</div>
  }
]

export default function AddClinice() {
  const [open, setOpen] = useState(true);
  // const [filter, setFilter] = useState(false);

  return (
    <>
      <Layout open={open} setOpen={setOpen} >

        <div className="overflow-x-auto bg-white -z-[-10] rounded-md text-gray-700  h-full pb-5 overflow-y-scroll 2xl:m-5 m-3 ">
          {/* <AddClinicaTab /> */}

          <CheckoutStepper />

        </div>
      </Layout>
    </>
  )
}
