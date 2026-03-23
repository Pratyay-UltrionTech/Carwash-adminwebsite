import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Calendar from "./pages/Calendar";
import Customers from "./pages/Customers";
import Vehicles from "./pages/Vehicles";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Promotions from "./pages/Promotions";
import Staff from "./pages/Staff";
import Branches from "./pages/Branches";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Loyalty from "./pages/Loyalty";

// Car Wash Admin Dashboard Routes Configuration - Updated
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "bookings", Component: Bookings },
      { path: "calendar", Component: Calendar },
      { path: "customers", Component: Customers },
      { path: "vehicles", Component: Vehicles },
      { path: "services", Component: Services },
      { path: "pricing", Component: Pricing },
      { path: "promotions", Component: Promotions },
      { path: "loyalty", Component: Loyalty },
      { path: "staff", Component: Staff },
      { path: "branches", Component: Branches },
      { path: "payments", Component: Payments },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
    ],
  },
]);