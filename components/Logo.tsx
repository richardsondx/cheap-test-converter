export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="TestRung logo"
    >
      <rect width="48" height="48" rx="11" fill="#2563eb" />
      <rect x="11" y="13" width="26" height="4.5" rx="2.25" fill="#ffffff" />
      <rect x="11" y="21.75" width="19" height="4.5" rx="2.25" fill="#ffffff" />
      <rect x="11" y="30.5" width="12" height="4.5" rx="2.25" fill="#ffffff" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <LogoMark size={32} />
      <span className="wordmark-text">
        Test<span className="wordmark-accent">Rung</span>
      </span>
    </span>
  );
}
