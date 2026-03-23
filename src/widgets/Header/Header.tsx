"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronRight,
	ExternalLink,
	Globe,
	Menu,
	Moon,
	Sun,
	User,
	X,
} from "lucide-react";

import { Button, Modal } from "@src/components";
import { type RouteKey, SUPPORTED_LANGS } from "@src/lib";
import { useAppStore } from "@src/stores";
import type { Language, Profile } from "@src/types";
import {
	cn,
	accentColorForProfile,
	profileLabel,
	useLocalizedPath,
	useLocalizedPaths,
	useT,
} from "@src/lib";

const NAV_MAIN_KEYS: RouteKey[] = [
	"home",
	"profile",
	"projects",
	"skills",
	"experience",
	"education",
	"contact",
];
const NAV_SECONDARY_KEYS: RouteKey[] = ["cv", "articles", "other-sites"];

const PROFILES: Profile[] = ["hybrid", "dev", "cyber", "ai", "project manager"];
const LANGUAGES: { code: Language; label: string; disabled?: boolean }[] = [
	{ code: "en", label: "English" },
	{ code: "fr", label: "Français" },
	{ code: "zh", label: "中文", disabled: true },
];

const Header = () => {
	const t = useT();
	const router = useRouter();
	const pathname = usePathname();
	const path = useLocalizedPaths();
	const { theme, toggleTheme, profile, setProfile, language, setLanguage } =
		useAppStore();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [langModal, setLangModal] = useState(false);
	const [profileModal, setProfileModal] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	const handleLangChange = (code: Language) => {
		setLanguage(code);
		setLangModal(false);
		router.push(`/${code}`);
	}

	// const handleLangChange = (code: string) => {
  //   const segments = window.location.pathname.split("/").filter(Boolean);
  //   const currentPage: Rou = segments.slice(1).join("/"); 

  //   const getTranslatedPath = (lang: string, path: RouteKey) => {
  //     const localizedPath = useLocalizedPath(path);
  //     return localizedPath;
  //   };

  //   const isLanguageInUrl = ["en", "fr", "de", "es", "it"].includes(segments[0]);

  //   const newPath = isLanguageInUrl
  //     ? `/${code}/${getTranslatedPath(code, currentPage)}`
  //     : `/${code}${currentPage ? "/" + getTranslatedPath(code, currentPage) : ""}`;

  //   setLanguage(code);
  //   router.push(newPath);
  // };
	
	const accentColor = accentColorForProfile(profile);

	return (
		<>
			<header
				className={cn(
					"fixed top-0 left-0 right-0 z-40 transition-all duration-(--motion-duration-normal)",
					scrolled
						? "h-(--header-height-shrunk) bg-bg/90 backdrop-blur-md border-b border-border"
						: "h-(--header-height) bg-transparent",
				)}
			>
				<div className="page-container h-full flex items-center justify-between gap-4">
					<Link
						href={path("home")}
						className="flex items-center gap-2 font-bold text-xl tracking-tight group"
						onClick={() => setMenuOpen(false)}
					>
						<span
							className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm font-black transition-all group-hover:shadow-[0_0_12px_var(--clr-accent-glow)]"
							style={{ background: accentColor }}
						>
							CR
						</span>
						<span className="text-text-primary hidden sm:block">RiCo</span>
					</Link>

					<div className="flex items-center gap-1">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setLangModal(true)}
							className="text-text-secondary font-mono text-xs uppercase"
							aria-label={t.global.header.language}
						>
							<Globe size={14} />
							{language.toUpperCase()}
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleTheme}
							aria-label={t.global.header.toggleTheme}
						>
							{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setProfileModal(true)}
							className="font-mono text-xs uppercase"
							style={{ color: accentColor }}
							aria-label={t.global.header.profile}
						>
							<User size={14} />
							{profileLabel(profile, language)}
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setMenuOpen(true)}
							aria-label={t.global.header.openMenu}
						>
							<Menu size={18} />
						</Button>
					</div>
				</div>
			</header>

			{/* Language modal */}
			<Modal
				open={langModal}
				onClose={() => setLangModal(false)}
				title={t.global.header.language}
				size="sm"
			>
				<div className="flex flex-col gap-2">
					{LANGUAGES.map((l) => (
						<button
							key={l.code}
							disabled={l.disabled}
							onClick={() => {
								if (!l.disabled) handleLangChange(l.code);
							}}
							className={cn(
								"flex items-center justify-between w-full px-4 py-3 rounded-md border transition-all text-left",
								language === l.code && !l.disabled
									? "border-accent bg-accent-glow text-accent"
									: "border-border hover:border-border-strong text-text-primary",
								l.disabled && "opacity-40 cursor-not-allowed",
							)}
						>
							<span className="font-medium">{l.label}</span>
							{l.disabled && (
								<span className="text-xs text-text-secondary">Soon</span>
							)}
							{language === l.code && !l.disabled && (
								<span className="w-2 h-2 rounded-full bg-accent" />
							)}
						</button>
					))}
				</div>
			</Modal>

			{/* Profile modal */}
			<Modal
				open={profileModal}
				onClose={() => setProfileModal(false)}
				title={t.global.header.profile}
				size="sm"
			>
				<div className="flex flex-col gap-2">
					{PROFILES.map((p) => {
						const color = accentColorForProfile(p);
						return (
							<button
								key={p}
								onClick={() => {
									setProfile(p);
									setProfileModal(false);
								}}
								className={cn(
									"flex items-center gap-3 w-full px-4 py-3 rounded-md border transition-all text-left",
									profile === p
										? "border-accent bg-accent-glow"
										: "border-border hover:border-border-strong",
								)}
							>
								<span
									className="w-3 h-3 rounded-full shrink-0"
									style={{ background: color }}
								/>
								<div>
									<div className="font-medium text-text-primary">
										{profileLabel(p, language)}
									</div>
									<div className="text-xs text-text-secondary">
										{t.global.profile.desc[p]}
									</div>
								</div>
								{profile === p && (
									<span
										className="ml-auto w-2 h-2 rounded-full"
										style={{ background: color }}
									/>
								)}
							</button>
						);
					})}
				</div>
			</Modal>

			{/* Fullscreen menu */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-50 bg-bg flex flex-col overflow-y-auto"
					>
						<div className="page-container flex items-center justify-between h-(--header-height) shrink-0">
							<Link
								href={path("home")}
								onClick={() => setMenuOpen(false)}
								className="flex items-center gap-2 font-bold text-xl"
							>
								<span
									className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm font-black"
									style={{ background: accentColor }}
								>
									CR
								</span>
								<span className="text-text-primary hidden sm:block">RiCo</span>
							</Link>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setMenuOpen(false)}
								aria-label="Close menu"
							>
								<X size={20} />
							</Button>
						</div>

						<div className="page-container flex-1 grid md:grid-cols-3 gap-12 py-12">
							<nav aria-label="Primary navigation">
								<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-4">
									Navigation
								</p>
								<ul className="flex flex-col gap-1">
									{NAV_MAIN_KEYS.map((key) => (
										<li key={key}>
											<Link
												href={path(key)}
												onClick={() => setMenuOpen(false)}
												className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-text-primary hover:text-accent transition-colors py-1 group"
											>
												<ChevronRight
													size={16}
													className="opacity-0 group-hover:opacity-100 transition-opacity text-accent"
												/>
												{
													t.global.nav[
														key === "other-sites"
															? "other-sites"
															: (key as keyof typeof t.global.nav)
													]
												}
											</Link>
										</li>
									))}
								</ul>
							</nav>

							<nav aria-label="Secondary navigation">
								<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-4">
									More
								</p>
								<ul className="flex flex-col gap-1">
									{NAV_SECONDARY_KEYS.map((key) => (
										<li key={key}>
											<Link
												href={path(key)}
												onClick={() => setMenuOpen(false)}
												className="flex items-center gap-2 text-xl font-medium text-text-secondary hover:text-text-primary transition-colors py-1"
											>
												<ExternalLink size={14} />
												{t.global.nav[key as keyof typeof t.global.nav]}
											</Link>
										</li>
									))}
								</ul>
								<div className="mt-8">
									<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-4">
										Stats
									</p>
									<div className="grid grid-cols-2 gap-3">
										{[
											{ label: "Projects", value: "0+" },
											{ label: "Skills", value: "0+" },
											{ label: "Articles", value: "0+" },
											{ label: "Commits", value: "0+" },
										].map((s) => (
											<div
												key={s.label}
												className="bg-surface border border-border rounded-md p-3"
											>
												<div className="text-xl font-bold text-accent">
													{s.value}
												</div>
												<div className="text-xs text-text-secondary">
													{s.label}
												</div>
											</div>
										))}
									</div>
								</div>
							</nav>

							<div>
								<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-4">
									Profile
								</p>
								<div className="flex flex-col gap-2">
									{PROFILES.map((p) => (
										<button
											key={p}
											onClick={() => setProfile(p)}
											className={cn(
												"flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all",
												profile === p
													? "border-accent text-accent"
													: "border-border text-text-secondary",
											)}
										>
											<span
												className="w-2 h-2 rounded-full"
												style={{ background: accentColorForProfile(p) }}
											/>
											{profileLabel(p, language)}
										</button>
									))}
								</div>
								<div className="mt-6">
									<p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-3">
										Lang
									</p>
									<div className="flex gap-2">
										{SUPPORTED_LANGS.map((l) => (
											<button
												key={l}
												onClick={() => handleLangChange(l as Language)}
												className={cn(
													"px-3 py-1.5 rounded-md border text-xs font-mono uppercase transition-all",
													language === l
														? "border-accent text-accent bg-accent-glow"
														: "border-border text-text-secondary",
												)}
											>
												{l}
											</button>
										))}
									</div>
								</div>
							</div>
						</div>

						<div className="page-container py-6 border-t border-border flex items-center justify-between gap-5">
							<span className="text-xs text-text-secondary">
								© 2026 Christopher Rieffel
							</span>
							<Link
								href={`${path("home")}#opportunities`}
								onClick={() => setMenuOpen(false)}
								className="text-sm font-medium text-accent hover:underline"
							>
								{t.global.footer.opportunities} →
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Header;
