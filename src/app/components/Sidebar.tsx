import { 
  LayoutDashboard, 
  Calendar, 
  CalendarDays,
  Users, 
  Wrench,
  DollarSign,
  Tag,
  UserCog,
  MapPin,
  CreditCard,
  FileText,
  Settings,
  Droplets,
  Car,
  Gift
} from 'lucide-react';
import { Link, useLocation } from 'react-router';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Bookings', path: '/bookings' },
  { icon: CalendarDays, label: 'Calendar / Schedule', path: '/calendar' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: Car, label: 'Vehicles', path: '/vehicles' },
  { icon: Wrench, label: 'Services', path: '/services' },
  { icon: DollarSign, label: 'Pricing', path: '/pricing' },
  { icon: Tag, label: 'Promotions', path: '/promotions' },
  { icon: Gift, label: 'Loyalty Program', path: '/loyalty' },
  { icon: UserCog, label: 'Staff / Drivers', path: '/staff' },
  { icon: MapPin, label: 'Branches', path: '/branches' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 rounded-lg p-2">
            <Droplets className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-800">CarWash</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}