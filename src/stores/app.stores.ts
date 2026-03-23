import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Theme, Profile, Language } from "@src/types";

interface AppStore {
	theme: Theme;
	profile: Profile;
	language: Language;
	disableAnimations: boolean;
	reduceAnimations: boolean;

	setTheme: (theme: Theme) => void;
	setProfile: (profile: Profile) => void;
	setLanguage: (language: Language) => void;
	toggleTheme: () => void;
	setDisableAnimations: (v: boolean) => void;
	setReduceAnimations: (v: boolean) => void;
}

export const useAppStore = create<AppStore>()(
	persist(
		(set) => ({
			theme: "dark",
			profile: "hybrid",
			language: "en",
			disableAnimations: false,
			reduceAnimations: false,

			setTheme: (theme) => set({ theme }),
			setProfile: (profile) => set({ profile }),
			setLanguage: (language) => set({ language }),
			toggleTheme: () =>
				set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
			setDisableAnimations: (v) => set({ disableAnimations: v }),
			setReduceAnimations: (v) => set({ reduceAnimations: v }),
		}),
		{ name: "rico-portfolio-store" },
	),
);
