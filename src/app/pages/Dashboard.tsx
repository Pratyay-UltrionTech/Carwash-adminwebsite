import { StatCard } from '../components/StatCard';
import { BookingChart } from '../components/BookingChart';
import { RevenueChart } from '../components/RevenueChart';
import { RecentBookingsTable } from '../components/RecentBookingsTable';
import { Calendar, DollarSign, Briefcase, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value="1,247"
          icon={Calendar}
          trend="+12.5%"
          trendUp={true}
          color="blue"
        />
        <StatCard
          title="Today's Bookings"
          value="38"
          icon={Briefcase}
          trend="+5.2%"
          trendUp={true}
          color="green"
        />
        <StatCard
          title="Total Revenue"
          value="$45,890"
          icon={DollarSign}
          trend="+18.7%"
          trendUp={true}
          color="purple"
        />
        <StatCard
          title="Active Jobs"
          value="12"
          icon={CheckCircle}
          trend="-3.1%"
          trendUp={false}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingChart />
        <RevenueChart />
      </div>

      {/* Recent Bookings Table */}
      <RecentBookingsTable />
    </div>
  );
}
