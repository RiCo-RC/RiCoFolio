import { Metadata } from 'next'; 
import { ReactNode, Suspense } from 'react';
import { SUPPORTED_LANGS, LangSync } from '@src/lib';

export const generateStaticParams = async () => (
  SUPPORTED_LANGS.map((lang) => ({ lang }))
);

export const generateMetadata = async ({ params }: { params: { lang: string } }): Promise<Metadata> => {
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

const LangLayout = ({ children, params }: { children: ReactNode; params: { lang: string } }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AsyncLangSync lang={params.lang}>{children}</AsyncLangSync>
    </Suspense>
  );
};

export default LangLayout;

const AsyncLangSync = async ({ lang, children }: { lang: string; children: ReactNode }) => {
  const data = await lang; 
  return <LangSync lang={data}>{children}</LangSync>;
};