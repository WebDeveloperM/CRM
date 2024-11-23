import Layout from "@core/components/Layout";
import { useState } from "react";
import Main from "../components/Main";

export default function Dashboard() {
    const [open, setOpen] = useState(true);

    return (

        <>
            <Layout open={open} setOpen={setOpen}>
                <Main />
            </Layout>

        </>

    )
}
