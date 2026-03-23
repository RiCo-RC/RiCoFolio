"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Info } from "lucide-react";

import { useT, matchesProfile, formatDate } from "@/src/lib";
import { useAppStore } from "@/src/stores";
import {
	SectionHero,
	Card,
	Badge,
	Button,
	AdvancedFilter,
	type FilterCategory,
	ArticleModal,
} from "@src/components";
import { articles } from "@src/data";
import type { Article } from "@src/types";

const FILTER_CATEGORIES: FilterCategory[] = [
	{ label: "Status", key: "status", tags: ["active", "wip", "planned"] },
	{
		label: "Topics",
		key: "tags",
		tags: ["osint", "security", "ai", "llm", "guide", "prompt-injection"],
	},
];

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.07, duration: 0.35 },
	}),
};

const ArticlesPage = () => {
	const t = useT();
	const { profile, language } = useAppStore();
	const [activeTags, setActiveTags] = useState<string[]>([]);
	const [selected, setSelected] = useState<Article | null>(null);

	const base = useMemo(
		() => articles.filter((a) => matchesProfile(a.profile, profile)),
		[profile],
	);
	const filtered = useMemo(() => {
		if (activeTags.length === 0) return base;
		return base.filter((a) =>
			activeTags.some((tag) => [...a.tags, a.status].includes(tag)),
		);
	}, [base, activeTags]);

	const tagCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		filtered.forEach((a) =>
			[...a.tags, a.status].forEach((tag) => {
				counts[tag] = (counts[tag] ?? 0) + 1;
			}),
		);
		return counts;
	}, [filtered]);

	const toggle = (tag: string) =>
		setActiveTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);

	return (
		<div>
			<SectionHero
				title={t.pages.articles.heroTitle}
				description={t.pages.articles.heroDescription}
				badge="Articles"
			/>

			<div className="page-container py-12">
				<div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
					<span className="text-sm text-text-secondary font-mono">
						{filtered.length} articles
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

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filtered.map((article, i) => (
						<motion.div
							key={article.id}
							variants={fadeUp}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							custom={i}
						>
							<Card hover glow className="h-full">
								<div className="flex flex-wrap gap-1.5">
									{article.profile.map((p) => (
										<Badge key={p} variant="profile" profile={p} label={p} />
									))}
									<Badge
										variant="status"
										status={article.status}
										label={t.global.status[article.status]}
									/>
									{article.publishDate && (
										<span className="text-xs font-mono text-text-secondary">
											{formatDate(article.publishDate, language)}
										</span>
									)}
								</div>
								<h3 className="font-bold text-text-primary">
									{article.title}
								</h3>
								<p className="text-sm text-text-secondary leading-relaxed flex-1">
									{article.description}
								</p>
								<div className="flex flex-wrap gap-1.5">
									{article.tags.map((tag) => (
										<Badge key={tag} label={tag} />
									))}
								</div>
								<div className="flex gap-2 pt-2 border-t border-border">
									{article.links?.live && (
										<Button
											variant="ghost"
											size="sm"
											onClick={() => window.open(article.links!.live, "_blank")}
										>
											<ExternalLink size={13} />
											{t.global.common.viewSite}
										</Button>
									)}
									<Button
										variant="outline"
										size="sm"
										className="ml-auto"
										onClick={() => setSelected(article)}
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

			<ArticleModal article={selected} onClose={() => setSelected(null)} />
		</div>
	);
};

export default ArticlesPage;