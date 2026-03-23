import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Promotion {
  id: string;
  code: string;
  discountType: 'Fixed' | 'Percentage';
  discountValue: number;
  applicableServices: string;
  applicableVehicleType: string;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usedCount: number;
  status: 'Active' | 'Inactive' | 'Expired';
}

const mockPromotions: Promotion[] = [
  {
    id: 'PROMO-001',
    code: 'SPRING25',
    discountType: 'Percentage',
    discountValue: 25,
    applicableServices: 'All Services',
    applicableVehicleType: 'All Types',
    validFrom: '2026-03-01',
    validTo: '2026-03-31',
    usageLimit: 100,
    usedCount: 45,
    status: 'Active',
  },
  {
    id: 'PROMO-002',
    code: 'FIRSTTIME',
    discountType: 'Fixed',
    discountValue: 10,
    applicableServices: 'Premium Wash',
    applicableVehicleType: 'All Types',
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    usageLimit: 500,
    usedCount: 234,
    status: 'Active',
  },
  {
    id: 'PROMO-003',
    code: 'WEEKEND20',
    discountType: 'Percentage',
    discountValue: 20,
    applicableServices: 'Basic Wash',
    applicableVehicleType: 'Sedan, SUV',
    validFrom: '2026-03-15',
    validTo: '2026-03-31',
    usageLimit: 50,
    usedCount: 38,
    status: 'Active',
  },
];

export default function Promotions() {
  const [promotions] = useState<Promotion[]>(mockPromotions);

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Create Promo Code
        </button>
      </div>

      {/* Promotions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Discount Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Discount Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Applicable Services
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vehicle Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Valid From
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Valid To
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Usage
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
              {promotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-blue-600">{promo.code}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{promo.discountType}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">
                      {promo.discountType === 'Percentage' ? `${promo.discountValue}%` : `$${promo.discountValue}`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{promo.applicableServices}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{promo.applicableVehicleType}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{promo.validFrom}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{promo.validTo}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{promo.usedCount} / {promo.usageLimit}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      promo.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : promo.status === 'Expired'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
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
