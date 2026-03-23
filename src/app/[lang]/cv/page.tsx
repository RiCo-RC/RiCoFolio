"use client";
import { motion } from "framer-motion";
import { Download, Zap, FileText } from "lucide-react";

import { useT } from "@src/lib";
import { SectionHero, Card, Button, Badge } from "@src/components";

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.1, duration: 0.4 },
	}),
};

const CVPage = () => {
	const t = useT();

	return (
		<div>
			<SectionHero
				title={t.pages.cv.heroTitle}
				description={t.pages.cv.heroDescription}
				badge="Resume"
			/>

			<div className="page-container py-16">
				<div className="grid md:grid-cols-2 gap-6 max-w-2xl">
					<motion.div
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						custom={0}
					>
						<Card hover glow className="gradient-border h-full">
							<FileText size={28} className="text-accent" />
							<div>
								<h3 className="font-bold text-text-primary mb-1">
									{t.pages.cv.paperCta}
								</h3>
								<p className="text-sm text-text-secondary">
									{t.pages.cv.paperDesc}
								</p>
							</div>
							<Button
								variant="primary"
								className="mt-auto"
								onClick={() =>
									window.open("/cv/christopher-rieffel-cv.pdf", "_blank")
								}
							>
								<Download size={15} />
								{t.pages.cv.paperCta}
							</Button>
						</Card>
					</motion.div>

					<motion.div
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						custom={1}
					>
						<Card hover glow className="h-full">
							<div className="flex items-center gap-2">
								<Zap size={28} className="text-accent-ai" />
								<Badge
									label="Beta"
									className="bg-amber-500/10 text-amber-400 border-amber-500/30"
								/>
							</div>
							<div>
								<h3 className="font-bold text-text-primary mb-1">
									{t.pages.cv.dynamicCta}
								</h3>
								<p className="text-sm text-text-secondary">
									{t.pages.cv.dynamicDesc}
								</p>
							</div>
							<div className="mt-auto space-y-3">
								<div className="text-xs font-mono text-text-secondary bg-surface-elevated rounded-md p-3 border border-border">
									<span className="text-accent">const</span> cv =
									generateFromPortfolio(
									<br />
									&nbsp;&nbsp;profile:{" "}
									<span className="text-amber-400">&apos;hybrid&apos;</span>
									<br />)
								</div>
								<Button variant="outline" className="w-full" disabled>
									<Zap size={15} />
									{t.global.common.comingSoon}
								</Button>
							</div>
						</Card>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default CVPage;