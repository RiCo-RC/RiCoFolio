"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Github, Globe, Play, Info } from "lucide-react";

import { useT, matchesProfile } from "@src/lib";
import { useAppStore } from "@src/stores";
import { 
  SectionHero,
  Card,
  Badge,
  Button,
  AdvancedFilter,
  type FilterCategory,
  ProjectModal,
} from "@src/components";
import { projects } from "@src/data";
import type { Project } from "@src/types";

const FILTER_CATEGORIES: FilterCategory[] = [
	{
		label: "Status",
		key: "status",
		tags: ["active", "wip", "archived", "planned"],
	},
	{
		label: "Technologies",
		key: "techs",
		tags: [
			"Python",
			"TypeScript",
			"React",
			"Next.js",
			"Docker",
			"FastAPI",
			"PostgreSQL",
			"Tailwindcss",
			"Zustand",
			"Bash",
		],
	},
	{
		label: "Topics",
		key: "tags",
		tags: [
			"osint",
			"security",
			"ai",
			"llm",
			"web",
			"frontend",
			"backend",
			"ctf",
			"network",
			"devtools",
		],
	},
];

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.06, duration: 0.35 },
	}),
};

const ProjectsPage = () => {
	const t = useT();
	const { profile } = useAppStore();
	const [activeTags, setActiveTags] = useState<string[]>([]);
	const [selected, setSelected] = useState<Project | null>(null);

	const base = useMemo(
		() => projects.filter((p) => matchesProfile(p.profile, profile)),
		[profile],
	);

	const filtered = useMemo(() => {
		if (activeTags.length === 0) return base;
		return base.filter((p) => {
			const all = [...p.tags, ...p.techs, p.status];
			return activeTags.every((tag) => all.includes(tag));
		});
	}, [base, activeTags]);

	const tagCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		filtered.forEach((p) => {
			[...p.tags, ...p.techs, p.status].forEach((tag) => {
				counts[tag] = (counts[tag] ?? 0) + 1;
			});
		});
		return counts;
	}, [filtered]);

	const toggle = (tag: string) =>
		setActiveTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);

	return (
		<div>
			<SectionHero
				title={t.pages.projects.heroTitle}
				description={t.pages.projects.heroDescription}
				badge="Projects"
			/>

			<div className="page-container py-12">
				<div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
					<span className="text-sm text-text-secondary font-mono">
						{filtered.length} {t.pages.projects.totalProjects}
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
					{filtered.map((project, i) => (
						<motion.div
							key={project.id}
							variants={fadeUp}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							custom={i}
						>
							<Card hover glow className="h-full">
								<div className="flex items-start justify-between gap-2 flex-wrap">
									<h3 className="font-bold text-text-primary text-base">
										{t.pages.projects.list[project.title as keyof typeof t.pages.projects.list].title}
									</h3>
									<div className="flex flex-wrap gap-1">
										{project.profile.map((p) => (
											<Badge key={p} variant="profile" profile={p} label={p} />
										))}
										<Badge
											variant="status"
											status={project.status}
											label={t.global.status[project.status]}
										/>
									</div>
								</div>
								<p className="text-sm text-text-secondary leading-relaxed flex-1">
									{t.pages.projects.list[project.title as keyof typeof t.pages.projects.list].desc.short}
								</p>
								<div className="flex flex-wrap gap-1.5">
									{project.techs.slice(0, 5).map((tech) => (
										<Badge key={tech} variant="tech" label={tech} />
									))}
									{project.techs.length > 5 && (
										<Badge label={`+${project.techs.length - 5}`} />
									)}
								</div>
								<div className="flex flex-wrap gap-2 pt-2 border-t border-border">
									{project.links?.code && (
										<Button
											variant="ghost"
											size="sm"
											onClick={() => window.open(project.links!.code, "_blank")}
										>
											<Github size={13} />
											{t.global.common.viewCode}
										</Button>
									)}
									{project.links?.live && (
										<Button
											variant="ghost"
											size="sm"
											onClick={() => window.open(project.links!.live, "_blank")}
										>
											<Globe size={13} />
											{t.global.common.viewSite}
										</Button>
									)}
									{project.links?.demo && (
										<Button
											variant="ghost"
											size="sm"
											onClick={() => window.open(project.links!.demo, "_blank")}
										>
											<Play size={13} />
											{t.global.common.viewDemo}
										</Button>
									)}
									<Button
										variant="outline"
										size="sm"
										className="ml-auto"
										onClick={() => setSelected(project)}
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

			<ProjectModal project={selected} onClose={() => setSelected(null)} />
		</div>
	);
};

export default ProjectsPage;