"use client";

import { motion } from "framer-motion";
import {
	MessageCircle,
	Mail,
	ExternalLink,
} from "lucide-react";

import { useT } from "@src/lib";
import { SectionHero, Card, Button } from "@src/components";

const CONTACTS = [
	{
		category: "professional",
		items: [
			{
				icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"/></svg>,
				label: "LinkedIn",
				handle: "christopher-rieffel",
				url: "https://www.linkedin.com/in/christopher-r-915831372/",
				color: "#0077B5",
			},
			{
				icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
				label: "GitHub",
				handle: "RiCo-RC",
				url: "https://github.com/RiCo-RC",
				color: "#6e40c9",
			},
			{
				icon: <Mail size={20} />,
				label: "Email",
				handle: "christopher.rico.rieffel@gmail.com",
				url: "mailto:christopher.rico.rieffel@gmail.com",
				color: "#8b5cf6",
			},
		],
	},
	{
		category: "community",
		items: [
			{
				icon: <MessageCircle size={20} />,
				label: "Discord",
				handle: "rico_dev",
				url: "#",
				color: "#5865F2",
			},
			// {
			// 	icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/></svg>,
			// 	label: "Twitter / X",
			// 	handle: "@rico_dev",
			// 	url: "https://x.com/rico_dev",
			// 	color: "#1DA1F2",
			// },
			// {
			// 	icon: <ExternalLink size={20} />,
			// 	label: "Reddit",
			// 	handle: "u/rico_dev",
			// 	url: "https://reddit.com/u/rico_dev",
			// 	color: "#FF4500",
			// },
		],
	},
	{
		category: "asian",
		items: [
			{
				icon: <MessageCircle size={20} />,
				label: "WeChat",
				handle: "rico_dev",
				url: "#",
				color: "#07C160",
			},
			{
				icon: <ExternalLink size={20} />,
				label: "Weibo",
				handle: "@rico_dev",
				url: "#",
				color: "#E6162D",
			},
		],
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

export default function ContactPage() {
	const t = useT();

	return (
		<div>
			<SectionHero
				title={t.pages.contact.heroTitle}
				description={t.pages.contact.heroDescription}
				badge="Contact"
			>
				<p className="text-sm text-text-secondary mt-4 font-mono">
					{t.pages.contact.note}
				</p>
			</SectionHero>

			<div className="page-container py-12 flex flex-col gap-12">
				{CONTACTS.map(({ category, items }, catIdx) => (
					<section key={category}>
						<h2 className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-6 flex items-center gap-2">
							<span className="w-4 h-px bg--accent" />
							{
								t.pages.contact[
									category === "professional"
										? "professionalChannels"
										: category === "community"
											? "communityChannels"
											: "asianChannels"
								]
							}
						</h2>
						<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
							{items.map((item, i) => (
								<motion.div
									key={item.label}
									variants={fadeUp}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									custom={catIdx * 3 + i}
								>
									<Card
										hover
										glow
										className="group cursor-pointer"
										onClick={() =>
											item.url !== "#" && window.open(item.url, "_blank")
										}
									>
										<div className="flex items-center gap-3">
											<span
												className="w-10 h-10 rounded-md flex items-center justify-center transition-all group-hover:scale-110"
												style={{
													background: item.color + "20",
													color: item.color,
												}}
											>
												{item.icon}
											</span>
											<div>
												<div className="font-semibold text-text-primary text-sm">
													{item.label}
												</div>
												<div className="text-xs text-text-secondary font-mono">
													{item.handle}
												</div>
											</div>
										</div>
										{item.url !== "#" && (
											<Button
												variant="outline"
												size="sm"
												className="mt-2 w-full"
												onClick={(e) => {
													e.stopPropagation();
													window.open(item.url, "_blank");
												}}
											>
												<ExternalLink size={12} />
												Contact
											</Button>
										)}
										{item.url === "#" && (
											<span className="text-xs text-text-secondary mt-2 font-mono">
												{t.global.common.onRequest}
											</span>
										)}
									</Card>
								</motion.div>
							))}
						</div>
					</section>
				))}
			</div>
		</div>
	);
}
