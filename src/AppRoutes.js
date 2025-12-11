import { Routes, Route, Navigate } from "react-router-dom";
import PharmacyRoutes from "./modules/pharmacy/pharmacyRoutes";
import NotFound from "./component/pages/NotFound";
import BaseRoute from "./baseRoute";
import BloodBankRoutes from "./modules/bloodbank/bloodbankRoute";
import RadioRoutes from "./modules/radiology/RadioRoutes";
import PathRoutes from "./modules/pathology/PathRoutes";
import ReceptionRoutes from "./modules/reception/ReceptionRoutes";
import PatientprocessRoutes from "./modules/patientprocess/PatientprocessRoutes";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BaseRoute />} />
      <Route path="/modules/pharmacy/*" element={<PharmacyRoutes />} />
      <Route path="/modules/radiology/*" element={<RadioRoutes />} />
      <Route path="/modules/pathology/*" element={<PathRoutes />} />
      <Route path="/modules/reception/*" element={<ReceptionRoutes />} />
      <Route path="/modules/patientprocess/*" element={<PatientprocessRoutes />} />
      <Route path="/modules/bloodbank/*" element={<BloodBankRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
