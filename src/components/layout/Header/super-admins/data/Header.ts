import { FiHome, FiUsers, FiSettings } from "react-icons/fi";

import { RiAdminFill } from "react-icons/ri";

import { MdFeaturedPlayList } from "react-icons/md";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/super-admins/dashboard",
  },

  {
    icon: RiAdminFill,
    label: "Seller",
    href: "/super-admins/dashboard/seller",
    subItems: [
      { label: "Daftar Seller", href: "/super-admins/dashboard/seller" },
    ],
  },

  {
    icon: MdFeaturedPlayList,
    label: "Featured",
    href: "/super-admins/dashboard/featured",
    subItems: [
      { label: "Daftar Featured", href: "/super-admins/dashboard/featured" },
    ],
  },

  {
    icon: FiUsers,
    label: "Siswa",
    href: "/super-admins/student",
    subItems: [
      { label: "Daftar Siswa", href: "/super-admins/student/list" },
      { label: "Tambah Siswa", href: "/super-admins/student/add" },
    ],
  },

  {
    icon: FiSettings,
    label: "Pengaturan",
    href: "/super-admins/settings",
    subItems: [
      { label: "Profile", href: "/super-admins/settings/profile" },
      { label: "Security", href: "/super-admins/settings/security" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
