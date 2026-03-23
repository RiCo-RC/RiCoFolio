export {
	SUPPORTED_LANGS,
	routeSlugs,
	slugToKey,
	type RouteKey,
	type SupportedLang,
} from "./routes";

export { useLocalizedPath, useLocalizedPaths } from "./useLocalizedPaths";

export { useT } from "./useT";

export { default as LangSync } from "./LangSync";

export { config, default as middleware } from "../../proxy";
