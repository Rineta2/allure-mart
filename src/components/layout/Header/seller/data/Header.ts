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
    href: "/seller/dashboard/profile",
    subItems: [
      { label: "Profile", href: "/seller/dashboard/profile" },
      {
        label: "Pengaturan Privasi",
        href: "/seller/dashboard/profile/privacy",
      },
    ],
  },

  {
    icon: MdFeaturedPlayList,
    label: "Produk",
    href: "/seller/dashboard/products",
    subItems: [{ label: "Daftar Produk", href: "/seller/dashboard/products" }],
  },

  {
    icon: MdFeaturedPlayList,
    label: "Pesanan",
    href: "/seller/dashboard/order",
    subItems: [
      { label: "Daftar Pesanan", href: "/seller/dashboard/order" },
      { label: "Pesanan Selesai", href: "/seller/dashboard/order/completed" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
