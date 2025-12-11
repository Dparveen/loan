import { Routes, Route } from "react-router-dom";
import Dashboard from "./component/pages/Dashboard";
export default function BaseRoute() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}
