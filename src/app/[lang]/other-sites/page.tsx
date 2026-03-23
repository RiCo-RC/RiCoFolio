"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { useT, matchesProfile } from "@src/lib";
import { useAppStore } from "@src/stores";
import {
	SectionHero,
	Card,
	Badge,
	Button,
	AdvancedFilter,
	type FilterCategory,
} from "@src/components";
import { otherSites } from '@src/data';

const FILTER_CATEGORIES: FilterCategory[] = [
	{ label: "Status", key: "status", tags: ["active", "wip", "archived"] },
	{ label: "Topics", key: "tags", tags: ["ctf", "security", "blog", "web"] },
];

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.07, duration: 0.35 },
	}),
};

const OtherSitesPage = () => {
	const t = useT();
	const { profile } = useAppStore();
	const [activeTags, setActiveTags] = useState<string[]>([]);

	const base = useMemo(
		() => otherSites.filter((s) => matchesProfile(s.profile, profile)),
		[profile],
	);
	const filtered = useMemo(() => {
		if (activeTags.length === 0) return base;
		return base.filter((s) =>
			activeTags.some((tag) => [...s.tags, s.status].includes(tag)),
		);
	}, [base, activeTags]);

	const tagCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		filtered.forEach((s) =>
			[...s.tags, s.status].forEach((tag) => {
				counts[tag] = (counts[tag] ?? 0) + 1;
			}),
		);
		return counts;
	}, [filtered]);

	return (
		<div>
			<SectionHero
				title={t.pages.otherSites.heroTitle}
				description={t.pages.otherSites.heroDescription}
				badge="Other Sites"
			/>

			<div className="page-container py-12">
				<div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
					<span className="text-sm text-text-secondary font-mono">
						{filtered.length} sites
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

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filtered.map((site, i) => (
						<motion.div
							key={site.id}
							variants={fadeUp}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							custom={i}
						>
							<Card hover glow className="h-full">
								<div className="flex flex-wrap gap-1.5">
									{site.profile.map((p) => (
										<Badge key={p} variant="profile" profile={p} label={p} />
									))}
									<Badge
										variant="status"
										status={site.status}
										label={t.global.status[site.status]}
									/>
								</div>
								<h3 className="font-bold text-text-primary">
									{site.title}
								</h3>
								<p className="text-sm text-text-secondary flex-1">
									{site.description}
								</p>
								<div className="flex flex-wrap gap-1.5">
									{site.tags.map((tag) => (
										<Badge key={tag} label={tag} />
									))}
								</div>
								{site.url && (
									<Button
										variant="outline"
										size="sm"
										onClick={() => window.open(site.url, "_blank")}
									>
										<ExternalLink size={13} />
										{t.global.common.viewSite}
									</Button>
								)}
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default OtherSitesPage;