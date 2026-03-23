"use client";

import { cn } from "@src/lib";

interface SectionHeroProps {
	title: string;
	description?: string;
	badge?: string;
	children?: React.ReactNode;
	className?: string;
}

const SectionHero = ({
	title,
	description,
	badge,
	children,
	className,
}: SectionHeroProps) => {
	return (
		<section
			className={cn("py-20 md:py-28 relative overflow-hidden", className)}
		>
			<div className="absolute inset-0 grid-bg pointer-events-none" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-accent-glow blur-3xl pointer-events-none" />
			<div className="page-container relative z-10">
				{badge && (
					<span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent bg-accent-glow border border-accent/20 px-3 py-1 rounded-full mb-4">
						<span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
						{badge}
					</span>
				)}
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 tracking-tight">
					{title}
				</h1>
				{description && (
					<p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
						{description}
					</p>
				)}
				{children}
			</div>
		</section>
	);
};

export default SectionHero;