import { FiHome } from "react-icons/fi";

import { RiUserFill } from "react-icons/ri";

import { MdFeaturedPlayList } from "react-icons/md";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/user/dashboard",
  },

  {
    icon: RiUserFill,
    label: "Profile",
    href: "/user/dashboard/profile",
    subItems: [
      { label: "Profile", href: "/user/dashboard/profile" },
      { label: "Bank & Kartu", href: "/user/dashboard/profile/payment" },
      { label: "Alamat", href: "/user/dashboard/profile/address" },
      { label: "Pengaturan Privasi", href: "/user/dashboard/profile/privacy" },
    ],
  },

  {
    icon: MdFeaturedPlayList,
    label: "Pesanan",
    href: "/user/dashboard/order",
    subItems: [
      { label: "Daftar Pesanan", href: "/user/dashboard/order" },
      { label: "Belum Dibayar", href: "/user/dashboard/order/unpaid" },
      { label: "Dikirim", href: "/user/dashboard/order/shipped" },
      { label: "Dibatalkan", href: "/user/dashboard/order/canceled" },
      { label: "Selesai", href: "/user/dashboard/order/completed" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
