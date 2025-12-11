import { useEffect, useState } from "react";
import KistChart from "./KistChart";

// localStorage helpers
const FORM_KEY = "loan_form_data";
const APPS_KEY = "loan_applications";
const LAST_APP_KEY = "last_loan_application";

function loadFormFromStorage() {
  try {
    const raw = localStorage.getItem(FORM_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveFormToStorage(form) {
  try {
    localStorage.setItem(FORM_KEY, JSON.stringify(form));
  } catch {}
}

function loadApplications() {
  try {
    const raw = localStorage.getItem(APPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveApplications(apps) {
  try {
    localStorage.setItem(APPS_KEY, JSON.stringify(apps));
  } catch {}
}

function saveLastApplication(app) {
  try {
    localStorage.setItem(LAST_APP_KEY, JSON.stringify(app));
  } catch {}
}

function loadLastApplication() {
  try {
    const raw = localStorage.getItem(LAST_APP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function generateTrackingId() {
  const rand = Math.floor(Math.random() * 9000 + 1000); // 4 digit
  return "LN" + Date.now().toString().slice(-6) + rand;
}

function LoanWizard() {
  const [step, setStep] = useState(1);
  const [loadingText, setLoadingText] = useState("Processing...");
  const [isProcessing, setIsProcessing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    loanAmount: "",
    aadhaar: "",
    pan: "",
  });

  const [minApproved, setMinApproved] = useState(0);
  const [maxApproved, setMaxApproved] = useState(0);
  const [selectedApproved, setSelectedApproved] = useState(0);

  const [currentApp, setCurrentApp] = useState(null); // for status view

  // First load form + last application from localStorage
  useEffect(() => {
    const stored = loadFormFromStorage();
    if (stored) setForm(stored);

    const last = loadLastApplication();
    if (last) {
      setCurrentApp(last);
    }
  }, []);

  // Save form to localStorage on change
  useEffect(() => {
    saveFormToStorage(form);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextFromStep1 = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert("Please enter name and phone number.");
      return;
    }
    setStep(2);
  };

  const handleNextFromStep2 = (e) => {
    e.preventDefault();
    if (!form.loanAmount || !form.aadhaar || !form.pan) {
      alert("Please fill loan amount, Aadhaar and PAN.");
      return;
    }

    const amount = Number(form.loanAmount);
    if (!amount || amount <= 0) {
      alert("Please enter a valid loan amount.");
      return;
    }

    // Start loader step
    setStep(3);
    setIsProcessing(true);
    setLoadingText("Processing...");

    // Change text every ~1.5 sec
    const messages = ["Processing...", "Authenticating...", "Proceeding..."];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingText(messages[index]);
    }, 1500);

    // After ~5-6 seconds, stop loader and compute approved range
    setTimeout(() => {
      clearInterval(interval);
      setIsProcessing(false);
      computeApprovedRange(amount);
      setStep(4);
    }, 5500);
  };

  const computeApprovedRange = (amount) => {
    const min = Math.round(amount * 0.4);
    const max = Math.round(amount * 0.9);
    const randomInitial =
      Math.floor(Math.random() * (max - min + 1)) + min;

    setMinApproved(min);
    setMaxApproved(max);
    setSelectedApproved(randomInitial);
  };

  const handleProceedToPayment = () => {
    // Create application with status "payment_pending"
    const apps = loadApplications();
    const trackingId = generateTrackingId();

    const newApp = {
      trackingId,
      form,
      approvedAmount: selectedApproved,
      createdAt: new Date().toISOString(),
      filingCharge: 299,
      paymentStatus: "pending",
      status: "payment_pending",
    };

    const updatedApps = [...apps, newApp];
    saveApplications(updatedApps);
    saveLastApplication(newApp);

    setCurrentApp(newApp);
    setStep(5);
  };

  const handleMockCashfreePayment = () => {
    // Yaha pe real Cashfree integration ka call hoga future me
    // Abhi ke liye simple success mock kar rahe hain
    const apps = loadApplications();
    if (!currentApp) return;

    const updatedApps = apps.map((a) =>
      a.trackingId === currentApp.trackingId
        ? {
            ...a,
            paymentStatus: "success",
            status: "paid",
            paidAt: new Date().toISOString(),
          }
        : a
    );

    saveApplications(updatedApps);

    const updatedCurrent = {
      ...currentApp,
      paymentStatus: "success",
      status: "paid",
      paidAt: new Date().toISOString(),
    };

    saveLastApplication(updatedCurrent);
    setCurrentApp(updatedCurrent);
    setStep(6);
  };

  const handleCheckStatusByTracking = () => {
    const id = prompt("Enter your Tracking ID:");
    if (!id) return;

    const apps = loadApplications();
    const found = apps.find(
      (a) => a.trackingId.toLowerCase() === id.toLowerCase()
    );
    if (!found) {
      alert("No application found with this Tracking ID.");
      return;
    }
    setCurrentApp(found);
    setStep(6);
  };

  // Steps UI
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-4">
      {/* Last application status small banner */}
      {currentApp && (
        <div className="mb-2 p-2 rounded-xl bg-slate-800/80 text-xs flex justify-between items-center">
          <div>
            <div className="text-slate-300">
              Last Tracking ID:{" "}
              <span className="font-mono text-emerald-300">
                {currentApp.trackingId}
              </span>
            </div>
            <div className="text-slate-400">
              Status:{" "}
              <span className="font-semibold">
                {currentApp.status === "paid"
                  ? "Paid / Completed"
                  : currentApp.status === "payment_pending"
                  ? "Payment Pending"
                  : currentApp.status}
              </span>
            </div>
          </div>
          <button
            onClick={() => setStep(6)}
            className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-300"
          >
            View Status
          </button>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Loan Application</span>
        <span>Step {step} / 6</span>
      </div>

      {/* STEP 1: Basic info */}
      {step === 1 && (
        <form
          onSubmit={handleNextFromStep1}
          className="space-y-3 text-sm"
        >
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              placeholder="Enter your mobile number"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold py-2 text-sm hover:bg-emerald-400"
          >
            Next
          </button>
        </form>
      )}

      {/* STEP 2: Loan details */}
      {step === 2 && (
        <form
          onSubmit={handleNextFromStep2}
          className="space-y-3 text-sm"
        >
          <div className="space-y-1">
            <label className="text-xs text-slate-400">
              Required Loan Amount (₹)
            </label>
            <input
              type="number"
              name="loanAmount"
              value={form.loanAmount}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              placeholder="Eg. 500000"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Aadhaar Number</label>
            <input
              type="text"
              name="aadhaar"
              value={form.aadhaar}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              placeholder="XXXX-XXXX-XXXX"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">PAN Number</label>
            <input
              type="text"
              name="pan"
              value={form.pan}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
              placeholder="ABCDE1234F"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 rounded-lg bg-slate-800 text-slate-200 py-2 text-sm border border-slate-600"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-emerald-500 text-slate-900 font-semibold py-2 text-sm hover:bg-emerald-400"
            >
              Next
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Loader */}
      {step === 3 && (
        <div className="py-6 flex flex-col items-center gap-3 text-sm">
          <div className="relative">
            <div className="h-14 w-14 rounded-full border-4 border-slate-700 border-t-emerald-400 animate-spin" />
          </div>
          <div className="text-emerald-300 font-semibold">
            {loadingText}
          </div>
          <div className="text-xs text-slate-400 text-center max-w-xs">
            We are simulating your loan processing. This may take 5–6
            seconds…
          </div>
        </div>
      )}

      {/* STEP 4: Approved amount + range slider */}
      {/* STEP 4: Approved amount + range slider */}
{step === 4 && (
  <div className="space-y-4 text-sm">
    <div>
      <div className="text-xs text-slate-400 mb-1">
        Based on your requested amount:
      </div>
      <div className="flex justify-between text-xs">
        <span>Requested: ₹{Number(form.loanAmount).toLocaleString()}</span>
        <span>
          Approx Range: ₹{minApproved.toLocaleString()} – ₹
          {maxApproved.toLocaleString()}
        </span>
      </div>
    </div>

    <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-500/30">
      <div className="text-xs text-slate-400 mb-1">
        Selected Approved Amount
      </div>
      <div className="text-2xl font-semibold text-emerald-300">
        ₹{selectedApproved.toLocaleString()}
      </div>
    </div>

    <div className="space-y-1">
      <input
        type="range"
        min={minApproved}
        max={maxApproved}
        value={selectedApproved}
        onChange={(e) => setSelectedApproved(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[11px] text-slate-400">
        <span>Min: ₹{minApproved.toLocaleString()}</span>
        <span>Max: ₹{maxApproved.toLocaleString()}</span>
      </div>
    </div>

    {/* ===== Kist Chart Inserted HERE ===== */}
    <KistChart principal={Number(selectedApproved)} monthlyRate={0.02} tenures={[3,6,12,24,36]} />
    {/* ===== end chart ===== */}

    <div className="flex gap-2 pt-2">
      <button
        type="button"
        onClick={() => setStep(2)}
        className="w-1/3 rounded-lg bg-slate-800 text-slate-200 py-2 text-sm border border-slate-600"
      >
        Back
      </button>
      <button
        type="button"
        onClick={handleProceedToPayment}
        className="flex-1 rounded-lg bg-emerald-500 text-slate-900 font-semibold py-2 text-sm hover:bg-emerald-400"
      >
        Proceed (Pay Filing Charge)
      </button>
    </div>
  </div>
)}


      {/* STEP 5: Filing charge + fake Cashfree button */}
      {step === 5 && currentApp && (
        <div className="space-y-4 text-sm">
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Tracking ID</div>
            <div className="font-mono text-emerald-300 text-sm">
              {currentApp.trackingId}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="text-xs text-slate-400">Filing Charge</div>
            <div className="text-lg font-semibold text-emerald-300">
              ₹{currentApp.filingCharge}
            </div>
            <div className="text-xs text-slate-400">
              This is a demo. In real app, Cashfree payment page will open here.
            </div>
          </div>

          <button
            type="button"
            onClick={handleMockCashfreePayment}
            className="w-full rounded-lg bg-emerald-500 text-slate-900 font-semibold py-2 text-sm hover:bg-emerald-400"
          >
            Pay ₹299 with Cashfree (Mock)
          </button>

          <button
            type="button"
            onClick={() => setStep(6)}
            className="w-full rounded-lg bg-slate-800 text-slate-200 py-2 text-xs border border-slate-600"
          >
            Skip to Status View
          </button>
        </div>
      )}

      {/* STEP 6: Status view */}
      {step === 6 && currentApp && (
        <div className="space-y-3 text-sm">
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Tracking ID</div>
            <div className="font-mono text-emerald-300 text-sm">
              {currentApp.trackingId}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="text-xs text-slate-400">Application Status</div>
            <div className="text-base font-semibold">
              {currentApp.status === "paid"
                ? "Payment Successful"
                : currentApp.status === "payment_pending"
                ? "Payment Pending"
                : currentApp.status}
            </div>
            <div className="text-xs text-slate-400">
              Payment Status:{" "}
              <span className="font-semibold text-emerald-300">
                {currentApp.paymentStatus}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Approved Amount:{" "}
              <span className="font-semibold text-emerald-300">
                ₹{currentApp.approvedAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="text-xs text-slate-400">Applicant</div>
            <div>
              {currentApp.form.name} • {currentApp.form.phone}
            </div>
            <div className="text-xs text-slate-400">
              Loan Request: ₹
              {Number(currentApp.form.loanAmount).toLocaleString()}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full rounded-lg bg-emerald-500 text-slate-900 font-semibold py-2 text-sm hover:bg-emerald-400"
          >
            Start New Application
          </button>

          <button
            type="button"
            onClick={handleCheckStatusByTracking}
            className="w-full rounded-lg bg-slate-800 text-slate-200 py-2 text-xs border border-slate-600"
          >
            Check Status by another Tracking ID
          </button>
        </div>
      )}
    </div>
  );
}

export default LoanWizard;
