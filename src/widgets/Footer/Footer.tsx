"use client";

import { useT } from "@/src/lib/i18n";
import { Button, Modal } from "@src/components";
import { useState } from "react";

const Footer = () => {
	const t = useT();
	const [creditsOpen, setCreditsOpen] = useState(false);

	return (
		<>
			<footer className="border-t border-border bg-surface mt-auto">
				<div className="page-container py-4 flex items-center justify-between gap-4 flex-wrap">
					<span className="text-xs text-text-secondary">
						{t.global.footer.copyright}
					</span>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setCreditsOpen(true)}
						className="text-xs"
					>
						{t.global.footer.credits}
					</Button>
				</div>
			</footer>

			<Modal
				open={creditsOpen}
				onClose={() => setCreditsOpen(false)}
				title={t.global.credits.title}
				size="md"
				footer={
					<Button variant="secondary" onClick={() => setCreditsOpen(false)}>
						{t.global.common.close}
					</Button>
				}
			>
				<div className="flex flex-col gap-6">
					<section>
						<h3 className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 font-mono">
							{t.global.credits.stack}
						</h3>
						<ul className="flex flex-col gap-2">
							{t.global.credits.stackItems.map((item) => (
								<li
									key={item}
									className="flex items-center gap-2 text-sm text-text-secondary"
								>
									<span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
									{item}
								</li>
							))}
						</ul>
					</section>
					<section>
						<h3 className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 font-mono">
							{t.global.credits.design}
						</h3>
						<ul className="flex flex-col gap-2">
							{t.global.credits.designItems.map((item) => (
								<li
									key={item}
									className="flex items-center gap-2 text-sm text-text-secondary"
								>
									<span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
									{item}
								</li>
							))}
						</ul>
					</section>
				</div>
			</Modal>
		</>
	);
};

export default Footer;
