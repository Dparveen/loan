function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      <h2 className="text-2xl font-semibold mb-2">About Us</h2>
      <p className="text-slate-300 text-sm">
        This is a demo loan website built in React. It shows how you can create
        a multi-step loan form, fake processing & payment, and store everything
        in localStorage with a tracking ID.
      </p>
      <p className="text-slate-400 text-sm">
        In real production, you would connect this front-end with a backend
        service, real KYC & bureau checks, and integrate an actual Cashfree
        payment gateway using secure APIs.
      </p>
    </div>
  );
}

export default AboutPage;
