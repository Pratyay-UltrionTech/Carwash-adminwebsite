import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Gift, Star } from 'lucide-react';

interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number | null;
  discountPercentage: number;
  benefits: string[];
  color: string;
}

interface LoyaltyMember {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  currentPoints: number;
  tier: string;
  totalSpent: number;
  joinDate: string;
  lastActivity: string;
}

const mockTiers: LoyaltyTier[] = [
  {
    id: 'TIER-001',
    name: 'Bronze',
    minPoints: 0,
    maxPoints: 499,
    discountPercentage: 5,
    benefits: ['5% discount on all services', 'Birthday bonus points'],
    color: 'bg-amber-700',
  },
  {
    id: 'TIER-002',
    name: 'Silver',
    minPoints: 500,
    maxPoints: 999,
    discountPercentage: 10,
    benefits: ['10% discount on all services', 'Priority booking', 'Free air freshener monthly'],
    color: 'bg-gray-400',
  },
  {
    id: 'TIER-003',
    name: 'Gold',
    minPoints: 1000,
    maxPoints: 1999,
    discountPercentage: 15,
    benefits: ['15% discount on all services', 'Priority booking', 'Free monthly wash', 'Complimentary detailing quarterly'],
    color: 'bg-yellow-500',
  },
  {
    id: 'TIER-004',
    name: 'Platinum',
    minPoints: 2000,
    maxPoints: null,
    discountPercentage: 20,
    benefits: ['20% discount on all services', 'VIP priority booking', 'Free weekly wash', 'Complimentary detailing monthly', 'Dedicated account manager'],
    color: 'bg-purple-600',
  },
];

const mockMembers: LoyaltyMember[] = [
  {
    id: 'MEM-001',
    customerName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    currentPoints: 1250,
    tier: 'Gold',
    totalSpent: 3750,
    joinDate: '2025-01-15',
    lastActivity: '2026-03-22',
  },
  {
    id: 'MEM-002',
    customerName: 'Michael Chen',
    email: 'michael.c@email.com',
    phone: '+1 (555) 234-5678',
    currentPoints: 2350,
    tier: 'Platinum',
    totalSpent: 7050,
    joinDate: '2024-11-20',
    lastActivity: '2026-03-21',
  },
  {
    id: 'MEM-003',
    customerName: 'Emma Williams',
    email: 'emma.w@email.com',
    phone: '+1 (555) 345-6789',
    currentPoints: 750,
    tier: 'Silver',
    totalSpent: 2250,
    joinDate: '2025-03-10',
    lastActivity: '2026-03-20',
  },
  {
    id: 'MEM-004',
    customerName: 'David Brown',
    email: 'david.b@email.com',
    phone: '+1 (555) 456-7890',
    currentPoints: 350,
    tier: 'Bronze',
    totalSpent: 1050,
    joinDate: '2025-08-05',
    lastActivity: '2026-03-19',
  },
  {
    id: 'MEM-005',
    customerName: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    phone: '+1 (555) 567-8901',
    currentPoints: 1850,
    tier: 'Gold',
    totalSpent: 5550,
    joinDate: '2024-12-01',
    lastActivity: '2026-03-22',
  },
];

const tierColors: Record<string, string> = {
  'Bronze': 'bg-amber-100 text-amber-800 border-amber-300',
  'Silver': 'bg-gray-100 text-gray-800 border-gray-300',
  'Gold': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Platinum': 'bg-purple-100 text-purple-800 border-purple-300',
};

export default function Loyalty() {
  const [activeTab, setActiveTab] = useState<'members' | 'tiers' | 'settings'>('members');
  const [members] = useState<LoyaltyMember[]>(mockMembers);
  const [tiers] = useState<LoyaltyTier[]>(mockTiers);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    
    const matchesTier = tierFilter === 'all' || member.tier.toLowerCase() === tierFilter.toLowerCase();
    
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loyalty Program</h1>
          <p className="text-gray-500 mt-1">Manage loyalty tiers and member rewards</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8 px-6">
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'members'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab('tiers')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tiers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Loyalty Tiers
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="p-6 space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Member
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Name, email, or phone..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Tier
                </label>
                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="all">All Tiers</option>
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="platinum">Platinum</option>
                </select>
              </div>
            </div>

            {/* Members Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Last Activity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{member.customerName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="text-gray-900">{member.email}</div>
                          <div className="text-gray-500">{member.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${tierColors[member.tier]}`}>
                          {member.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">{member.currentPoints}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900 font-medium">${member.totalSpent.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-700">{member.joinDate}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-700">{member.lastActivity}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tiers Tab */}
        {activeTab === 'tiers' && (
          <div className="p-6 space-y-6">
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add New Tier
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tiers.map((tier) => (
                <div key={tier.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${tier.color}`}></div>
                      <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Points Range:</span>
                      <span className="font-semibold text-gray-900">
                        {tier.minPoints} - {tier.maxPoints ? tier.maxPoints : '∞'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Discount:</span>
                      <span className="font-semibold text-green-600">{tier.discountPercentage}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      Benefits
                    </h4>
                    <ul className="space-y-1">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-6 space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Points Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Points per Dollar Spent
                  </label>
                  <input
                    type="number"
                    defaultValue="3"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Welcome Bonus Points
                  </label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birthday Bonus Points
                  </label>
                  <input
                    type="number"
                    defaultValue="50"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Points Expiration (days)
                  </label>
                  <input
                    type="number"
                    defaultValue="365"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
