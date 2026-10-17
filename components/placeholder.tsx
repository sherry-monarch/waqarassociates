const tones = [["#1B2A6B", "#0B1533"], ["#2F46A0", "#101F4A"], ["#16245F", "#0B1533"], ["#4A66C9", "#1B2A6B"]];
export function Placeholder({ i = 0, className = "" }: { i?: number; className?: string }) {
  const [a, b] = tones[i % tones.length];
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: `linear-gradient(160deg, ${a}, ${b})` }} role="img" aria-label="Project image placeholder">
      <div className="absolute inset-x-[12%] bottom-0 top-[22%] opacity-40" style={{ backgroundImage: "linear-gradient(90deg,#EAC22E22 1px,transparent 1px),linear-gradient(0deg,#EAC22E22 1px,transparent 1px)", backgroundSize: "22px 26px", border: "1px solid #EAC22E55" }} />
      <div className="absolute bottom-0 right-[10%] h-[48%] w-[22%] opacity-30" style={{ background: "#EAC22E", clipPath: "polygon(0 100%,0 30%,50% 0,100% 30%,100% 100%)" }} />
    </div>
  );
}
