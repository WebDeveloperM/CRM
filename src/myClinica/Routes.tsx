import { Route, Routes } from "react-router-dom"
import "./static/style.css"
import MyClinica from "./pages/MyClinica"

export default function MyClinicaRoutes() {

    return (

        <Routes>
            <Route path="/*" element={<MyClinica />} />
        </Routes>


    )
}
