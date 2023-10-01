import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../src/Components/Navbar"
import Front from "./Components/Front"
import RegisterPetOwner from "./Components/register-petOwner";
import RegisterPetRenters from "./Components/register-petRenters";
import PetKeeperLogin from "./Components/keeperLogin";
import PetOwnerDash from "./Components/petOwner-dash";
import PetRenterDash from "./Components/petRenters-dash";
import PetOwnerLogin from "./Components/petOwnerLogin";

export default function App() {
  return (
    <Router>

      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/petOwner-register" element={<RegisterPetOwner />} />
        <Route path="/petKeeper-register" element={<RegisterPetRenters />} />

        <Route path="/petKeeper-Login" element={<PetKeeperLogin />} />
        <Route path="/petOwner-Login" element={<PetOwnerLogin />} />
        <Route path="/petOwner-Dash" element={<PetOwnerDash />} />
        <Route path="/petKeeper-Dash" element={<PetRenterDash />} />
      </Routes>
    </Router>
  )
}