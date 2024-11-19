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
        <div className="h-full">
            <Sidebar open={open} setOpen={setOpen} />
            <Header open={open} setOpen={setOpen} link={link} />
            <div className={`w-full mt-[105px] pt-0.5 duration-300  ${open ? "md:ml-64 md:max-w-[calc(100%-256px)]" : "md:ml-20 md:max-w-[calc(100%-80px)]"}`}>
                {children}
            </div>

        </div>
    )
}
