"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Info, Briefcase } from "lucide-react";

import { useT, matchesProfile, formatDate } from "@src/lib";
import { useAppStore } from "@src/stores";
import {
	SectionHero,
	Card,
	Badge,
	Button,
	AdvancedFilter,
	type FilterCategory,
	EduExpModal,
} from "@src/components";
import { experiences } from "@src/data";
import type { Experience } from "@src/types";

const FILTER_CATEGORIES: FilterCategory[] = [
	{ label: "Profile", key: "profile", tags: ["dev", "cyber", "ai", "hybrid"] },
];

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.08, duration: 0.35 },
	}),
};

const ExperiencePage = () => {
	const t = useT();
	const { profile, language } = useAppStore();
	const [activeTags, setActiveTags] = useState<string[]>([]);
	const [selected, setSelected] = useState<Experience | null>(null);

	const base = useMemo(
		() => experiences.filter((e) => matchesProfile(e.profile, profile)),
		[profile],
	);
	const filtered = useMemo(() => {
		if (activeTags.length === 0) return base;
		return base.filter((e) =>
			activeTags.some((tag) =>
				e.profile.includes(tag as Experience["profile"][number]),
			),
		);
	}, [base, activeTags]);

	const tagCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		filtered.forEach((e) =>
			e.profile.forEach((p) => {
				counts[p] = (counts[p] ?? 0) + 1;
			}),
		);
		return counts;
	}, [filtered]);

	return (
		<div>
			<SectionHero
				title={t.pages.experience.heroTitle}
				description={t.pages.experience.heroDescription}
				badge="Experience"
			/>

			<div className="page-container py-12">
				<div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
					<span className="text-sm text-text-secondar] font-mono">
						{filtered.length} {t.pages.experience.labelFilter}
					</span>
					<AdvancedFilter
						categories={FILTER_CATEGORIES}
						activeTags={activeTags}
						onTagToggle={(tag) =>
							setActiveTags((prev) =>
								prev.includes(tag)
									? prev.filter((t) => t !== tag)
									: [...prev, tag],
							)
						}
						onClear={() => setActiveTags([])}
						tagCounts={tagCounts}
					/>
				</div>

				{filtered.length === 0 && (
					<p className="text-text-secondary text-sm">
						{t.global.common.noResults}
					</p>
				)}

				<div className="relative border-l-2 border-border ml-4 flex flex-col gap-8">
					{filtered.map((item, i) => (
						<motion.div
							key={item.id}
							variants={fadeUp}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							custom={i}
							className="relative pl-8"
						>
							<span className="absolute -left-[11px] top-4 w-5 h-5 rounded-full bg-accent border-2 border-bg flex items-center justify-center">
								<Briefcase size={10} className="text-white" />
							</span>
							<Card hover>
								<div className="flex flex-wrap items-start justify-between gap-3">
									<div>
										<h3 className="font-bold text-text-primary">
											{item.label}
										</h3>
										<p className="text-sm text-text-secondary mt-0.5">
											{item.company}
										</p>
										<div className="flex items-center gap-2 text-xs font-mono text-text-secondary mt-1">
											<span>
												{formatDate(item.startDate, language)} →{" "}
												{formatDate(item.endDate as string, language)}
											</span>
											{item.location && (
												<>
													<span>·</span>
													<span>{item.location}</span>
												</>
											)}
										</div>
									</div>
									<div className="flex flex-wrap gap-1.5">
										{item.profile.map((p) => (
											<Badge key={p} variant="profile" profile={p} label={p} />
										))}
										{item.isAlternance && <Badge label={t.global.common.alternance} />}
										{item.isInternship && (
											<Badge
												label={`${t.global.common.internship}${item.internshipDuration ? ` · ${item.internshipDuration}` : ""}`}
											/>
										)}
									</div>
								</div>
								{item.description && (
									<p className="text-sm text-text-secondary leading-relaxed">
										{item.description}
									</p>
								)}
								<div className="flex gap-2 pt-2 border-t border-border">
									{item.companyUrl && (
										<Button
											variant="ghost"
											size="sm"
											onClick={() => window.open(item.companyUrl, "_blank")}
										>
											<ExternalLink size={13} />
											{t.global.common.viewSite}
										</Button>
									)}
									<Button
										variant="outline"
										size="sm"
										className="ml-auto"
										onClick={() => setSelected(item)}
									>
										<Info size={13} />
										{t.global.common.details}
									</Button>
								</div>
							</Card>
						</motion.div>
					))}
				</div>
			</div>

			<EduExpModal item={selected} onClose={() => setSelected(null)} />
		</div>
	);
};

export default ExperiencePage;