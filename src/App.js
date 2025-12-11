import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LandingPage from "./pages/LandingPage";
import ServicesPage from "./pages/ServicesPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
