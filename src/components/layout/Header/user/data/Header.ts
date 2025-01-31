import { FiHome } from "react-icons/fi";

import { RiUserFill } from "react-icons/ri";

import { MdFeaturedPlayList } from "react-icons/md";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/users/dashboard",
  },

  {
    icon: RiUserFill,
    label: "Profile",
    href: "/users/dashboard/profile",
    subItems: [
      { label: "Profile", href: "/users/dashboard/profile" },
      { label: "Bank & Kartu", href: "/users/dashboard/profile/payment" },
      { label: "Alamat", href: "/users/dashboard/profile/address" },
      { label: "Pengaturan Privasi", href: "/users/dashboard/profile/privacy" },
    ],
  },

  {
    icon: MdFeaturedPlayList,
    label: "Pesanan",
    href: "/users/dashboard/order",
    subItems: [
      { label: "Daftar Pesanan", href: "/users/dashboard/order" },
      { label: "Belum Dibayar", href: "/users/dashboard/order/unpaid" },
      { label: "Dikirim", href: "/users/dashboard/order/shipped" },
      { label: "Selesai", href: "/users/dashboard/order/completed" },
      { label: "Dibatalkan", href: "/users/dashboard/order/canceled" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
