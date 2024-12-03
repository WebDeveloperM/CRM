import { Route, Routes } from "react-router-dom"
import Clinica from "@clinica/pages/Clinica"
import AddClinice from "@clinica/pages/AddClinica"
import "./static/style.css"
import MyClinica from "./pages/MyClinica"

export default function ClinicaRoutes() {

    return (

        <Routes>
            <Route path="/*" element={<Clinica />} />
            <Route path="/add-clinica/*" element={<AddClinice />} />
            <Route path="/my-clinica/*" element={<MyClinica />} />
        </Routes>


    )
}
