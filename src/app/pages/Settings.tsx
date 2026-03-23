import { useState } from 'react';
import { Save, UserPlus, Edit, Lock, Power } from 'lucide-react';

type SettingsTab = 'general' | 'hours' | 'payment' | 'notifications' | 'loyalty' | 'permissions';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberRole, setNewMemberRole] = useState<'Manager' | 'Staff'>('Manager');

  const [managerPermissions, setManagerPermissions] = useState({
    viewBookings: true,
    manageBookings: true,
    manageStaff: true,
    viewReports: true,
    manageSchedule: true,
    manageCustomers: true,
  });

  const [staffPermissions, setStaffPermissions] = useState({
    viewAssignedBookings: true,
    updateBookingStatus: true,
    viewSchedule: true,
    viewAssignedJobsOnly: true,
  });

  // Mock data for existing users
  const managers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@carwash.com',
      phone: '+1 (555) 123-4567',
      branch: 'Downtown Branch',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@carwash.com',
      phone: '+1 (555) 234-5678',
      branch: 'Uptown Branch',
      status: 'Active',
    },
  ];

  const staff = [
    {
      id: 1,
      name: 'Mike Wilson',
      email: 'mike.wilson@carwash.com',
      phone: '+1 (555) 345-6789',
      branch: 'Downtown Branch',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Emily Davis',
      email: 'emily.davis@carwash.com',
      phone: '+1 (555) 456-7890',
      branch: 'Downtown Branch',
      status: 'Active',
    },
    {
      id: 3,
      name: 'David Brown',
      email: 'david.brown@carwash.com',
      phone: '+1 (555) 567-8901',
      branch: 'Uptown Branch',
      status: 'Inactive',
    },
  ];

  const handleAddMember = (role: 'Manager' | 'Staff') => {
    setNewMemberRole(role);
    setShowAddMemberModal(true);
  };

  const tabs = [
    { id: 'general' as SettingsTab, label: 'General Settings' },
    { id: 'hours' as SettingsTab, label: 'Business Hours' },
    { id: 'payment' as SettingsTab, label: 'Payment Settings' },
    { id: 'notifications' as SettingsTab, label: 'Notifications' },
    { id: 'loyalty' as SettingsTab, label: 'Loyalty Program' },
    { id: 'permissions' as SettingsTab, label: 'Permissions' },
  ];

  return (
    <div className="space-y-6">
      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Add New {newMemberRole}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value as 'Manager' | 'Staff')}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    placeholder="username"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Branch *
                  </label>
                  <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="">Select Branch</option>
                    <option value="downtown">Downtown Branch</option>
                    <option value="uptown">Uptown Branch</option>
                    <option value="westside">Westside Branch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddMemberModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddMemberModal(false)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Save Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      defaultValue="CarWash Pro"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      defaultValue="support@carwash.com"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 000-0000"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hours' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Hours</h3>
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-32">
                      <span className="text-sm font-medium text-gray-700">{day}</span>
                    </div>
                    <input
                      type="time"
                      defaultValue="08:00"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      defaultValue="20:00"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-600">Closed</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Accept Credit Cards</p>
                    <p className="text-sm text-gray-500">Enable credit card payments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Accept Cash</p>
                    <p className="text-sm text-gray-500">Enable cash payments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Accept Mobile Payments</p>
                    <p className="text-sm text-gray-500">Enable Apple Pay, Google Pay, etc.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive email alerts for new bookings</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Send SMS alerts to customers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'loyalty' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Loyalty Program Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Points per Dollar Spent
                  </label>
                  <input
                    type="number"
                    defaultValue="10"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Points Redemption Rate
                  </label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">100 points = $1.00 discount</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">User Roles & Permissions</h3>
              
              {/* Manager Section */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">Manager</h4>
                  <button
                    onClick={() => handleAddMember('Manager')}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Member
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Permissions</p>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={managerPermissions.viewBookings}
                        onChange={(e) =>
                          setManagerPermissions({ ...managerPermissions, viewBookings: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">View Bookings</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={managerPermissions.manageBookings}
                        onChange={(e) =>
                          setManagerPermissions({ ...managerPermissions, manageBookings: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Manage Bookings</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={managerPermissions.manageStaff}
                        onChange={(e) =>
                          setManagerPermissions({ ...managerPermissions, manageStaff: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Manage Staff</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={managerPermissions.viewReports}
                        onChange={(e) =>
                          setManagerPermissions({ ...managerPermissions, viewReports: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">View Reports</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={managerPermissions.manageSchedule}
                        onChange={(e) =>
                          setManagerPermissions({ ...managerPermissions, manageSchedule: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Manage Schedule</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={managerPermissions.manageCustomers}
                        onChange={(e) =>
                          setManagerPermissions({ ...managerPermissions, manageCustomers: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Manage Customers</span>
                    </label>
                  </div>
                </div>

                {/* Manager Users Table */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Existing Managers</p>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Branch
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {managers.map((manager) => (
                          <tr key={manager.id}>
                            <td className="px-4 py-3 text-sm text-gray-800">{manager.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">Manager</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{manager.email}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{manager.phone}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{manager.branch}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  manager.status === 'Active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {manager.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  className="text-orange-600 hover:text-orange-800"
                                  title="Reset Password"
                                >
                                  <Lock className="w-4 h-4" />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-800"
                                  title="Disable"
                                >
                                  <Power className="w-4 h-4" />
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

              {/* Staff Section */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">Staff</h4>
                  <button
                    onClick={() => handleAddMember('Staff')}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Member
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Permissions</p>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={staffPermissions.viewAssignedBookings}
                        onChange={(e) =>
                          setStaffPermissions({ ...staffPermissions, viewAssignedBookings: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">View Assigned Bookings</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={staffPermissions.updateBookingStatus}
                        onChange={(e) =>
                          setStaffPermissions({ ...staffPermissions, updateBookingStatus: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Update Booking Status</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={staffPermissions.viewSchedule}
                        onChange={(e) =>
                          setStaffPermissions({ ...staffPermissions, viewSchedule: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">View Schedule</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={staffPermissions.viewAssignedJobsOnly}
                        onChange={(e) =>
                          setStaffPermissions({ ...staffPermissions, viewAssignedJobsOnly: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">View Assigned Jobs Only</span>
                    </label>
                  </div>
                </div>

                {/* Staff Users Table */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Existing Staff</p>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Branch
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {staff.map((member) => (
                          <tr key={member.id}>
                            <td className="px-4 py-3 text-sm text-gray-800">{member.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">Staff</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{member.email}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{member.phone}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{member.branch}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  member.status === 'Active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {member.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  className="text-orange-600 hover:text-orange-800"
                                  title="Reset Password"
                                >
                                  <Lock className="w-4 h-4" />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-800"
                                  title="Disable"
                                >
                                  <Power className="w-4 h-4" />
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
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}