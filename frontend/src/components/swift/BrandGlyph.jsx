import React from "react";

/**
 * SwiftResolwe brand glyph: two converging strokes (parties) merge into
 * a swift chevron (resolution). Geometric, minimal, balanced.
 */
export default function BrandGlyph({ size = 36, className = "", animate = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`swift-glyph ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="swiftGlyphGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0E7490" />
        </linearGradient>
      </defs>
      {/* Two incoming strokes (parties) */}
      <path
        d="M3 9 L17 20"
        stroke="url(#swiftGlyphGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="40"
        strokeDashoffset={animate ? 40 : 0}
        style={animate ? { animation: "glyph-draw 700ms ease-out 100ms forwards" } : undefined}
      />
      <path
        d="M3 31 L17 20"
        stroke="url(#swiftGlyphGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="40"
        strokeDashoffset={animate ? 40 : 0}
        style={animate ? { animation: "glyph-draw 700ms ease-out 250ms forwards" } : undefined}
      />
      {/* Unified forward chevron (resolution) */}
      <path
        d="M16 9 L33 20 L16 31"
        stroke="url(#swiftGlyphGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="80"
        strokeDashoffset={animate ? 80 : 0}
        style={animate ? { animation: "glyph-draw 800ms ease-out 500ms forwards" } : undefined}
      />
      <style>{`
        .swift-glyph { transition: transform .35s ease, filter .35s ease; }
        .group:hover .swift-glyph, a:hover .swift-glyph, button:hover .swift-glyph {
          transform: translateX(2px);
          filter: drop-shadow(0 0 10px rgba(6,182,212,.45));
        }
      `}</style>
    </svg>
  );
}
