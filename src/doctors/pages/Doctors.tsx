import Layout from "@core/components/Layout";
import { useState } from "react";
import Table from "../components/Table";
import { Link } from "react-router-dom";

export default function Doctors() {
    const [open, setOpen] = useState(true);
    const [search, setSearch] = useState<string>("")

    return (
        <>
            <Layout open={open} setOpen={setOpen}>

                <div className="overflow-x-auto bg-white rounded-md text-gray-700  h-full pb-5 overflow-y-scroll 2xl:m-5 m-3 ">
                    <div className="flex items-center justify-between px-3 2xl:px-5 pt-3">
                        <h4 className="text-lg font-semibold">Shifokorlar ro'yxati</h4>
                        <Link to="/doctors/add-doctors" className="bg-secondary hover:bg-secondary/80 duration-200 hover:text-white hover:no-underline text-white px-3 py-1 rounded-md" >
                            Shifokor qo'shish
                        </Link>
                    </div>


                    <form className="m-[2px] mb-3 mr-3 mt-4 float-right flex items-center gap-2">
                        <span>Search</span>
                        <label htmlFor="inputSearch" className="sr-only">Search </label>
                        <input id="inputSearch" placeholder="Search by name" type="text" onChange={(e) => setSearch(e.target.value)} className="block w-48 2xl:w-64 rounded-lg border px-2 py-1  text-sm focus:border-secondary/50 focus:outline-none focus:ring-1 focus:ring-secondary/50" />
                    </form>

                    <div className="clear-both"></div>
                    <Table search={search} />
                </div>
            </Layout>
        </>
    )
}
