import Layout from "@core/components/Layout";
import { useState } from "react";
import Main from "../components/Main";
import { isAuthenticated } from "@users/utils/auth";

export default function Dashboard() {
    const [open, setOpen] = useState(true);
    // const navigate = useNavigate()

    console.log(isAuthenticated());
    
    // if (!isAuthenticated()) navigate('/')

    return (

        <>
            <Layout open={open} setOpen={setOpen}>
                <Main />
            </Layout>

        </>

    )
}
