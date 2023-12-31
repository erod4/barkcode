import "./style.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing-Page_Component/Landing";
import Login from "./Components/Login-Component/Login";
import Register from "./Components/Register-Component/Register";
import NotFound from "./Components/NotFound-component/NotFound";
import ForgotPassword from "./Components/ForgotPassComponent/ForgotPassword";
import Home from "./Components/Home-components/Home";
import ManagePets from "./Components/ManagePets-Component/ManagePets";

import AddPet from "./Components/Add-Pet Component/AddPet";
import AddAlert from "./Components/AddAlert-Component/AddAlert";
import PetProfile from "./Components/PetProfile-Component/PetProfile";

import QRCode from "./Components/QRCodeComponent/QRCode";
import Resources from "./Components/Resources Component/Resources";
import Settings from "./Components/Settings Component/Settings";
import LocationRequest from "./Components/Location Request Component/LocationRequest";
import EditPetProfile from "./Components/Edit-Pet_profile/EditPetProfile";
import EnterCode from "./Components/ForgotPassComponent/EnterCode";
import NewPassword from "./Components/ForgotPassComponent/NewPassword";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/location" element={<LocationRequest />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/edit-profile/:id" element={<EditPetProfile />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/enter-code" element={<EnterCode />}></Route>
        <Route path="/new-password" element={<NewPassword />}></Route>
        <Route path="/manage-pets/" element={<ManagePets />}></Route>
        <Route path="/resources" element={<Resources />}></Route>
        <Route path="/pet-profile/:id" element={<PetProfile />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/qr" element={<QRCode />}></Route>
        <Route path="/add-pet" element={<AddPet />}></Route>
        <Route path="/create-alert" element={<AddAlert />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
