import { Route, Routes } from "react-router-dom"
import Clinica from "./pages/Clinica"
import AddClinice from "./pages/AddClinice"



export default function ClinicaRoutes() {

    return (

        <Routes>
            <Route path="/*" element={<Clinica />} />
            <Route path="/add-clinica/*" element={<AddClinice />} />
        </Routes>


    )
}