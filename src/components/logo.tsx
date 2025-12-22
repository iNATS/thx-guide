
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-label="Timimoun Oasis Guide Logo"
      {...props}
    >
      <defs>
        <clipPath id="circle-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>
      <g clipPath="url(#circle-clip)">
        <rect width="100" height="100" fill="hsl(var(--card))" />
        
        {/* Sun */}
        <circle cx="50" cy="40" r="15" fill="hsl(var(--primary))" />
        
        {/* Sun Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="40"
            x2={50 + 25 * Math.cos(angle * Math.PI / 180)}
            y2={40 + 25 * Math.sin(angle * Math.PI / 180)}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {/* Dunes */}
        <path
          d="M0,85 Q25,60 50,85 T100,85 V100 H0 Z"
          fill="hsl(var(--primary) / 0.7)"
        />
        <path
          d="M-20,90 Q10,70 40,90 T80,90 T120,90 V100 H-20 Z"
          fill="hsl(var(--primary) / 0.4)"
        />
      </g>
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="2"
      />
    </svg>
  );
}
