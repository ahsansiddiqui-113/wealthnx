import { notFound } from 'next/navigation';
import CompareDetail from '@/src/page-components/CompareDetail.jsx';
import ComparePlaceholder from '@/src/page-components/ComparePlaceholder.jsx';
import { getCompareDetail } from '@/src/page-components/compareDetailData.js';
import { comparePages, getComparePage, compareSlugFromRoute } from '../../compare/comparePages';

export const dynamicParams = false;

export function generateStaticParams() {
  return comparePages.map(({ slug }) => ({ slug: `wealthnx-vs-${slug}` }));
}

export async function generateMetadata({ params }) {
  const { slug: route } = await params;
  const slug = compareSlugFromRoute(route);
  const page = slug && getComparePage(slug);
  if (!page) return {};
  const detail = getCompareDetail(slug);
  return {
    title: detail ? detail.metadata.title : `WealthNX vs ${page.name}`,
    ...(detail ? { description: detail.metadata.description } : {}),
    alternates: { canonical: `https://www.wealthnx.ai/comparison/${route}/` },
    ...(detail ? {} : { robots: { index: false, follow: true } }), // no copy yet: keep the placeholder out of search
  };
}

export default async function ComparisonDetailRoute({ params }) {
  const { slug: route } = await params;
  const slug = compareSlugFromRoute(route);
  const page = slug && getComparePage(slug);
  if (!page) notFound();
  return <main>{getCompareDetail(slug) ? <CompareDetail slug={slug} name={page.name} /> : <ComparePlaceholder name={page.name} />}</main>;
}
