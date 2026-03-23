import { useState } from 'react';
import { Search, DollarSign, CreditCard, Banknote, Gift as TipIcon } from 'lucide-react';

interface Payment {
  id: string;
  bookingId: string;
  customer: string;
  amount: number;
  paymentMethod: 'Credit Card' | 'Cash' | 'Mobile Payment';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  tipAmount: number;
  date: string;
}

const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    bookingId: 'BK-001',
    customer: 'Sarah Johnson',
    amount: 59.99,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    tipAmount: 10.00,
    date: '2026-03-22',
  },
  {
    id: 'PAY-002',
    bookingId: 'BK-002',
    customer: 'Michael Chen',
    amount: 29.99,
    paymentMethod: 'Cash',
    paymentStatus: 'Paid',
    tipAmount: 5.00,
    date: '2026-03-22',
  },
  {
    id: 'PAY-003',
    bookingId: 'BK-003',
    customer: 'Emma Williams',
    amount: 169.99,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Pending',
    tipAmount: 0,
    date: '2026-03-22',
  },
  {
    id: 'PAY-004',
    bookingId: 'BK-004',
    customer: 'David Brown',
    amount: 24.99,
    paymentMethod: 'Mobile Payment',
    paymentStatus: 'Paid',
    tipAmount: 3.00,
    date: '2026-03-21',
  },
  {
    id: 'PAY-005',
    bookingId: 'BK-005',
    customer: 'Lisa Anderson',
    amount: 84.99,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    tipAmount: 15.00,
    date: '2026-03-21',
  },
];

const paymentStatusColors: Record<string, string> = {
  'Paid': 'bg-green-100 text-green-700',
  'Pending': 'bg-orange-100 text-orange-700',
  'Refunded': 'bg-gray-100 text-gray-700',
};

export default function Payments() {
  const [payments] = useState<Payment[]>(mockPayments);

  const totalRevenue = payments.filter(p => p.paymentStatus === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalTips = payments.filter(p => p.paymentStatus === 'Paid').reduce((sum, p) => sum + p.tipAmount, 0);
  const onlinePayments = payments.filter(p => p.paymentStatus === 'Paid' && (p.paymentMethod === 'Credit Card' || p.paymentMethod === 'Mobile Payment')).reduce((sum, p) => sum + p.amount, 0);
  const cashPayments = payments.filter(p => p.paymentStatus === 'Paid' && p.paymentMethod === 'Cash').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Online Payments</p>
              <p className="text-2xl font-bold text-gray-900">${onlinePayments.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Banknote className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cash Payments</p>
              <p className="text-2xl font-bold text-gray-900">${cashPayments.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TipIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tips Collected</p>
              <p className="text-2xl font-bold text-gray-900">${totalTips.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Payment ID or booking..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <input
              type="date"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
              <option value="all">All Methods</option>
              <option value="card">Credit Card</option>
              <option value="cash">Cash</option>
              <option value="mobile">Mobile Payment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tip Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{payment.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-blue-600 font-medium">{payment.bookingId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{payment.customer}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">${payment.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{payment.paymentMethod}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${paymentStatusColors[payment.paymentStatus]}`}>
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">${payment.tipAmount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{payment.date}</span>
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
