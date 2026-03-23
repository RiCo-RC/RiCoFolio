"use client";

import { cn } from "@src/lib";
import type { Profile, Status } from "@src/types";

const profileColors: Record<Profile, string> = {
  hybrid: "bg-accent-hybrid/15 text-accent-hybrid border-accent-hybrid/30",
  dev: "bg-accent-dev/15 text-accent-dev border-accent-dev/30",
  cyber: "bg-accent-cyber/15 text-accent-cyber border-accent-cyber/30",
  ai: "bg-accent-ai/15 text-accent-ai border-accent-ai/30", 
  "project manager": "bg-accent-project-manager/15 text-accent-project-manager border-accent-project-manager/30", 
};

const statusColors: Record<Status, string> = {
	active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
	wip: "bg-amber-500/10 text-amber-400 border-amber-500/30",
	archived: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
	planned: "bg-blue-500/10 text-blue-400 border-blue-500/30",
};

interface BadgeProps {
	variant?: "profile" | "status" | "tag" | "tech";
	profile?: Profile;
	status?: Status;
	label: string;
	className?: string;
}

const Badge = ({
	variant = "tag",
	profile,
	status,
	label,
	className,
}: BadgeProps) => {
	const base =
		"inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-xs font-medium border";
	const color =
		variant === "profile" && profile
			? profileColors[profile]
			: variant === "status" && status
				? statusColors[status]
				: variant === "tech"
					? "bg-[var(--clr-surface-elevated)] text-[var(--clr-txt-secondary)] border-[var(--clr-border)]"
					: "bg-[var(--clr-surface)] text-[var(--clr-txt-secondary)] border-[var(--clr-border)]";

	return <span className={cn(base, color, className)}>{label}</span>;
};

export default Badge;
