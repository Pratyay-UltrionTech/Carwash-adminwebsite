import { Edit } from 'lucide-react';

interface PricingRule {
  id: string;
  service: string;
  vehicleType: string;
  basePrice: number;
  weekdayPrice: number;
  weekendPrice: number;
  morningDiscount: number;
  eveningPrice: number;
}

const mockPricingRules: PricingRule[] = [
  {
    id: 'PR-001',
    service: 'Premium Wash',
    vehicleType: 'Sedan',
    basePrice: 49.99,
    weekdayPrice: 44.99,
    weekendPrice: 54.99,
    morningDiscount: 10,
    eveningPrice: 49.99,
  },
  {
    id: 'PR-002',
    service: 'Premium Wash',
    vehicleType: 'SUV',
    basePrice: 59.99,
    weekdayPrice: 54.99,
    weekendPrice: 64.99,
    morningDiscount: 10,
    eveningPrice: 59.99,
  },
  {
    id: 'PR-003',
    service: 'Basic Wash',
    vehicleType: 'Sedan',
    basePrice: 29.99,
    weekdayPrice: 24.99,
    weekendPrice: 34.99,
    morningDiscount: 15,
    eveningPrice: 29.99,
  },
];

export default function Pricing() {
  return (
    <div className="space-y-6">
      {/* Pricing Configuration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Weekday Pricing</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Discount</span>
              <span className="font-medium text-blue-600">10% OFF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Days</span>
              <span className="font-medium text-gray-900">Mon-Fri</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Weekend Pricing</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Surcharge</span>
              <span className="font-medium text-orange-600">+$5.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Days</span>
              <span className="font-medium text-gray-900">Sat-Sun</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Morning Discount</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Discount</span>
              <span className="font-medium text-green-600">15% OFF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Time Slot</span>
              <span className="font-medium text-gray-900">8AM-10AM</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Evening Pricing</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Standard</span>
              <span className="font-medium text-gray-900">Base Price</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Time Slot</span>
              <span className="font-medium text-gray-900">5PM-8PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Rules Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Pricing Rules</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vehicle Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Base Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Weekday Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Weekend Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Morning Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Evening Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockPricingRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{rule.service}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{rule.vehicleType}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">${rule.basePrice}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-blue-600">${rule.weekdayPrice}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-orange-600">${rule.weekendPrice}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-green-600">{rule.morningDiscount}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">${rule.eveningPrice}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
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
