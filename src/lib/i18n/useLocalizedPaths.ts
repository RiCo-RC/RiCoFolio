"use client";

import { routeSlugs, type RouteKey } from './routes';
import { useAppStore } from '@src/stores';

export const useLocalizedPath = (key: RouteKey): string => {
	const { language } = useAppStore();
	const slug = routeSlugs[language]?.[key] ?? routeSlugs["en"][key];
	return `/${language}/${slug}`;
};

export const useLocalizedPaths = (): (key: RouteKey) => string => {
	const { language } = useAppStore();
	return (key: RouteKey) => {
		const slug = routeSlugs[language]?.[key] ?? routeSlugs["en"][key];
		return `/${language}/${slug}`;
	};
};