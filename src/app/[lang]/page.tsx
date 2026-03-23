"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
	ArrowRight,
	Code2,
	Shield,
	Brain,
	GitCommit,
	FolderOpen,
	Wrench,
	BookOpen,
	Star,
	ChevronLeft,
	ChevronRight,
	Quote,
} from "lucide-react";

import { useT, useLocalizedPaths } from "@src/lib";
import { useAppStore } from "@src/stores";
import { Button, Card } from "@src/components";
import { projects, skills, articles, testimonials, newsItems } from "@src/data";
import { matchesProfile, formatDate } from "@src/lib";

const NEWS_CATEGORIES = [
	"project",
	"skill",
	"education",
	"experience",
	"article",
	"update",
] as const;

const NEWS_ICONS: Record<string, ReactNode> = {
	project: <FolderOpen size={14} />,
	skill: <Wrench size={14} />,
	education: <BookOpen size={14} />,
	experience: <GitCommit size={14} />,
	article: <BookOpen size={14} />,
	update: <Star size={14} />,
};

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.08, duration: 0.4 },
	}),
};

const slideVariants = {
	enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
	center: { x: 0, opacity: 1, transition: { duration: 0.35 } },
	exit: (dir: number) => ({
		x: dir > 0 ? -60 : 60,
		opacity: 0,
		transition: { duration: 0.25 },
	}),
};

const HomePage = () => {
	const t = useT();
	const { profile, language } = useAppStore();
	const path = useLocalizedPaths();
	const [newsFilter, setNewsFilter] = useState<string>("all");
	const [testimonialIdx, setTestimonialIdx] = useState(0);
	const [direction, setDirection] = useState(1);

	const filteredProjects = projects.filter((p) =>
		matchesProfile(p.profile, profile),
	);
	const filteredSkills = skills.filter((s) =>
		matchesProfile(s.profile, profile),
	);
	const filteredArticles = articles.filter((a) =>
		matchesProfile(a.profile, profile),
	);
	const filteredTestimonials = testimonials.filter((item) =>
		matchesProfile(item.profile, profile),
	);
	const filteredNews = newsItems
		.filter(
			(n) =>
				matchesProfile(n.profile, profile) &&
				(newsFilter === "all" || n.category === newsFilter),
		)
		.slice(0, 10);

	const homeHeroTags = [
		{
			label: `${t.pages.home.hero.tags.dev}`,
			icon: <Code2 size={14} />,
			color: "var(--clr-accent-dev)",
		},
		{
			label: `${t.pages.home.hero.tags.cyber}`,
			icon: <Shield size={14} />,
			color: "var(--clr-accent-cyber)",
		},
		{
			label: `${t.pages.home.hero.tags.ai}`,
			icon: <Brain size={14} />,
			color: "var(--clr-accent-ai)",
		},
		{
			label: `${t.pages.home.hero.tags.project_manager}`,
			icon: <Brain size={14} />,
			color: "var(--clr-accent-project-manager)",
		},
	];

	const stats = [
		{
			label: t.pages.home.statsProjects,
			value: `${filteredProjects.length}+`,
			icon: <Code2 size={20} />,
			color: "text-[var(--clr-accent-dev)]",
		},
		{
			label: t.pages.home.statsSkills,
			value: `${filteredSkills.length}+`,
			icon: <Wrench size={20} />,
			color: "text-[var(--clr-accent-hybrid)]",
		},
		{
			label: t.pages.home.statsArticles,
			value: `${filteredArticles.length}+`,
			icon: <BookOpen size={20} />,
			color: "text-[var(--clr-accent-cyber)]",
		},
		{
			label: t.pages.home.statsContributions,
			value: "0+",
			icon: <GitCommit size={20} />,
			color: "text-[var(--clr-accent-ai)]",
		},
	];

	const goTo = useCallback((idx: number, dir: number) => {
		setDirection(dir);
		setTestimonialIdx(idx);
	}, []);

	const prev = useCallback(() => {
		if (!filteredTestimonials.length) return;
		const next =
			(testimonialIdx - 1 + filteredTestimonials.length) %
			filteredTestimonials.length;
		goTo(next, -1);
	}, [testimonialIdx, filteredTestimonials.length, goTo]);

	const next = useCallback(() => {
		if (!filteredTestimonials.length) return;
		const nextIdx = (testimonialIdx + 1) % filteredTestimonials.length;
		goTo(nextIdx, 1);
	}, [testimonialIdx, filteredTestimonials.length, goTo]);

	useEffect(() => {
		if (filteredTestimonials.length <= 1) return;
		const id = setInterval(next, 6000);
		return () => clearInterval(id);
	}, [next, filteredTestimonials.length]);

	useEffect(() => {
		setTestimonialIdx(0);
	}, [profile]);

	return (
		<div className="flex flex-col">
			{/* Hero */}
			<section className="relative min-h-[calc(100vh-var(--header-height))] flex items-center overflow-hidden">
				<div className="absolute inset-0 grid-bg pointer-events-none" />
				<div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-glow blur-[120px] pointer-events-none" />
				<div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-dev/10 blur-[80px] pointer-events-none" />
				<div className="page-container relative z-10 py-20">
					<motion.div
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						custom={0}
						className="mb-4"
					>
						<span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent bg-accent-glow border border-accent/20 px-3 py-1 rounded-full">
							<span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
							{t.pages.home.heroStatus}
						</span>
					</motion.div>
					<motion.h1
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						custom={1}
						className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-text-primary mb-2"
					>
						{t.pages.home.heroTitle}
					</motion.h1>
					<motion.div
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						custom={2}
						className="flex items-center gap-3 mb-6"
					>
						<span className="font-mono text-xl text-accent">
							{t.pages.home.heroAlias}
						</span>
						<span className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-accent to-transparent" />
					</motion.div>
					<motion.div
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						custom={3}
						className="flex flex-wrap gap-2 mb-8"
					>
						{homeHeroTags.map(({ label, icon, color }) => (
							<span
								key={label}
								className="flex items-center gap-1.5 px-3 py-1.5 rounded-(--radius-full)] bg-surface border border-border text-sm font-medium"
								style={{ color }}
							>
								{icon}
								{label}
							</span>
						))}
					</motion.div>
					<motion.p
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						custom={4}
						className="text-lg md:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed"
					>
						{t.pages.home.heroDescription}
					</motion.p>
					<motion.div
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						custom={5}
						className="flex flex-wrap gap-3"
					>
						<Link href={path("projects")}>
							<Button variant="primary" size="lg">
								{t.pages.home.heroCta} <ArrowRight size={16} />
							</Button>
						</Link>
						<Link href={path("profile")}>
							<Button variant="secondary" size="lg">
								{t.pages.home.heroCtaProfile}
							</Button>
						</Link>
					</motion.div>
				</div>
			</section>

			{/* Stats */}
			<section className="py-16 border-y border-border bg-surface">
				<div className="page-container">
					<h2 className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-8">
						{t.pages.home.statsTitle}
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{stats.map((s, i) => (
							<motion.div
								key={s.label}
								variants={fadeUp}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								custom={i}
								className="flex flex-col gap-2"
							>
								<span className={s.color}>{s.icon}</span>
								<span className={`text-4xl font-black ${s.color}`}>
									{s.value}
								</span>
								<span className="text-sm text-text-secondary">{s.label}</span>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* News */}
			<section className="py-16">
				<div className="page-container">
					<div className="flex flex-wrap items-center justify-between gap-4 mb-8">
						<h2 className="text-2xl font-bold text-text-primary">
							{t.pages.home.newsTitle}
						</h2>
						<div className="flex flex-wrap gap-2">
							<Button
								variant={newsFilter === "all" ? "primary" : "secondary"}
								size="sm"
								onClick={() => setNewsFilter("all")}
							>
								{t.pages.home.newsAll}
							</Button>
							{NEWS_CATEGORIES.map((cat) => (
								<Button
									key={cat}
									variant={newsFilter === cat ? "primary" : "secondary"}
									size="sm"
									onClick={() => setNewsFilter(cat)}
								>
									{cat}
								</Button>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-3">
						{filteredNews.length === 0 && (
							<p className="text-text-secondary text-sm">
								{t.global.common.noResults}
							</p>
						)}
						{filteredNews.map((item, i) => (
							<motion.div
								key={item.id}
								variants={fadeUp}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								custom={i}
							>
								<Card className="flex-row items-start gap-4 py-4">
									<span className="flex items-center justify-center w-8 h-8 rounded-md bg-surface-elevated text-accent shrink-0 mt-0.5">
										{NEWS_ICONS[item.category]}
									</span>
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between gap-2 flex-wrap">
											<h3 className="font-medium text-text-primary text-sm">
												{item.title}
											</h3>
											<span className="text-xs font-mono text-text-secondary shrink-0">
												{formatDate(item.date, language)}
											</span>
										</div>
										<p className="text-xs text-text-secondary mt-1">
											{item.description}
										</p>
									</div>
									{item.link && (
										<Link
											href={item.link}
											className="text-accent hover:opacity-70 transition-opacity shrink-0 mt-1"
										>
											<ArrowRight size={14} />
										</Link>
									)}
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Carousel */}
			{filteredTestimonials.length > 0 && (
				<section className="py-16 bg-surface overflow-hidden">
					<div className="page-container">
						<h2 className="text-2xl font-bold text-text-primary mb-10">
							{t.pages.home.testimonialsTitle}
						</h2>

						<div className="relative max-w-2xl mx-auto">
							{/* Card */}
							<div className="relative min-h-[200px] flex items-center justify-center">
								<AnimatePresence initial={false} custom={direction} mode="wait">
									<motion.div
										key={testimonialIdx}
										custom={direction}
										variants={slideVariants}
										initial="enter"
										animate="center"
										exit="exit"
										className="w-full"
									>
										<Card className="gradient-border relative">
											<Quote
												size={32}
												className="text-accent opacity-30 absolute top-4 right-4"
											/>
											<p className="text-text-secondary italic leading-relaxed text-base pr-8">
												&ldquo;{filteredTestimonials[testimonialIdx].content}
												&rdquo;
											</p>
											<div className="flex items-center gap-3 pt-3 border-t border-border">
												<div className="w-10 h-10 rounded-full bg-accent-glow border border-accent/30 flex items-center justify-center text-accent font-bold shrink-0">
													{filteredTestimonials[testimonialIdx].author[0]}
												</div>
												<div className="flex-1 min-w-0">
													<div className="text-sm font-semibold text-text-primary">
														{filteredTestimonials[testimonialIdx].author}
													</div>
													<div className="text-xs text-text-secondary truncate">
														{filteredTestimonials[testimonialIdx].role}
														{filteredTestimonials[testimonialIdx].company &&
															` · ${filteredTestimonials[testimonialIdx].company}`}
													</div>
												</div>
												<span className="text-xs font-mono text-text-secondary shrink-0">
													{formatDate(
														filteredTestimonials[testimonialIdx].date,
														language,
													)}
												</span>
											</div>
										</Card>
									</motion.div>
								</AnimatePresence>
							</div>

							{/* Controls */}
							{filteredTestimonials.length > 1 && (
								<div className="flex items-center justify-center gap-4 mt-6">
									<Button
										variant="ghost"
										size="icon"
										onClick={prev}
										aria-label="Previous testimonial"
									>
										<ChevronLeft size={18} />
									</Button>

									<div className="flex gap-2">
										{filteredTestimonials.map((_, i) => (
											<button
												key={i}
												onClick={() => goTo(i, i > testimonialIdx ? 1 : -1)}
												aria-label={`Testimonial ${i + 1}`}
												className={`rounded-full transition-all duration-300 ${
													i === testimonialIdx
														? "w-6 h-2 bg-accent"
														: "w-2 h-2 bg-border-strong hover:bg-text-secondary"
												}`}
											/>
										))}
									</div>

									<Button
										variant="ghost"
										size="icon"
										onClick={next}
										aria-label="Next testimonial"
									>
										<ChevronRight size={18} />
									</Button>
								</div>
							)}
						</div>
					</div>
				</section>
			)}

			{/* Opportunities CTA */}
			<section id="opportunities" className="py-20 relative overflow-hidden">
				<div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
				<div className="absolute inset-0 bg-gradient-to-b from-accent-glow)] via-transparent to-transparent pointer-events-none" />
				<div className="page-container relative z-10 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
						{t.pages.home.opportunitiesTitle}
					</h2>
					<p className="text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
						{t.pages.home.opportunitiesDescription}
					</p>
					<Link href={path("contact")}>
						<Button variant="primary" size="lg">
							{t.pages.home.opportunitiesCta} <ArrowRight size={16} />
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
