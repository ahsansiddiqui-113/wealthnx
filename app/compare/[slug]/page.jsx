import { redirect, notFound } from 'next/navigation';
import { comparePages, getComparePage } from '../comparePages';

export const dynamicParams = false;

export function generateStaticParams() {
  return comparePages.map(({ slug }) => ({ slug }));
}

export const metadata = { robots: { index: false, follow: true } };

/** The comparison pages live at /comparison/wealthnx-vs-<app>/ now; this old address forwards there. */
export default async function CompareDetailRedirect({ params }) {
  const { slug } = await params;
  if (!getComparePage(slug)) notFound();
  redirect(`/comparison/wealthnx-vs-${slug}/`);
}
