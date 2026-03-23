import { Metadata } from 'next';
import { ReactNode } from 'react';

import { SUPPORTED_LANGS, LangSync } from '@src/lib';

export const generateStaticParams = async () => (
  SUPPORTED_LANGS.map((lang) => ({ lang }))
);

export const generateMetadata = async ({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> => {
  const { lang } = await params; 
  
  return {
    alternates: {
      languages: SUPPORTED_LANGS.reduce((acc, cur) => {
        acc[cur] = `/${cur}`;
        return acc;
      }, {} as Record<string, string>),
    },
    other: {
      'content-language': lang,
    },
  };
};

const LangLayout = async ({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  return <LangSync lang={lang}>{children}</LangSync>;
};

export default LangLayout;