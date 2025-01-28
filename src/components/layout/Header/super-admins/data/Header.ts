import { FiHome, FiSettings } from "react-icons/fi";

import { RiAdminFill } from "react-icons/ri";

import { MdFeaturedPlayList } from "react-icons/md";

import { GiCardboardBoxClosed } from "react-icons/gi";

import { GrArticle } from "react-icons/gr";

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
    icon: GiCardboardBoxClosed,
    label: "Produk",
    href: "/super-admins/dashboard/products",
    subItems: [
      { label: "Daftar Produk", href: "/super-admins/dashboard/products" },
      { label: "Kategori", href: "/super-admins/dashboard/products/category" },
      {
        label: "Jenis Kelamin",
        href: "/super-admins/dashboard/products/gender",
      },
      {
        label: "Merek",
        href: "/super-admins/dashboard/products/merek",
      },
    ],
  },

  {
    icon: GrArticle,
    label: "Article",
    href: "/super-admins/dashboard/article",
    subItems: [
      { label: "Daftar Article", href: "/super-admins/dashboard/article" },
      { label: "Category", href: "/super-admins/dashboard/article/category" },
      { label: "Tags", href: "/super-admins/dashboard/article/tags" },
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
