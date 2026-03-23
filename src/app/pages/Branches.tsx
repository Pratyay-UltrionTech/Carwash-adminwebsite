import { Plus, Edit, MapPin, Users, Clock } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  address: string;
  washBays: number;
  staffCount: number;
  operatingHours: string;
}

const mockBranches: Branch[] = [
  {
    id: 'BR-001',
    name: 'Downtown Branch',
    address: '123 Main Street, Downtown, CA 90001',
    washBays: 4,
    staffCount: 8,
    operatingHours: '8:00 AM - 8:00 PM',
  },
  {
    id: 'BR-002',
    name: 'Westside Branch',
    address: '456 West Avenue, Westside, CA 90002',
    washBays: 3,
    staffCount: 6,
    operatingHours: '9:00 AM - 7:00 PM',
  },
  {
    id: 'BR-003',
    name: 'Eastside Branch',
    address: '789 East Boulevard, Eastside, CA 90003',
    washBays: 2,
    staffCount: 4,
    operatingHours: '8:00 AM - 6:00 PM',
  },
];

export default function Branches() {
  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Branch
        </button>
      </div>

      {/* Branch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBranches.map((branch) => (
          <div key={branch.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{branch.name}</h3>
                <p className="text-sm text-gray-500">{branch.id}</p>
              </div>
              <button
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{branch.address}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Wash Bays</p>
                  <p className="text-lg font-semibold text-blue-600">{branch.washBays}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Staff</p>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-800">{branch.staffCount}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <Clock className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-700">{branch.operatingHours}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
