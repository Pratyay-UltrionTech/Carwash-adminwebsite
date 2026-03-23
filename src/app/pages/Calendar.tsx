import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CalendarFilters } from '../components/CalendarFilters';
import { CalendarView } from '../components/CalendarView';
import { BookingDetailsPanel } from '../components/BookingDetailsPanel';
import { Booking } from './Bookings';

export type ViewMode = 'day' | 'week' | 'month';
export type Resource = {
  id: string;
  name: string;
  type: 'bay' | 'driver';
};

const mockResources: Resource[] = [
  { id: 'bay-1', name: 'Wash Bay 1', type: 'bay' },
  { id: 'bay-2', name: 'Wash Bay 2', type: 'bay' },
  { id: 'driver-1', name: 'Driver 1', type: 'driver' },
  { id: 'driver-2', name: 'Driver 2', type: 'driver' },
  { id: 'driver-3', name: 'Driver 3', type: 'driver' },
];

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
    assignedStaff: 'Wash Bay 1',
    status: 'Completed',
    paymentStatus: 'Paid',
    customerEmail: 'sarah.j@email.com',
    vehicleModel: 'Toyota Camry 2022',
    vehicleColor: 'Silver',
    licensePlate: 'ABC123',
    price: 59.99,
    notes: 'Customer requested extra attention to wheels',
    addOns: ['Tire Shine', 'Air Freshener'],
    priceBreakdown: { service: 49.99, addOns: 5.00, tax: 5.00, total: 59.99 },
  },
  {
    id: 'BK-002',
    customerName: 'Michael Chen',
    phone: '+1 (555) 234-5678',
    vehicle: 'Honda Accord - XYZ789',
    service: 'Basic Wash',
    location: 'Mobile Service',
    date: '2026-03-22',
    time: '10:00 AM',
    assignedStaff: 'Driver 1',
    status: 'In Progress',
    paymentStatus: 'Paid',
    customerEmail: 'mchen@email.com',
    vehicleModel: 'Honda Accord 2021',
    vehicleColor: 'Black',
    licensePlate: 'XYZ789',
    price: 29.99,
    addOns: [],
    priceBreakdown: { service: 29.99, addOns: 0, tax: 0, total: 29.99 },
  },
  {
    id: 'BK-003',
    customerName: 'Emma Williams',
    phone: '+1 (555) 345-6789',
    vehicle: 'BMW X5 - DEF456',
    service: 'Deluxe Detailing',
    location: 'Downtown Branch',
    date: '2026-03-22',
    time: '11:00 AM',
    assignedStaff: 'Wash Bay 2',
    status: 'Scheduled',
    paymentStatus: 'Pending',
    customerEmail: 'emma.w@email.com',
    vehicleModel: 'BMW X5 2023',
    vehicleColor: 'White',
    licensePlate: 'DEF456',
    price: 169.99,
    notes: 'Premium customer - VIP treatment',
    addOns: ['Wax Protection', 'Interior Vacuum', 'Window Treatment'],
    priceBreakdown: { service: 149.99, addOns: 15.00, tax: 5.00, total: 169.99 },
  },
  {
    id: 'BK-004',
    customerName: 'David Brown',
    phone: '+1 (555) 456-7890',
    vehicle: 'Tesla Model 3 - GHI789',
    service: 'Express Wash',
    location: 'Downtown Branch',
    date: '2026-03-22',
    time: '02:00 PM',
    assignedStaff: 'Wash Bay 1',
    status: 'Scheduled',
    paymentStatus: 'Paid',
    customerEmail: 'dbrown@email.com',
    vehicleModel: 'Tesla Model 3 2023',
    vehicleColor: 'Blue',
    licensePlate: 'GHI789',
    price: 24.99,
    addOns: [],
    priceBreakdown: { service: 24.99, addOns: 0, tax: 0, total: 24.99 },
  },
  {
    id: 'BK-005',
    customerName: 'Lisa Anderson',
    phone: '+1 (555) 567-8901',
    vehicle: 'Mercedes C-Class - JKL012',
    service: 'Interior Cleaning',
    location: 'Downtown Branch',
    date: '2026-03-22',
    time: '03:00 PM',
    assignedStaff: 'Driver 2',
    status: 'Scheduled',
    paymentStatus: 'Paid',
    customerEmail: 'lisa.a@email.com',
    vehicleModel: 'Mercedes C-Class 2022',
    vehicleColor: 'Gray',
    licensePlate: 'JKL012',
    price: 84.99,
    addOns: ['Leather Treatment'],
    priceBreakdown: { service: 79.99, addOns: 5.00, tax: 0, total: 84.99 },
  },
  {
    id: 'BK-006',
    customerName: 'Amanda Foster',
    phone: '+1 (555) 789-0123',
    vehicle: 'Audi A4 - PQR678',
    service: 'Basic Wash',
    location: 'Downtown Branch',
    date: '2026-03-23',
    time: '09:00 AM',
    assignedStaff: 'Wash Bay 1',
    status: 'Scheduled',
    paymentStatus: 'Paid',
    customerEmail: 'afoster@email.com',
    vehicleModel: 'Audi A4 2023',
    vehicleColor: 'Black',
    licensePlate: 'PQR678',
    price: 29.99,
    addOns: [],
    priceBreakdown: { service: 29.99, addOns: 0, tax: 0, total: 29.99 },
  },
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date('2026-03-22'));
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleBookingMove = (bookingId: string, newResource: string, newTime: string) => {
    const updated = bookings.map(b =>
      b.id === bookingId ? { ...b, assignedStaff: newResource, time: newTime } : b
    );
    setBookings(updated);
    console.log(`Moved booking ${bookingId} to ${newResource} at ${newTime}`);
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsPanelOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <CalendarFilters
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <CalendarView
          selectedDate={selectedDate}
          viewMode={viewMode}
          bookings={bookings}
          resources={mockResources}
          onBookingMove={handleBookingMove}
          onBookingClick={handleBookingClick}
        />
        {selectedBooking && (
          <BookingDetailsPanel
            booking={selectedBooking}
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
          />
        )}
      </div>
    </DndProvider>
  );
}
