"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

import { Modal, Badge, Button } from "@src/components";
import { useT, formatDate } from "@src/lib";
import { useAppStore } from "@src/stores";
import { Article } from "@src/types";

interface ArticleModalProps {
	article: Article | null;
	onClose: () => void;
}

const ArticleModal = ({ article, onClose }: ArticleModalProps) => {
	const t = useT();
	const { language } = useAppStore();
	const [tab, setTab] = useState<"details" | "read">("details");
	if (!article) return null;

	return (
		<Modal
			open={!!article}
			onClose={onClose}
			size="xl"
			footer={
				<Button variant="secondary" onClick={onClose}>
					{t.global.common.close}
				</Button>
			}
		>
			<div className="flex flex-col gap-4">
				<div className="flex flex-wrap items-start justify-between gap-3">
					<div>
						<h2 className="text-2xl font-bold text-text-primary mb-2">
							{article.title}
						</h2>
						<div className="flex flex-wrap gap-2">
							{article.profile.map((p) => (
								<Badge key={p} variant="profile" profile={p} label={p} />
							))}
							<Badge
								variant="status"
								status={article.status}
								label={t.global.status[article.status]}
							/>
							{article.publishDate && (
								<span className="text-xs text-text-secondary font-mono">
									{formatDate(article.publishDate, language)}
								</span>
							)}
						</div>
					</div>
					<div className="flex gap-2">
						{article.links?.live && (
							<Button
								variant="secondary"
								size="sm"
								onClick={() => window.open(article.links!.live, "_blank")}
							>
								<ExternalLink size={14} />
								{t.global.common.viewSite}
							</Button>
						)}
					</div>
				</div>

				<div className="flex gap-1 border-b border-border">
					{(["details", "read"] as const).map((tabKey) => (
						<button
							key={tabKey}
							onClick={() => setTab(tabKey)}
							className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
								tab === tabKey
									? "border-accent text-accent"
									: "border-transparent text-text-secondary hover:text-text-primary"
							}`}
						>
							{tabKey === "details"
								? t.pages.articles.tabDetails
								: t.pages.articles.tabRead}
						</button>
					))}
				</div>

				{tab === "details" && (
					<div className="flex flex-col gap-4">
						<p className="text-text-secondary">
							{article.description}
						</p>
						<div>
							<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
								Tags
							</p>
							<div className="flex flex-wrap gap-2">
								{article.tags.map((tag) => (
									<Badge key={tag} label={tag} />
								))}
							</div>
						</div>
						{article.history && article.history.length > 0 && (
							<div>
								<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
									{t.global.common.history}
								</p>
								<div className="flex flex-col gap-2 border-l-2 border-border pl-4">
									{article.history.map((h, i) => (
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
						{article.resources && article.resources.length > 0 && (
							<div>
								<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">
									{t.global.common.resources}
								</p>
								<div className="flex flex-wrap gap-2">
									{article.resources.map((r, i) => (
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
				)}

				{tab === "read" && (
					<div className="prose prose-sm max-w-none text-text-secondary">
						{article.content ? (
							<pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
								{article.content}
							</pre>
						) : (
							<p className="italic">{t.global.common.comingSoon}</p>
						)}
					</div>
				)}
			</div>
		</Modal>
	);
};

export default ArticleModal;