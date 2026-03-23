"use client";

import { ExternalLink, Github, Code2, Globe, Play, Mail } from "lucide-react";

import { Modal, Badge, Button } from "@src/components";
import { useT, formatDate } from "@src/lib";
import { useAppStore } from "@src/stores";
import type { Project } from "@src/types";

interface ProjectModalProps {
	project: Project | null;
	onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
	const t = useT();
	const { language } = useAppStore();
	if (!project) return null;

	const projectKey = project.title as keyof typeof t.pages.projects.list;
	const currentTranslation = t.pages.projects.list[projectKey];

	return (
		<Modal
			open={!!project}
			onClose={onClose}
			size="xl"
			footer={
				<Button variant="secondary" onClick={onClose}>
					{t.global.common.close}
				</Button>
			}
		>
			<div className="flex flex-col gap-6">
				<div className="flex flex-wrap items-start justify-between gap-3">
					<div>
						<h2 className="text-2xl font-bold text-text-primary mb-2">
							{project.title}
						</h2>
						<div className="flex flex-wrap gap-2">
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
					<div className="flex gap-2 flex-wrap">
						{project.links?.code && (
							<Button
								variant="secondary"
								size="sm"
								onClick={() => window.open(project.links!.code, "_blank")}
							>
								<Github size={14} />
								{t.global.common.viewCode}
							</Button>
						)}
						{project.links?.live && (
							<Button
								variant="secondary"
								size="sm"
								onClick={() => window.open(project.links!.live, "_blank")}
							>
								<Globe size={14} />
								{t.global.common.viewSite}
							</Button>
						)}
						{project.links?.demo && (
							<Button
								variant="outline"
								size="sm"
								onClick={() => window.open(project.links!.demo, "_blank")}
							>
								<Play size={14} />
								{t.global.common.viewDemo}
							</Button>
						)}
					</div>
				</div>

				<p className="text-text-secondary leading-relaxed">
					{currentTranslation.desc.long || currentTranslation.desc.short}
				</p>

				<div>
					<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
						Technologies
					</p>
					<div className="flex flex-wrap gap-2">
						{project.techs.map((tech) => (
							<Badge key={tech} variant="tech" label={tech} />
						))}
					</div>
				</div>

				{project.tasks && project.tasks.length > 0 && (
					<div>
						<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
							{t.global.common.tasks}
						</p>
						<ul className="flex flex-col gap-1.5">
							{project.tasks.map((task, i) => (
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

				{project.learnings && project.learnings.length > 0 && (
					<div>
						<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
							{t.global.common.learnedAt}
						</p>
						<ul className="flex flex-col gap-1.5">
							{project.learnings.map((l, i) => (
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

				{project.team && project.team.length > 0 && (
					<div>
						<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
							{t.global.common.team}
						</p>
						<div className="flex flex-wrap gap-2">
							{project.team.map((m, i) => (
								<div
									key={i}
									className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-elevated border border-border text-sm"
								>
									<span className="font-medium text-text-primary">
										{m.name}
									</span>
									<span className="text-text-secondary">— {m.role}</span>
								</div>
							))}
						</div>
					</div>
				)}

				{project.history && project.history.length > 0 && (
					<div>
						<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
							{t.global.common.history}
						</p>
						<div className="flex flex-col gap-2 border-l-2 border-border pl-4">
							{project.history.map((h, i) => (
								<div key={i} className="flex gap-3 text-sm">
									<span className="font-mono text-accent shrink-0">
										{formatDate(h.date, language)}
									</span>
									<span className="text-text-secondary">{h.event}</span>
								</div>
							))}
						</div>
					</div>
				)}

				{project.resources && project.resources.length > 0 && (
					<div>
						<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
							{t.global.common.resources}
						</p>
						<div className="flex flex-wrap gap-2">
							{project.resources.map((r, i) => (
								<a
									key={i}
									href={r.url ?? "#"}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated border border-border text-xs text-text-secondary hover:text-accent hover:border-accent transition-colors"
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

export default ProjectModal;
