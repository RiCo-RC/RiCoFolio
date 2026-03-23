"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import { useT, matchesProfile } from "@src/lib";
import { useAppStore } from "@src/stores";
import {
	SectionHero,
	Card,
	Badge,
	AdvancedFilter,
	type FilterCategory,
} from "@src/components";
import { skills } from "@src/data";

const FILTER_CATEGORIES: FilterCategory[] = [
	{
		label: "Category",
		key: "category",
		tags: [
			"Languages",
			"Frameworks",
			"Systems",
			"Cybersecurity",
			"AI/ML",
			"DevOps",
			"Databases",
			"Tools",
			"Soft Skills",
		],
	},
	{
		label: "Topics",
		key: "tags",
		tags: [
			"backend",
			"frontend",
			"scripting",
			"security",
			"ai",
			"ml",
			"network",
			"devops",
			"soft",
			"database",
		],
	},
];

const LEVEL_LABELS = [
	"",
	"Beginner",
	"Basic",
	"Intermediate",
	"Advanced",
	"Expert",
];

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.05, duration: 0.35 },
	}),
};

const SkillsPage = () => {
	const t = useT();
	const { profile } = useAppStore();
	const [activeTags, setActiveTags] = useState<string[]>([]);

	const base = useMemo(
		() => skills.filter((s) => matchesProfile(s.profile, profile)),
		[profile],
	);

	const filtered = useMemo(() => {
		if (activeTags.length === 0) return base;
		return base.filter((s) => {
			const all = [...s.tags, s.category.toLowerCase()];
			return activeTags.some((tag) => all.includes(tag.toLowerCase()));
		});
	}, [base, activeTags]);

	const tagCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		filtered.forEach((s) => {
			[...s.tags, s.category].forEach((tag) => {
				counts[tag] = (counts[tag] ?? 0) + 1;
			});
		});
		return counts;
	}, [filtered]);

	const grouped = useMemo(() => {
		const groups: Record<string, typeof filtered> = {};
		filtered.forEach((s) => {
			if (!groups[s.category]) groups[s.category] = [];
			groups[s.category].push(s);
		});
		return groups;
	}, [filtered]);

	const toggle = (tag: string) =>
		setActiveTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);

	return (
		<div>
			<SectionHero
				title={t.pages.skills.heroTitle}
				description={t.pages.skills.heroDescription}
				badge="Skills"
			/>

			<div className="page-container py-12">
				<div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
					<span className="text-sm text-text-secondary font-mono">
						{filtered.length} skills
					</span>
					<AdvancedFilter
						categories={FILTER_CATEGORIES}
						activeTags={activeTags}
						onTagToggle={toggle}
						onClear={() => setActiveTags([])}
						tagCounts={tagCounts}
					/>
				</div>

				{filtered.length === 0 && (
					<p className="text-text-secondary text-sm">
						{t.global.common.noResults}
					</p>
				)}

				<div className="flex flex-col gap-10">
					{Object.entries(grouped).map(([category, items]) => (
						<section key={category}>
							<h2 className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
								<span className="w-4 h-px bg-accent" />
								{category}
								<span className="text-accent">({items.length})</span>
							</h2>
							<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{items.map((skill, i) => (
									<motion.div
										key={skill.id}
										variants={fadeUp}
										initial="hidden"
										whileInView="visible"
										viewport={{ once: true }}
										custom={i}
									>
										<Card hover className="gap-3">
											<div className="flex items-start justify-between gap-2">
												<span className="font-semibold text-text-primary text-sm">
													{skill.label}
												</span>
												<div className="flex flex-wrap gap-1">
													{skill.profile.map((p) => (
														<Badge
															key={p}
															variant="profile"
															profile={p}
															label={p}
														/>
													))}
												</div>
											</div>
											{skill.level && (
												<div className="flex gap-1">
													{[1, 2, 3, 4, 5].map((lvl) => (
														<span
															key={lvl}
															className={`flex-1 h-1 rounded-full transition-all ${lvl <= skill.level! ? "bg-accent" : "bg-border"}`}
														/>
													))}
												</div>
											)}
											{skill.level && (
												<span className="text-xs text-text-secondary">
													{LEVEL_LABELS[skill.level]}
												</span>
											)}
											{skill.description && (
												<p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
													{skill.description}
												</p>
											)}
										</Card>
									</motion.div>
								))}
							</div>
						</section>
					))}
				</div>
			</div>
		</div>
	);
};

export default SkillsPage;
