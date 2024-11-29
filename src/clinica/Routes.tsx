import { Route, Routes } from "react-router-dom"
import Clinica from "@clinica/pages/Clinica"
import AddClinice from "@clinica/pages/AddClinice"
import "./static/style.css"

export default function ClinicaRoutes() {

    return (

        <Routes>
            <Route path="/*" element={<Clinica />} />
            <Route path="/add-clinica/*" element={<AddClinice />} />
        </Routes>


    )
}
