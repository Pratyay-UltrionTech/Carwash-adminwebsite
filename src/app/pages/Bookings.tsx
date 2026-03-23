import { useState } from 'react';
import { BookingsTable } from '../components/BookingsTable';
import { BookingFilters } from '../components/BookingFilters';
import { BookingDetailsPanel } from '../components/BookingDetailsPanel';

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  vehicle: string;
  service: string;
  location: string;
  date: string;
  time: string;
  assignedStaff: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  customerEmail?: string;
  vehicleModel?: string;
  vehicleColor?: string;
  licensePlate?: string;
  price: number;
  notes?: string;
  addOns?: string[];
  priceBreakdown?: {
    service: number;
    addOns: number;
    tax: number;
    total: number;
  };
}

const mockBookings: Booking[] = [
  {
    id: 'BK-001',
    customerName: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    vehicle: 'Toyota Camry - ABC123',
    service: 'Premium Wash',
    location: 'Downtown Branch',
    date: '2026-03-22',
    time: '09:00 AM',
    assignedStaff: 'John Smith',
    status: 'Completed',
    paymentStatus: 'Paid',
    customerEmail: 'sarah.j@email.com',
    vehicleModel: 'Toyota Camry 2022',
    vehicleColor: 'Silver',
    licensePlate: 'ABC123',
    price: 59.99,
    notes: 'Customer requested extra attention to wheels',
    addOns: ['Tire Shine', 'Air Freshener'],
    priceBreakdown: {
      service: 49.99,
      addOns: 5.00,
      tax: 5.00,
      total: 59.99,
    },
  },
  {
    id: 'BK-002',
    customerName: 'Michael Chen',
    phone: '+1 (555) 234-5678',
    vehicle: 'Honda Accord - XYZ789',
    service: 'Basic Wash',
    location: 'Mobile Service',
    date: '2026-03-22',
    time: '10:30 AM',
    assignedStaff: 'Mike Driver',
    status: 'In Progress',
    paymentStatus: 'Paid',
    customerEmail: 'mchen@email.com',
    vehicleModel: 'Honda Accord 2021',
    vehicleColor: 'Black',
    licensePlate: 'XYZ789',
    price: 29.99,
    addOns: [],
    priceBreakdown: {
      service: 29.99,
      addOns: 0,
      tax: 0,
      total: 29.99,
    },
  },
  {
    id: 'BK-003',
    customerName: 'Emma Williams',
    phone: '+1 (555) 345-6789',
    vehicle: 'BMW X5 - DEF456',
    service: 'Deluxe Detailing',
    location: 'Westside Branch',
    date: '2026-03-22',
    time: '02:00 PM',
    assignedStaff: 'David Martinez',
    status: 'Scheduled',
    paymentStatus: 'Pending',
    customerEmail: 'emma.w@email.com',
    vehicleModel: 'BMW X5 2023',
    vehicleColor: 'White',
    licensePlate: 'DEF456',
    price: 169.99,
    notes: 'Premium customer - VIP treatment',
    addOns: ['Wax Protection', 'Interior Vacuum', 'Window Treatment'],
    priceBreakdown: {
      service: 149.99,
      addOns: 15.00,
      tax: 5.00,
      total: 169.99,
    },
  },
  {
    id: 'BK-004',
    customerName: 'David Brown',
    phone: '+1 (555) 456-7890',
    vehicle: 'Tesla Model 3 - GHI789',
    service: 'Express Wash',
    location: 'Downtown Branch',
    date: '2026-03-21',
    time: '11:00 AM',
    assignedStaff: 'John Smith',
    status: 'Completed',
    paymentStatus: 'Paid',
    customerEmail: 'dbrown@email.com',
    vehicleModel: 'Tesla Model 3 2023',
    vehicleColor: 'Blue',
    licensePlate: 'GHI789',
    price: 24.99,
    addOns: [],
    priceBreakdown: {
      service: 24.99,
      addOns: 0,
      tax: 0,
      total: 24.99,
    },
  },
  {
    id: 'BK-005',
    customerName: 'Lisa Anderson',
    phone: '+1 (555) 567-8901',
    vehicle: 'Mercedes C-Class - JKL012',
    service: 'Interior Cleaning',
    location: 'Eastside Branch',
    date: '2026-03-21',
    time: '03:30 PM',
    assignedStaff: 'Sarah Lee',
    status: 'Completed',
    paymentStatus: 'Paid',
    customerEmail: 'lisa.a@email.com',
    vehicleModel: 'Mercedes C-Class 2022',
    vehicleColor: 'Gray',
    licensePlate: 'JKL012',
    price: 84.99,
    addOns: ['Leather Treatment'],
    priceBreakdown: {
      service: 79.99,
      addOns: 5.00,
      tax: 0,
      total: 84.99,
    },
  },
  {
    id: 'BK-006',
    customerName: 'James Martinez',
    phone: '+1 (555) 678-9012',
    vehicle: 'Ford F-150 - MNO345',
    service: 'Premium Wash',
    location: 'Mobile Service',
    date: '2026-03-21',
    time: '01:00 PM',
    assignedStaff: 'Tom Driver',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    customerEmail: 'jmartinez@email.com',
    vehicleModel: 'Ford F-150 2021',
    vehicleColor: 'Red',
    licensePlate: 'MNO345',
    price: 49.99,
    notes: 'Customer cancelled due to weather',
    addOns: [],
    priceBreakdown: {
      service: 49.99,
      addOns: 0,
      tax: 0,
      total: 49.99,
    },
  },
  {
    id: 'BK-007',
    customerName: 'Amanda Foster',
    phone: '+1 (555) 789-0123',
    vehicle: 'Audi A4 - PQR678',
    service: 'Basic Wash',
    location: 'Downtown Branch',
    date: '2026-03-22',
    time: '04:00 PM',
    assignedStaff: 'John Smith',
    status: 'Scheduled',
    paymentStatus: 'Paid',
    customerEmail: 'afoster@email.com',
    vehicleModel: 'Audi A4 2023',
    vehicleColor: 'Black',
    licensePlate: 'PQR678',
    price: 29.99,
    addOns: [],
    priceBreakdown: {
      service: 29.99,
      addOns: 0,
      tax: 0,
      total: 29.99,
    },
  },
  {
    id: 'BK-008',
    customerName: 'Robert Taylor',
    phone: '+1 (555) 890-1234',
    vehicle: 'Lexus RX - STU901',
    service: 'Deluxe Detailing',
    location: 'Westside Branch',
    date: '2026-03-23',
    time: '10:00 AM',
    assignedStaff: 'David Martinez',
    status: 'Scheduled',
    paymentStatus: 'Pending',
    customerEmail: 'rtaylor@email.com',
    vehicleModel: 'Lexus RX 2022',
    vehicleColor: 'Silver',
    licensePlate: 'STU901',
    price: 149.99,
    addOns: ['Wax Protection'],
    priceBreakdown: {
      service: 149.99,
      addOns: 0,
      tax: 0,
      total: 149.99,
    },
  },
];

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleFilterChange = (filters: any) => {
    let filtered = [...bookings];

    if (filters.search) {
      filtered = filtered.filter(
        (booking) =>
          booking.id.toLowerCase().includes(filters.search.toLowerCase()) ||
          booking.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
          booking.phone.includes(filters.search)
      );
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter((booking) => booking.status === filters.status);
    }

    if (filters.service && filters.service !== 'all') {
      filtered = filtered.filter((booking) => booking.service === filters.service);
    }

    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter((booking) => booking.location === filters.location);
    }

    if (filters.paymentStatus && filters.paymentStatus !== 'all') {
      filtered = filtered.filter((booking) => booking.paymentStatus === filters.paymentStatus);
    }

    setFilteredBookings(filtered);
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsPanelOpen(true);
  };

  const handleStaffChange = (bookingId: string, newStaff: string) => {
    const updated = bookings.map(b => 
      b.id === bookingId ? { ...b, assignedStaff: newStaff } : b
    );
    setBookings(updated);
    setFilteredBookings(updated);
    console.log(`Updated staff for ${bookingId} to ${newStaff}`);
  };

  const handleStatusChange = (bookingId: string, newStatus: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled') => {
    const updated = bookings.map(b => 
      b.id === bookingId ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    setFilteredBookings(updated);
    console.log(`Updated status for ${bookingId} to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <BookingFilters onFilterChange={handleFilterChange} />
      <BookingsTable 
        bookings={filteredBookings} 
        onViewBooking={handleViewBooking}
        onStaffChange={handleStaffChange}
        onStatusChange={handleStatusChange}
      />
      {selectedBooking && (
        <BookingDetailsPanel
          booking={selectedBooking}
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
        />
      )}
    </div>
  );
}