import { useLocation } from 'react-router';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/bookings': 'Bookings',
  '/calendar': 'Calendar / Schedule',
  '/customers': 'Customers',
  '/vehicles': 'Vehicles',
  '/services': 'Services',
  '/pricing': 'Pricing Management',
  '/promotions': 'Promotions / Promo Codes',
  '/loyalty': 'Loyalty Program',
  '/staff': 'Staff & Drivers',
  '/branches': 'Branch Management',
  '/payments': 'Payments & Transactions',
  '/reports': 'Reports & Analytics',
  '/settings': 'System Settings',
};

export function usePageTitle() {
  const location = useLocation();
  return pageTitles[location.pathname] || 'Dashboard';
}