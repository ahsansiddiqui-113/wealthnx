import AdminApp from '@/src/admin/AdminApp';

export const metadata = {
  title: 'Admin - WealthNX',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
