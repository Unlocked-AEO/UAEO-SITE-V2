import { leaderboard } from "@/data/mock-dashboard";
import type { LeaderboardEntry } from "@/data/mock-dashboard";
import { useCountUp } from "@/hooks/useCountUp";

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const animatedScore = useCountUp(entry.score, 1400);
  const barColor = entry.isUser
    ? "bg-teal"
    : entry.rank <= 2
      ? "bg-navy"
      : "bg-slate-muted";
  const trackColor = entry.isUser ? "bg-[#B2ECEA]" : "bg-[#F0F4F8]";
  const textColor = entry.isUser
    ? "text-teal"
    : entry.rank <= 2
      ? "text-navy"
      : "text-slate-muted";

  return (
    <div
      className={`flex items-center rounded-lg py-[7px] px-2.5 gap-2.5 ${
        entry.isUser
          ? "bg-[#E8FAF8] border border-teal"
          : ""
      }`}
    >
      <span
        className={`w-3.5 text-[11px]/3.5 ${entry.isUser ? "text-teal" : "text-slate-muted"}`}
      >
        {entry.rank}
      </span>
      <span className="grow shrink basis-0 text-navy text-xs/4">
        {entry.name}
        {entry.isUser && " ✦"}
      </span>
      <div className={`w-14 h-[5px] rounded-[3px] ${trackColor} shrink-0`}>
        <div
          className={`h-full rounded-[3px] ${barColor}`}
          style={{ width: `${animatedScore}%` }}
        />
      </div>
      <span className={`w-[22px] text-right text-xs/4 ${textColor}`}>
        {animatedScore}
      </span>
    </div>
  );
}

export function IndustryLeaderboard() {
  return (
    <div className="grow shrink basis-0 rounded-xl py-5 px-6 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="mb-4 text-navy text-[13px]/4">Industry Leaderboard</div>
      <div className="flex flex-col gap-2">
        {leaderboard.map((entry) => (
          <LeaderboardRow key={entry.rank} entry={entry} />
        ))}
      </div>
    </div>
  );
}
