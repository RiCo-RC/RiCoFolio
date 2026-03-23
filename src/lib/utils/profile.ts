import { Profile } from "@src/types";

export const matchesProfile = (
	itemProfiles: Profile[],
	activeProfile: Profile,
): boolean => {
	if (activeProfile === "hybrid") return true;
	return (
		itemProfiles.includes(activeProfile) || itemProfiles.includes("hybrid")
	);
};

export const accentColorForProfile = (profile: Profile): string => {
	const map: Record<Profile, string> = {
		hybrid: "#8b5cf6",
		dev: "#6366f1",
		cyber: "#10b981",
		ai: "#f59e0b",
		"project manager": "#1E3A8A",
	};
	return map[profile];
};

export const profileLabel = (profile: Profile, lang: string = "en"): string => {
	const map: Record<Profile, Record<string, string>> = {
		hybrid: { en: "Hybrid", fr: "Hybride", zh: "混合" },
		dev: { en: "Dev", fr: "Dev", zh: "开发" },
		cyber: { en: "Cyber", fr: "Cyber", zh: "网安" },
		ai: { en: "AI", fr: "IA", zh: "人工智能" },
		"project manager": { en: "Project Manager", fr: "Chef de Projet", zh: "项目经理" },
	};
	return map[profile][lang] ?? map[profile]["en"];
};
