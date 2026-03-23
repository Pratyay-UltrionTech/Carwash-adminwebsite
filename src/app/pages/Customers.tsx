import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { CustomerProfilePanel } from '../components/CustomerProfilePanel';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicles: number;
  totalBookings: number;
  loyaltyPoints: number;
  lastBookingDate: string;
  vehiclesList?: string[];
  joinedDate?: string;
  totalSpent?: number;
}

const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'sarah.j@email.com',
    vehicles: 2,
    totalBookings: 45,
    loyaltyPoints: 1250,
    lastBookingDate: '2026-03-22',
    vehiclesList: ['Toyota Camry - ABC123', 'Honda CR-V - XYZ456'],
    joinedDate: '2025-01-15',
    totalSpent: 2245.50,
  },
  {
    id: 'CUST-002',
    name: 'Michael Chen',
    phone: '+1 (555) 234-5678',
    email: 'mchen@email.com',
    vehicles: 1,
    totalBookings: 28,
    loyaltyPoints: 890,
    lastBookingDate: '2026-03-20',
    vehiclesList: ['Honda Accord - XYZ789'],
    joinedDate: '2025-03-10',
    totalSpent: 1340.75,
  },
  {
    id: 'CUST-003',
    name: 'Emma Williams',
    phone: '+1 (555) 345-6789',
    email: 'emma.w@email.com',
    vehicles: 3,
    totalBookings: 62,
    loyaltyPoints: 2150,
    lastBookingDate: '2026-03-21',
    vehiclesList: ['BMW X5 - DEF456', 'Tesla Model 3 - GHI789', 'Audi A4 - JKL012'],
    joinedDate: '2024-11-05',
    totalSpent: 4890.25,
  },
  {
    id: 'CUST-004',
    name: 'David Brown',
    phone: '+1 (555) 456-7890',
    email: 'dbrown@email.com',
    vehicles: 1,
    totalBookings: 15,
    loyaltyPoints: 420,
    lastBookingDate: '2026-03-18',
    vehiclesList: ['Tesla Model 3 - MNO345'],
    joinedDate: '2025-06-20',
    totalSpent: 720.50,
  },
  {
    id: 'CUST-005',
    name: 'Lisa Anderson',
    phone: '+1 (555) 567-8901',
    email: 'lisa.a@email.com',
    vehicles: 2,
    totalBookings: 38,
    loyaltyPoints: 1100,
    lastBookingDate: '2026-03-19',
    vehiclesList: ['Mercedes C-Class - PQR678', 'BMW 3 Series - STU901'],
    joinedDate: '2025-02-28',
    totalSpent: 2850.00,
  },
];

export default function Customers() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loyaltyFilter, setLoyaltyFilter] = useState('all');
  const [bookingsFilter, setBookingsFilter] = useState('all');

  const handleFilter = (search: string, loyalty: string, bookings: string) => {
    let filtered = [...customers];

    if (search) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
      );
    }

    if (loyalty !== 'all') {
      if (loyalty === 'high') {
        filtered = filtered.filter(c => c.loyaltyPoints >= 1000);
      } else if (loyalty === 'medium') {
        filtered = filtered.filter(c => c.loyaltyPoints >= 500 && c.loyaltyPoints < 1000);
      } else if (loyalty === 'low') {
        filtered = filtered.filter(c => c.loyaltyPoints < 500);
      }
    }

    if (bookings !== 'all') {
      if (bookings === 'high') {
        filtered = filtered.filter(c => c.totalBookings >= 40);
      } else if (bookings === 'medium') {
        filtered = filtered.filter(c => c.totalBookings >= 20 && c.totalBookings < 40);
      } else if (bookings === 'low') {
        filtered = filtered.filter(c => c.totalBookings < 20);
      }
    }

    setFilteredCustomers(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    handleFilter(value, loyaltyFilter, bookingsFilter);
  };

  const handleLoyaltyFilterChange = (value: string) => {
    setLoyaltyFilter(value);
    handleFilter(searchTerm, value, bookingsFilter);
  };

  const handleBookingsFilterChange = (value: string) => {
    setBookingsFilter(value);
    handleFilter(searchTerm, loyaltyFilter, value);
  };

  const handleViewProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsPanelOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Customer
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Name, email, or phone..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loyalty Status
            </label>
            <select
              value={loyaltyFilter}
              onChange={(e) => handleLoyaltyFilterChange(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="all">All Customers</option>
              <option value="high">High (1000+ points)</option>
              <option value="medium">Medium (500-999 points)</option>
              <option value="low">Low (&lt;500 points)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Bookings
            </label>
            <select
              value={bookingsFilter}
              onChange={(e) => handleBookingsFilterChange(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="all">All Ranges</option>
              <option value="high">High (40+ bookings)</option>
              <option value="medium">Medium (20-39 bookings)</option>
              <option value="low">Low (&lt;20 bookings)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vehicles
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Loyalty Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Booking
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{customer.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700 font-medium">{customer.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{customer.phone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{customer.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {customer.vehicles}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700 font-medium">{customer.totalBookings}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      {customer.loyaltyPoints} pts
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{customer.lastBookingDate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewProfile(customer)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <CustomerProfilePanel
          customer={selectedCustomer}
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
        />
      )}
    </div>
  );
}
