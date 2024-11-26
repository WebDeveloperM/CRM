import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import Header from "@core/components/Header"
import Sidebar from "@core/components/Sidebar"

type Props = {
    children: ReactNode,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}



export default function Layout({ children, open, setOpen }: Props) {
    const [link] = useState<string>("Dashboard")
    return (
        <div className="scrollbar-thin h-[100vh]  z-[10]">
            <Sidebar open={open} setOpen={setOpen} />
            <Header open={open} setOpen={setOpen} link={link} />
            <div className={`w-[95%] bg-secondary-light/80 mx-auto pb-5 mt-[105px] pt-1 duration-300  ${open ? "md:ml-64 md:max-w-[calc(100%-256px)]" : "md:ml-20 md:max-w-[calc(100%-80px)]"}`}>
                {children}
            </div>

        </div>
    )
}
