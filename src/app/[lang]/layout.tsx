import { Metadata } from "next";
import { ReactNode } from "react";
import { SUPPORTED_LANGS, LangSync } from "@src/lib";

export const generateStaticParams = async () =>
	SUPPORTED_LANGS.map((lang) => ({ lang }));

export const generateMetadata = async ({
	params,
}: {
	params: { lang: string };
}): Promise<Metadata> => {
	const { lang } = params;
	return {
		alternates: {
			languages: SUPPORTED_LANGS.reduce(
				(acc, cur) => {
					acc[cur] = `/${cur}`;
					return acc;
				},
				{} as Record<string, string>,
			),
		},
		other: {
			"content-language": lang,
		},
	};
};

const LangLayout = ({
	children,
	params,
}: {
	children: ReactNode;
	params: { lang: string };
}) => {
	return <LangSync lang={params.lang}>{children}</LangSync>;
};

export default LangLayout;
