import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Personal Finance App Comparison for 2026 | WealthNX',
  alternates: { canonical: 'https://www.wealthnx.ai/comparison/' },
  robots: { index: false, follow: true },
};

/** The comparison pages live at /comparison/ now; this old address forwards there. */
export default function CompareRedirect() {
  redirect('/comparison/');
}
