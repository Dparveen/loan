function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/80">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between text-xs text-slate-400">
        <span>© {new Date().getFullYear()} LoanX. All rights reserved.</span>
        <span>Made for demo / testing only.</span>
      </div>
    </footer>
  );
}

export default Footer;
