"use client";

import { motion } from "framer-motion";
import {
	MapPin,
	CheckCircle2,
	Code2,
	Shield,
	Plane,
	PawPrint,
} from "lucide-react";

import { useT } from "@src/lib";
import { SectionHero, Card, Badge } from '@src/components';

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.08, duration: 0.4 },
	}),
};

export default function ProfilePage() {
	const t = useT();
	const p = t.pages.profile;

	return (
		<div>
			<SectionHero title={p.heroTitle} badge="Profile">
				<div className="flex items-center gap-2 text-sm text-text-secondary mt-3 mb-2">
					<MapPin size={14} />
					<span>{p.heroLocation}</span>
				</div>
				<div className="flex flex-wrap gap-2 mb-4">
					<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-medium">
						<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
						{p.available}
					</span>
					<span className="text-xs text-text-secondary self-center">
						— {p.availableDesc}
					</span>
				</div>
				<p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
					{p.heroDescription}
				</p>
			</SectionHero>

			<div className="page-container py-16 flex flex-col gap-16">
				{/* Looking for */}
				<section>
					<h2 className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-6">
						{p.lookingFor}
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						<Card className="gradient-border">
							<div className="flex items-start gap-3">
								<Code2
									size={20}
									className="text-accent-dev shrink-0 mt-0.5"
								/>
								<div>
									<Badge
										variant="profile"
										profile="dev"
										label="Dev"
										className="mb-2"
									/>
									<p className="text-text-primary font-medium">
										{p.lookingForDev}
									</p>
								</div>
							</div>
						</Card>
						<Card className="gradient-border">
							<div className="flex items-start gap-3">
								<Shield
									size={20}
									className="text-accent-cyber shrink-0 mt-0.5"
								/>
								<div>
									<Badge
										variant="profile"
										profile="cyber"
										label="Cyber"
										className="mb-2"
									/>
									<p className="text-text-primary font-medium">
										{p.lookingForCyber}
									</p>
								</div>
							</div>
						</Card>
					</div>
				</section>

				{/* Traits */}
				<section>
					<h2 className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-6">
						{p.traitsTitle}
					</h2>
					<div className="flex flex-wrap gap-3">
						{p.traits.map((trait, i) => (
							<motion.div
								key={trait}
								variants={fadeUp}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								custom={i}
							>
								<span className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-sm text-text-primary">
									<CheckCircle2
										size={14}
										className="text-accent"
									/>
									{trait}
								</span>
							</motion.div>
						))}
					</div>
				</section>

				{/* Passions */}
				<section>
					<h2 className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-6">
						{p.passionsTitle}
					</h2>
					<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
						{p.passions.map((passion, i) => (
							<motion.div
								key={passion}
								variants={fadeUp}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								custom={i}
							>
								<Card className="py-3 px-4 flex-row items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
									<span className="text-sm text-text-primary">
										{passion}
									</span>
								</Card>
							</motion.div>
						))}
					</div>
				</section>

				{/* Languages */}
				<section>
					<h2 className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-6">
						{p.languagesTitle}
					</h2>
					<div className="flex flex-wrap gap-4">
						{p.languages.map((lang) => (
							<Card
								key={lang.code}
								className="flex-row items-center gap-3 py-3 px-4 w-auto"
							>
								<div className="w-8 h-8 rounded-full bg-accent-glow border border-accent/30 flex items-center justify-center text-sm font-bold text-accent uppercase">
									{lang.code}
								</div>
								<div>
									<div className="text-sm font-medium text-text-primary">
										{lang.name}
									</div>
									<div className="text-xs text-text-secondary">
										{lang.level}
									</div>
								</div>
							</Card>
						))}
					</div>
				</section>

				{/* Travels */}
				<section>
					<h2 className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-6">
						{p.travelsTitle}
					</h2>
					<div className="flex flex-wrap gap-4">
						{p.travels.map((travel) => (
							<Card
								key={`${travel.city}-${travel.country}`}
								className="py-3 px-4 w-auto"
							>
								<div className="flex items-center gap-2">
									{travel.status === "visited" ? (
										<CheckCircle2 size={16} className="text-emerald-400" />
									) : (
										<Plane size={16} className="text-accent" />
									)}
									<div>
										<div className="text-sm font-medium text-text-primary">
											{travel.city}
										</div>
										<div className="text-xs text-text-secondary">
											{travel.country}
										</div>
									</div>
									<span
										className={`ml-2 text-xs px-2 py-0.5 rounded-full ${travel.status === "visited" ? "bg-emerald-500/10 text-emerald-400" : "bg-accent-glow text-accent"}`}
									>
										{travel.status}
									</span>
								</div>
							</Card>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
