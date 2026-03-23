import { NextRequest, NextResponse } from "next/server";

import { SUPPORTED_LANGS, routeSlugs, slugToKey } from "./lib/i18n/routes";

const DEFAULT_LANG = "en";

const detectLang = (req: NextRequest): string => {
	const acceptLang = req.headers.get("accept-language") ?? "";
	const preferred =
		acceptLang.split(",")[0]?.split("-")[0]?.toLowerCase() ?? "";
	return (SUPPORTED_LANGS as readonly string[]).includes(preferred)
		? preferred
		: DEFAULT_LANG;
};

const middleware = (req: NextRequest) => {
	const { pathname } = req.nextUrl;

	// Skip static files and Next internals
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.includes(".") ||
		pathname === "/favicon.ico"
	) {
		return NextResponse.next();
	}

	const segments = pathname.split("/").filter(Boolean);

	// Root → redirect to /{detectedLang}
	if (segments.length === 0) {
		const lang = detectLang(req);
		return NextResponse.redirect(new URL(`/${lang}`, req.url));
	}

	const [maybeLang, ...rest] = segments;

	// If first segment is not a supported lang → redirect to /{detectedLang}/{rest}
	if (!(SUPPORTED_LANGS as readonly string[]).includes(maybeLang)) {
		const lang = detectLang(req);
		const newPath = `/${lang}/${segments.join("/")}`;
		return NextResponse.redirect(new URL(newPath, req.url));
	}

	const lang = maybeLang;

	// If no more segments → serve /{lang} (home)
	if (rest.length === 0) return NextResponse.next();

	// Check if the slug needs rewriting (localized → canonical English folder name)
	const localSlug = rest[0];
	const canonicalKey = slugToKey[lang]?.[localSlug];

	if (!canonicalKey) return NextResponse.next(); // unknown slug, let Next handle 404

	const canonicalSlug = routeSlugs["en"][canonicalKey];

	// If already canonical, nothing to rewrite
	if (localSlug === canonicalSlug) return NextResponse.next();

	// Rewrite: browser keeps localized URL, Next.js serves canonical folder
	const rewritten = new URL(req.url);
	rewritten.pathname = `/${lang}/${canonicalSlug}`;
	return NextResponse.rewrite(rewritten);
};

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default middleware;
