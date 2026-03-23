"use client";

import { ReactNode, useEffect } from "react";

import { SUPPORTED_LANGS, type SupportedLang } from "./routes";
import { useAppStore } from "@src/stores";
import { Component } from "@/src/types";

interface LangSyncProps {
	lang: string;
	children: ReactNode;
}

const LangSync: Component<LangSyncProps> = ({ lang, children }) => {
	const setLanguage = useAppStore((s) => s.setLanguage);

	useEffect(() => {
		if ((SUPPORTED_LANGS as readonly string[]).includes(lang)) {
			setLanguage(lang as SupportedLang);
		}
	}, [lang, setLanguage]);

	return <>{children}</>;
};

export default LangSync;
