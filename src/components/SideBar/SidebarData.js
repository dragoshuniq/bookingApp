import { ReactComponent as Dashboard } from "../../assets/svg/dashboardIcon.svg";
import { ReactComponent as Service } from "../../assets/svg/serviceIcon.svg";
import { ReactComponent as Booking } from "../../assets/svg/bookingIcon.svg";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <Dashboard />,
  },
  {
    title: "Services",
    path: "/services",
    icon: <Service />,
  },
  {
    title: "Bookings",
    path: "/bookings",
    icon: <Booking />,
  },
];
