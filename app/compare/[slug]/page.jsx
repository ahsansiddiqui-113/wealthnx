import { notFound } from 'next/navigation';
import CompareDetail from '@/src/page-components/CompareDetail.jsx';
import { getCompareDetail } from '@/src/page-components/compareDetailData.js';
import { comparePages, getComparePage } from '../comparePages';

export const dynamicParams = false;

export function generateStaticParams() {
  return comparePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) return {};
  const { metadata } = getCompareDetail(slug, page.name);
  return {
    ...metadata,
    alternates: { canonical: `https://www.wealthnx.ai/compare/${slug}/` },
    robots: { index: false, follow: true }, // keep noindex while parts of the pages are still TBD
  };
}

export default async function CompareDetailRoute({ params }) {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) notFound();
  return <main><CompareDetail slug={slug} name={page.name} /></main>;
}
