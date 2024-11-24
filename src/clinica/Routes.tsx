import { Route, Routes } from "react-router-dom"
import Clinica from "./pages/Clinica"
import PlusClinice from "./pages/AddClinice"


export default function ClinicaRoutes() {

    return (

        <Routes>
            <Route path="/*" element={<Clinica />} />
            <Route path="/plus-clinica/*" element={<PlusClinice />} />
        </Routes>


    )
}
