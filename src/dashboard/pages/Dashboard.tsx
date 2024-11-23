import Layout from "@core/components/Layout"
import { useState } from "react"
import Main from "../components/Main"
import { isAuthenticated } from "@users/utils/auth.ts"
import { Navigate } from "react-router-dom"

export default function Dashboard() {
    const [open, setOpen] = useState(true)

    if (!isAuthenticated()) {
        return <Navigate to="/" />
    }

    return (
        <Layout open={open} setOpen={setOpen}>
            <Main />
        </Layout>
    )
}
