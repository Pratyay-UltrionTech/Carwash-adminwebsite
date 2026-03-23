import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ServiceFormModal } from '../components/ServiceFormModal';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  priceSedan: number;
  priceSUV: number;
  priceTruck: number;
  status: 'Active' | 'Inactive';
}

const mockServices: Service[] = [
  {
    id: 'SRV-001',
    name: 'Premium Wash',
    description: 'Complete exterior wash with wax protection',
    duration: '45 mins',
    priceSedan: 49.99,
    priceSUV: 59.99,
    priceTruck: 69.99,
    status: 'Active',
  },
  {
    id: 'SRV-002',
    name: 'Basic Wash',
    description: 'Quick exterior wash and rinse',
    duration: '20 mins',
    priceSedan: 29.99,
    priceSUV: 34.99,
    priceTruck: 39.99,
    status: 'Active',
  },
  {
    id: 'SRV-003',
    name: 'Deluxe Detailing',
    description: 'Full interior and exterior detailing',
    duration: '2 hours',
    priceSedan: 149.99,
    priceSUV: 179.99,
    priceTruck: 199.99,
    status: 'Active',
  },
  {
    id: 'SRV-004',
    name: 'Express Wash',
    description: 'Fast exterior wash only',
    duration: '15 mins',
    priceSedan: 24.99,
    priceSUV: 29.99,
    priceTruck: 34.99,
    status: 'Active',
  },
  {
    id: 'SRV-005',
    name: 'Interior Cleaning',
    description: 'Deep interior vacuum and cleaning',
    duration: '60 mins',
    priceSedan: 79.99,
    priceSUV: 89.99,
    priceTruck: 99.99,
    status: 'Active',
  },
];

export default function Services() {
  const [services] = useState<Service[]>(mockServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleAddService = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = (service: Service) => {
    if (window.confirm(`Are you sure you want to delete ${service.name}?`)) {
      console.log('Delete service:', service.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-end">
        <button
          onClick={handleAddService}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price (Sedan)
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price (SUV)
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price (Truck)
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
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{service.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{service.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{service.duration}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">${service.priceSedan}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">${service.priceSUV}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">${service.priceTruck}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditService(service)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service)}
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

      {isModalOpen && (
        <ServiceFormModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
