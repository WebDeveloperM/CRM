import Layout from "@core/components/Layout";
import { useState } from "react";
import clinica from "../static/clinica.jpg"
import { Link, NavLink } from "react-router-dom";

export default function Clinica() {
    const [open, setOpen] = useState(true);
    // const [filter, setFilter] = useState(false);


    return (
        <>
            <Layout open={open} setOpen={setOpen}>

                <div className="overflow-x-auto bg-white rounded-md text-gray-700 z-[-1] h-full pb-5 overflow-y-scroll 2xl:m-5 m-3 ">

                    <div className="grid grid-cols-2">
                        <div className="flex justify-center">
                            <img src={clinica} alt="" className="w-[80%]" />
                        </div>
                        <div className="text-center mt-[24%]">
                            <h1 className="">Shifoxonangizni ro'yxatdan o'tkazing.</h1>
                            <p className="mt-2 mb-4">Tizimdan foydalana olishingiz uchun shifoxona qo'shing</p>
                            <NavLink to="plus-clinica" className="bg-secondary py-2 hover:bg-secondary/90 text-white px-3 rounded-md">Shifoxona qo'shish</NavLink>
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}
