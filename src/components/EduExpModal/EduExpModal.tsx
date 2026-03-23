"use client";

import { ExternalLink } from "lucide-react";

import { Modal, Badge, Button } from "@src/components";
import { useT, formatDate } from "@src/lib";
import { useAppStore } from "@src/stores";
import type { Education, Experience } from "@src/types";

type Item = Education | Experience;

const isEducation = (item: Item): item is Education => {
	return "school" in item;
}

interface EduExpModalProps {
	item: Item | null;
	onClose: () => void;
}

const EduExpModal = ({ item, onClose }: EduExpModalProps) => {
	const t = useT();
	const { language } = useAppStore();
	if (!item) return null;
	const isEdu = isEducation(item);
	const org = isEdu ? (item as Education).school : (item as Experience).company;
	const orgUrl = isEdu
		? (item as Education).schoolUrl
		: (item as Experience).companyUrl;

	return (
		<Modal
			open={!!item}
			onClose={onClose}
			size="xl"
			footer={
				<Button variant="secondary" onClick={onClose}>
					{t.global.common.close}
				</Button>
			}
		>
			<div className="flex flex-col gap-5">
				<div className="flex flex-wrap items-start justify-between gap-3">
					<div>
						<h2 className="text-2xl font-bold text-text-primary] mb-1">
							{item.label}
						</h2>
						<div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
							<span className="font-medium text-text-primary">
								{org}
							</span>
							{item.location && (
								<>
									<span>·</span>
									<span>{item.location}</span>
								</>
							)}
						</div>
						<div className="flex flex-wrap gap-2 text-xs font-mono text-text-secondary">
							<span>
								{formatDate(item.startDate, language)} →{" "}
								{formatDate(item.endDate, language)}
							</span>
							{item.isAlternance && <Badge label={t.global.common.alternance} />}
							{(isEdu ? item.hasInternship : item.isInternship) && (
								<Badge
									label={`${t.global.common.internship}${item.internshipDuration ? ` (${item.internshipDuration})` : ""}`}
								/>
							)}
						</div>
					</div>
					{orgUrl && (
						<Button
							variant="secondary"
							size="sm"
							onClick={() => window.open(orgUrl, "_blank")}
						>
							<ExternalLink size={14} />
							{t.global.common.viewSite}
						</Button>
					)}
				</div>

				<div className="flex flex-wrap gap-2">
					{item.profile.map((p) => (
						<Badge key={p} variant="profile" profile={p} label={p} />
					))}
				</div>

				{item.description && (
					<p className="text-text-secondary leading-relaxed">
						{item.description}
					</p>
				)}

				{item.tasks && item.tasks.length > 0 && (
					<div>
						<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
							{t.global.common.tasks}
						</p>
						<ul className="flex flex-col gap-1.5">
							{item.tasks.map((task, i) => (
								<li
									key={i}
									className="flex items-start gap-2 text-sm text-text-primary"
								>
									<span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
									{task}
								</li>
							))}
						</ul>
					</div>
				)}

				{item.learnings && item.learnings.length > 0 && (
					<div>
						<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
							{t.global.common.learnedAt}
						</p>
						<ul className="flex flex-col gap-1.5">
							{item.learnings.map((l, i) => (
								<li
									key={i}
									className="flex items-start gap-2 text-sm text-text-secondary"
								>
									<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
									{l}
								</li>
							))}
						</ul>
					</div>
				)}

				{item.history && item.history.length > 0 && (
					<div>
						<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
							{t.global.common.history}
						</p>
						<div className="flex flex-col gap-2 border-l-2 border-border pl-4">
							{item.history.map((h, i) => (
								<div key={i} className="flex gap-3 text-sm">
									<span className="font-mono text-accent">
										{formatDate(h.date, language)}
									</span>
									<span className="text-text-secondary">
										{h.event}
									</span>
								</div>
							))}
						</div>
					</div>
				)}

				{item.resources && item.resources.length > 0 && (
					<div>
						<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
							{t.global.common.resources}
						</p>
						<div className="flex flex-wrap gap-2">
							{item.resources.map((r, i) => (
								<a
									key={i}
									href={r.url ?? "#"}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated border border-border text-xs text-text-secondary hover:text-accent transition-colors"
								>
									<ExternalLink size={10} />
									{r.label}
								</a>
							))}
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default EduExpModal;