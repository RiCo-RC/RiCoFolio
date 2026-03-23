"use client";

import { PropsWithChildren, useEffect, useState, createContext } from "react";

import { useAppStore } from "@src/stores";
import type { Component } from "@src/types";

type AppContextType = {
	is404: boolean;
	setIs404: (value: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: Component<PropsWithChildren> = ({ children }) => {
	const [is404, setIs404] = useState(false);
	const { theme, profile, language, disableAnimations, reduceAnimations } =
		useAppStore();

	useEffect(() => {
		const root = document.documentElement;
		root.setAttribute("lang", language);
		root.setAttribute("data-theme", theme);
		root.setAttribute("data-profile", profile);
		root.setAttribute("data-disabled-animations", String(disableAnimations));
		root.setAttribute("data-reduce-animations", String(reduceAnimations));
	}, [theme, profile, language, disableAnimations, reduceAnimations]);

	return (
		<AppContext.Provider value={{ is404, setIs404 }}>
			{children}
		</AppContext.Provider>
	);
};
