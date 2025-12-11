import { Link, useLocation } from "react-router-dom";

const navLinkClass = (isActive) =>
  `px-3 py-1 rounded-full text-sm ${
    isActive ? "bg-emerald-500 text-slate-900" : "text-slate-300 hover:text-white"
  }`;

function Navbar() {
  const location = useLocation();

  return (
    <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold text-xl">LoanX</span>
          <span className="text-xs text-slate-400">Instant Loan Check</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            to="/"
            className={navLinkClass(location.pathname === "/")}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={navLinkClass(location.pathname === "/services")}
          >
            Our Services
          </Link>
          <Link
            to="/about"
            className={navLinkClass(location.pathname === "/about")}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={navLinkClass(location.pathname === "/contact")}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
