"use client";
import { useAppStore } from "@src/stores";

import {
  g_header as g_enHeader,
  g_profile as g_enProfile,
  g_nav as g_enNav,
  g_footer as g_enFooter,
  g_languages as g_enLanguages,
  g_credits as g_enCredits,
  g_status as g_enStatus,
  g_common as g_enCommon,
  p_home as p_enHome,
  p_profile as p_enProfile,
  p_projects as p_enProjects,
  p_skills as p_enSkills,
  p_education as p_enEducation,
  p_experience as p_enExperience,
  p_contact as p_enContact,
  p_cv as p_enCv,
  p_articles as p_enArticles,
  p_otherSites as p_enOtherSites,
} from "@src/locales/en";
import {
  g_header as g_frHeader,
  g_profile as g_frProfile,
  g_nav as g_frNav,
  g_footer as g_frFooter,
  g_languages as g_frLanguages,
  g_credits as g_frCredits,
  g_status as g_frStatus,
  g_common as g_frCommon,
  p_home as p_frHome,
  p_profile as p_frProfile,
  p_projects as p_frProjects,
  p_skills as p_frSkills,
  p_education as p_frEducation,
  p_experience as p_frExperience,
  p_contact as p_frContact,
  p_cv as p_frCv,
  p_articles as p_frArticles,
  p_otherSites as p_frOtherSites,
} from "@src/locales/fr";

const en = {
  global: {
    header: g_enHeader,
    profile: g_enProfile,
    nav: g_enNav,
    footer: g_enFooter,
    languages: g_enLanguages,
    credits: g_enCredits,
    status: g_enStatus,
    common: g_enCommon,
  },
  pages: {
    home: p_enHome,
    profile: p_enProfile,
    projects: p_enProjects,
    skills: p_enSkills,
    education: p_enEducation,
    experience: p_enExperience,
    contact: p_enContact,
    cv: p_enCv,
    articles: p_enArticles,
    otherSites: p_enOtherSites,
  },
};
const fr = {
  global: {
    header: g_frHeader,
    profile: g_frProfile,
    nav: g_frNav,
    footer: g_frFooter,
    languages: g_frLanguages,
    credits: g_frCredits,
    status: g_frStatus,
    common: g_frCommon,
  },
  pages: {
    home: p_frHome,
    profile: p_frProfile,
    projects: p_frProjects,
    skills: p_frSkills,
    education: p_frEducation,
    experience: p_frExperience,
    contact: p_frContact,
    cv: p_frCv,
    articles: p_frArticles,
    otherSites: p_frOtherSites,
  },
};

const translations: Record<string, typeof en> = { en, fr };

type TranslationKeys = typeof en;

/**
 * Usage :
 * const t = useT();
 * console.log(t.common);
 */
export const useT = (): TranslationKeys => {
	const { language } = useAppStore();
	return translations[language] ?? translations["en"];
};
