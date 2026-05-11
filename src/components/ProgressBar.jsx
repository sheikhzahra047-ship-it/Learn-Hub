export default function ProgressBar({ value, className = "" }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}>
      <div
        className="h-full rounded-full bg-brand-500 transition-all"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
