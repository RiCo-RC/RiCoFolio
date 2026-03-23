export const formatDate = (dateStr: string, locale: string = "en"): string => {
	if (dateStr === "present") {
		const map: Record<string, string> = {
			en: "Present",
			fr: "Aujourd'hui",
			zh: "至今",
		};
		return map[locale] ?? "Present";
	}
	const d = new Date(dateStr);
	return d.toLocaleDateString(
		locale === "zh" ? "zh-CN" : locale === "fr" ? "fr-FR" : "en-US",
		{
			month: "short",
			year: "numeric",
		},
	);
};
