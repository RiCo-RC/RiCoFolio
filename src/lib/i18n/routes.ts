export type RouteKey =
  | 'home'
  | 'profile'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'contact'
  | 'cv'
  | 'articles'
  | 'other-sites';

export const routeSlugs: Record<string, Record<RouteKey, string>> = {
  en: {
    home:          '',
    profile:       'profile',
    projects:      'projects',
    skills:        'skills',
    experience:    'experience',
    education:     'education',
    contact:       'contact',
    cv:            'cv',
    articles:      'articles',
    'other-sites': 'other-sites',
  },
  fr: {
    home:          '',
    profile:       'profil',
    projects:      'projets',
    skills:        'competences',
    experience:    'experiences',
    education:     'formations',
    contact:       'contact',
    cv:            'cv',
    articles:      'articles',
    'other-sites': 'autres-sites',
  },
};

export const SUPPORTED_LANGS = ['en', 'fr'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

/** All localized slugs → canonical key, per lang */
export const slugToKey: Record<string, Record<string, RouteKey>> = {};
for (const lang of SUPPORTED_LANGS) {
  slugToKey[lang] = {};
  for (const [key, slug] of Object.entries(routeSlugs[lang])) {
    if (slug) slugToKey[lang][slug] = key as RouteKey;
  }
}
