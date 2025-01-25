const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: "no",
};

export const metadata = {
  title: "ALLURE MART - Pesona Dalam Genggaman",
  description: "Pesona Dalam Genggaman",
  authors: [{ name: "Rizki Ramadhan" }],
  keywords: [
    "Allure Mart",
    "Pesona Dalam Genggaman",
    "Kosmetik",
    "Perawatan Kecantikan",
    "Pria",
    "Wanita",
    "Anak",
    "Bayi",
    "Remaja",
  ],

  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
    appleTouchIcon: "/icon.png",
  },

  manifest: "/manifest.json",

  metadataBase: new URL(BASE_URL),
  canonical: BASE_URL,

  other: {
    "theme-color": "#f5f5f5",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },

  openGraph: {
    type: "website",
    title: "ALLURE MART - Pesona Dalam Genggaman",
    description: "Pesona Dalam Genggaman",
    url: BASE_URL,
    siteName: "ALLURE MART - Pesona Dalam Genggaman",
    locale: "id_ID",
    images: [
      {
        url: "/icon.png",
        width: 1920,
        height: 1080,
        alt: "Icon for ALLURE MART - Pesona Dalam Genggaman",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ALLURE MART - Pesona Dalam Genggaman",
    description: "Pesona Dalam Genggaman",
    creator: "@rizki_ramadhan",
    site: "@rizki_ramadhan",
    images: ["/icon.png"],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_VERTIFICATION_API_KEY,
  },

  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nocache: true,
  },
};
