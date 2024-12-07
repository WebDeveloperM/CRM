import { Route, Routes } from "react-router-dom"

import AddDoctors from "./pages/Doctors"
import "./static/style.css"
import Doctors from "./pages/Doctors"

export default function DoctorsRoutes() {
   
    return (

        <Routes>
            <Route path="/*" element={<Doctors />} />
            <Route path="/add-doctors/*" element={<AddDoctors />} />
        </Routes>

    )
}
