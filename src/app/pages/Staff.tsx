import { useState } from 'react';
import { Plus, Eye, Edit } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: 'Branch Washer' | 'Driver' | 'Manager';
  phone: string;
  email: string;
  assignedBranch: string;
  availability: 'Available' | 'On Job' | 'Off Duty';
  status: 'Active' | 'Inactive';
}

const mockStaff: StaffMember[] = [
  {
    id: 'STAFF-001',
    name: 'John Smith',
    role: 'Branch Washer',
    phone: '+1 (555) 111-2222',
    email: 'john.smith@carwash.com',
    assignedBranch: 'Downtown Branch',
    availability: 'Available',
    status: 'Active',
  },
  {
    id: 'STAFF-002',
    name: 'Mike Driver',
    role: 'Driver',
    phone: '+1 (555) 222-3333',
    email: 'mike.driver@carwash.com',
    assignedBranch: 'Mobile Service',
    availability: 'On Job',
    status: 'Active',
  },
  {
    id: 'STAFF-003',
    name: 'David Martinez',
    role: 'Branch Washer',
    phone: '+1 (555) 333-4444',
    email: 'david.m@carwash.com',
    assignedBranch: 'Westside Branch',
    availability: 'Available',
    status: 'Active',
  },
  {
    id: 'STAFF-004',
    name: 'Sarah Lee',
    role: 'Manager',
    phone: '+1 (555) 444-5555',
    email: 'sarah.lee@carwash.com',
    assignedBranch: 'Downtown Branch',
    availability: 'Available',
    status: 'Active',
  },
  {
    id: 'STAFF-005',
    name: 'Tom Driver',
    role: 'Driver',
    phone: '+1 (555) 555-6666',
    email: 'tom.driver@carwash.com',
    assignedBranch: 'Mobile Service',
    availability: 'Off Duty',
    status: 'Active',
  },
];

const roleColors: Record<string, string> = {
  'Branch Washer': 'bg-blue-100 text-blue-700',
  'Driver': 'bg-purple-100 text-purple-700',
  'Manager': 'bg-green-100 text-green-700',
};

const availabilityColors: Record<string, string> = {
  'Available': 'bg-green-100 text-green-700',
  'On Job': 'bg-blue-100 text-blue-700',
  'Off Duty': 'bg-gray-100 text-gray-700',
};

export default function Staff() {
  const [staff] = useState<StaffMember[]>(mockStaff);

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Staff
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Staff Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Assigned Branch
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{member.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${roleColors[member.role]}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{member.phone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{member.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{member.assignedBranch}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${availabilityColors[member.availability]}`}>
                      {member.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
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
