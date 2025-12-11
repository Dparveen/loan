import LoanWizard from "../components/LoanWizard";

function LandingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid gap-12">
      {/* =================== HERO SECTION =================== */}
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        {/* Left: Hero text */}
        <div className="space-y-5">
          <p className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs">
            Instant loan eligibility check • No actual disbursal
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-snug">
            Check your{" "}
            <span className="text-emerald-400">loan eligibility</span> instantly.
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Enter your basic details and instantly simulate your loan approval.  
            Get a sample approved amount between <b>40–90%</b> of your requested loan.  
            All data stays securely in your browser (localStorage) with a unique tracking ID.
          </p>

          <div className="grid gap-3 text-xs text-slate-400">
            <div>✓ Multi-step guided loan application</div>
            <div>✓ Smart processing animation (Processing → Authenticating → Proceeding)</div>
            <div>✓ Adjustable approved loan amount slider</div>
            <div>✓ ₹299 filing charge with real payment gateway integration</div>
            <div>✓ Auto-tracking via unique tracking ID</div>
          </div>
        </div>

        {/* Right: Loan Wizard */}
        <LoanWizard />
      </div>

      {/* =================== LOAN CATEGORY SECTION =================== */}
      <div className="grid gap-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Explore Our Loan Categories
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* PERSONAL LOAN */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-emerald-400/40 transition">
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&w=800&q=60"
              className="rounded-xl w-full h-40 object-cover"
              alt="Personal Loan"
            />
            <h3 className="text-xl font-semibold text-emerald-400">
              Personal Loan
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Get instant personal loan approvals with minimal documentation and quick processing.
              Perfect for emergencies, travel, education, or any personal need.
            </p>

            <ul className="text-xs text-slate-400 space-y-1">
              <li>• No collateral required</li>
              <li>• Quick approval simulation</li>
              <li>• Flexible loan range: ₹10,000 – ₹10,00,000</li>
            </ul>
          </div>

          {/* HOME LOAN */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-emerald-400/40 transition">
            <img
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&w=800&q=60"
              className="rounded-xl w-full h-40 object-cover"
              alt="Home Loan"
            />
            <h3 className="text-xl font-semibold text-emerald-400">
              Home Loan
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Planning a new house? Check your home loan eligibility instantly with our simulator.
              Get an estimated approval amount and track progress in real-time.
            </p>

            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Low interest possibilities</li>
              <li>• Long repayment tenures</li>
              <li>• Loan range: ₹5,00,000 – ₹5,00,00,000</li>
            </ul>
          </div>

          {/* GOLD LOAN */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-emerald-400/40 transition">
            <img
              src="https://images.unsplash.com/photo-1611078489935-0cb9640f32e0?auto=format&w=800&q=60"
              className="rounded-xl w-full h-40 object-cover"
              alt="Gold Loan"
            />
            <h3 className="text-xl font-semibold text-emerald-400">
              Gold Loan
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Unlock the value of your gold instantly. Fast eligibility check and secure
              evaluation powered by our loan simulator.
            </p>

            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Lowest processing time</li>
              <li>• High loan-to-value percentage</li>
              <li>• Loan range depends on gold valuation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* =================== WHY CHOOSE US =================== */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 mt-6 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Why Choose Our Loan Simulator?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4 space-y-2">
            <div className="text-emerald-300 text-4xl">⚡</div>
            <h4 className="text-lg font-semibold">Instant Calculations</h4>
            <p className="text-slate-400 text-sm">
              Get quick loan estimates within seconds.
            </p>
          </div>

          <div className="p-4 space-y-2">
            <div className="text-emerald-300 text-4xl">🛡️</div>
            <h4 className="text-lg font-semibold">Secure & Private</h4>
            <p className="text-slate-400 text-sm">
              All information stays in your device locally.
            </p>
          </div>

          <div className="p-4 space-y-2">
            <div className="text-emerald-300 text-4xl">📊</div>
            <h4 className="text-lg font-semibold">Smart Range Adjuster</h4>
            <p className="text-slate-400 text-sm">
              Adjust your approved amount (40–90%) with precision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
