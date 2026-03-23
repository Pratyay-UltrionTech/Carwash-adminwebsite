import { useState } from 'react';
import { Search, Eye } from 'lucide-react';

interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  type: 'Sedan' | 'SUV' | 'Truck';
  color: string;
  owner: string;
  ownerPhone: string;
  totalBookings: number;
  lastService: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: 'VEH-001',
    licensePlate: 'ABC123',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    type: 'Sedan',
    color: 'Silver',
    owner: 'Sarah Johnson',
    ownerPhone: '+1 (555) 123-4567',
    totalBookings: 25,
    lastService: '2026-03-22',
  },
  {
    id: 'VEH-002',
    licensePlate: 'XYZ456',
    make: 'Honda',
    model: 'CR-V',
    year: 2021,
    type: 'SUV',
    color: 'Blue',
    owner: 'Sarah Johnson',
    ownerPhone: '+1 (555) 123-4567',
    totalBookings: 20,
    lastService: '2026-03-20',
  },
  {
    id: 'VEH-003',
    licensePlate: 'XYZ789',
    make: 'Honda',
    model: 'Accord',
    year: 2023,
    type: 'Sedan',
    color: 'Black',
    owner: 'Michael Chen',
    ownerPhone: '+1 (555) 234-5678',
    totalBookings: 28,
    lastService: '2026-03-20',
  },
  {
    id: 'VEH-004',
    licensePlate: 'DEF456',
    make: 'BMW',
    model: 'X5',
    year: 2023,
    type: 'SUV',
    color: 'White',
    owner: 'Emma Williams',
    ownerPhone: '+1 (555) 345-6789',
    totalBookings: 35,
    lastService: '2026-03-21',
  },
  {
    id: 'VEH-005',
    licensePlate: 'GHI789',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    type: 'Sedan',
    color: 'Red',
    owner: 'Emma Williams',
    ownerPhone: '+1 (555) 345-6789',
    totalBookings: 18,
    lastService: '2026-03-19',
  },
  {
    id: 'VEH-006',
    licensePlate: 'JKL012',
    make: 'Audi',
    model: 'A4',
    year: 2022,
    type: 'Sedan',
    color: 'Gray',
    owner: 'Emma Williams',
    ownerPhone: '+1 (555) 345-6789',
    totalBookings: 9,
    lastService: '2026-03-15',
  },
  {
    id: 'VEH-007',
    licensePlate: 'MNO345',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    type: 'Sedan',
    color: 'Blue',
    owner: 'David Brown',
    ownerPhone: '+1 (555) 456-7890',
    totalBookings: 15,
    lastService: '2026-03-18',
  },
  {
    id: 'VEH-008',
    licensePlate: 'PQR678',
    make: 'Mercedes',
    model: 'C-Class',
    year: 2023,
    type: 'Sedan',
    color: 'Black',
    owner: 'Lisa Anderson',
    ownerPhone: '+1 (555) 567-8901',
    totalBookings: 22,
    lastService: '2026-03-19',
  },
];

const vehicleTypeColors: Record<string, string> = {
  'Sedan': 'bg-blue-100 text-blue-700',
  'SUV': 'bg-purple-100 text-purple-700',
  'Truck': 'bg-orange-100 text-orange-700',
};

export default function Vehicles() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');

  const handleFilter = (search: string, type: string) => {
    let filtered = [...vehicles];

    if (search) {
      filtered = filtered.filter(v =>
        v.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
        v.make.toLowerCase().includes(search.toLowerCase()) ||
        v.model.toLowerCase().includes(search.toLowerCase()) ||
        v.owner.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== 'all') {
      filtered = filtered.filter(v => v.type.toLowerCase() === type.toLowerCase());
    }

    setFilteredVehicles(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    handleFilter(value, vehicleTypeFilter);
  };

  const handleTypeFilterChange = (value: string) => {
    setVehicleTypeFilter(value);
    handleFilter(searchTerm, value);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Vehicle
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="License plate, make, model, or owner..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Type
            </label>
            <select
              value={vehicleTypeFilter}
              onChange={(e) => handleTypeFilterChange(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="all">All Types</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="truck">Truck</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  License Plate
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Make & Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Owner Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">{vehicle.licensePlate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{vehicle.make} {vehicle.model}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{vehicle.year}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${vehicleTypeColors[vehicle.type]}`}>
                      {vehicle.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{vehicle.color}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700 font-medium">{vehicle.owner}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{vehicle.ownerPhone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700 font-medium">{vehicle.totalBookings}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{vehicle.lastService}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
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
    </div>
  );
}
