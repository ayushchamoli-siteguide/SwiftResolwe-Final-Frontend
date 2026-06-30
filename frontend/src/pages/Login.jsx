import React from "react";
import { Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="relative pt-32 md:pt-40 pb-32 min-h-[80vh] bg-radial-cyan" data-testid="login-page">
      <div className="max-w-md mx-auto px-5 sm:px-8 text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[color:rgba(6,182,212,0.12)] flex items-center justify-center text-[color:var(--accent-deep)] mb-6">
          <Lock size={22} />
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
          Secure Portal
        </div>
        <h1 className="font-display text-[34px] md:text-[44px] font-semibold leading-tight tracking-tight text-[color:var(--text-primary)]">
          Access opening shortly.
        </h1>
        <p className="mt-5 text-[15.5px] leading-[1.7] text-[color:var(--text-secondary)]">
          The SwiftResolwe portal for registered parties and empanelled neutrals is in final
          calibration. We will notify you as soon as access opens.
        </p>
        <Link
          to="/"
          data-testid="login-back-home"
          className="cta-secondary inline-flex items-center gap-2 mt-9 px-6 py-3 rounded-full text-[14.5px] font-semibold"
        >
          <ArrowLeft size={15} />
          Back to home
        </Link>
      </div>
    </main>
  );
}
