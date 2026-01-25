import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import RecoilProvider from "./ClientProviders";
import { configImageURL } from "@/infrastructure/helper/helper";

// Danh sách keywords cho SEO
const keywords = [
  "phim cách nhiệt ô tô",
  "phim ppf ô tô",
  "phim cách nhiệt Rimo",
  "phim ppf Rimo",
  "phim bảo vệ sơn ô tô",
  "dán phim cách nhiệt ô tô",
  "dán ppf ô tô",
  "phim ceramic ô tô",
  "phim cách nhiệt nano ceramic",
  "phim cách nhiệt cao cấp",
  "phim cách nhiệt chính hãng",
  "cách nhiệt ô tô Hà Nội",
  "cửa hàng dán phim cách nhiệt",
  "đại lý phim cách nhiệt",
  "phim cách nhiệt giá tốt",
  "phim cách nhiệt ô tô giá rẻ",
  "bảo vệ sơn xe hơi",
  "phim bảo vệ sơn xe",
  "PPF bảo vệ sơn",
  "Paint Protection Film",
  "phim cách nhiệt chống tia UV",
  "phim cách nhiệt cách âm",
  "dịch vụ dán phim ô tô",
  "lắp đặt phim cách nhiệt",
  "phim cách nhiệt ô tô toàn quốc",
  "địa chỉ dán phim cách nhiệt uy tín"
];

export const metadata: Metadata = {
  title: "Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô",
  description: "Rimo - Thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô. Công nghệ Nano Ceramic & Phún xạ kim loại. Chứng nhận COCQ đầy đủ, Công ty Quang Minh nhập khẩu và phân phối chính hãng tại Việt Nam.",
  keywords: keywords.join(", "),
  authors: [{ name: "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh" }],
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_PUBLIC_URL,
    title: "Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô",
    description: "Rimo - Thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô. Công nghệ Nano Ceramic & Phún xạ kim loại.",
    images: [
      {
        url: configImageURL('RIMO-logo.png'),
        width: 1200,
        height: 630,
        alt: "Phim cách nhiệt Rimo",
      },
    ],
    siteName: "Phim cách nhiệt Rimo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô",
    description: "Rimo - Thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô",
    images: [configImageURL('RIMO-logo.png')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_PUBLIC_URL,
  },
  // verification: {
  //   google: process.env.GOOGLE_SITE_VERIFICATION, // Thêm vào biến môi trường nếu có
  // },
};

const siteURL = process.env.NEXT_PUBLIC_PUBLIC_URL;

// Schema cho Local Business (quan trọng cho doanh nghiệp địa phương)
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": `${siteURL}/#localbusiness`,
  "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh",
  "image": `${siteURL}/logo.png`,
  "description": "Chuyên cung cấp và lắp đặt phim cách nhiệt ô tô, phim PPF bảo vệ sơn Rimo chính hãng",
  "url": siteURL,
  "telephone": "19008113",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Số 31 ngách 178/52 Tam Trinh, Phường Yên Sở",
    "addressLocality": "Hà Nội",
    "addressRegion": "Hà Nội",
    "postalCode": "100000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "20.987787",
    "longitude": "105.861443"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "serviceType": "Phim cách nhiệt ô tô, PPF bảo vệ sơn, Dán phim cách nhiệt",
  "areaServed": {
    "@type": "City",
    "name": "Hà Nội"
  },
  "sameAs": [
    "https://www.facebook.com/Inmax-Vi%E1%BB%87t-Nam-109804934943900",
  ]
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteURL}/#organization`,
  "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh",
  "url": siteURL,
  "logo": `${siteURL}/logo.png`,
  "description": "GPKD số 0107801299 do Sở KH và ĐT TP Hà Nội cấp ngày 12/04/2017. Chuyên nhập khẩu và phân phối phim cách nhiệt Rimo chính hãng.",
  "sameAs": [
    "https://www.facebook.com/Inmax-Vi%E1%BB%87t-Nam-109804934943900",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "19008113",
    "contactType": "customer service",
    "availableLanguage": ["Vietnamese"],
    "areaServed": "VN"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteURL}/#website`,
  "url": siteURL,
  "name": "Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô",
  "description": "Rimo là thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô. Công nghệ Nano Ceramic & Phún xạ kim loại. Chứng nhận COCQ đầy đủ, Công ty Quang Minh nhập khẩu và phân phối chính hãng",
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteURL}/tim-kiem?search={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

// Schema cho Product/Service
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${siteURL}/#product`,
  "name": "Phim cách nhiệt Rimo",
  "description": "Phim cách nhiệt ô tô Rimo cao cấp với công nghệ Nano Ceramic, chống tia UV 99%, cách nhiệt hiệu quả, bảo vệ sơn xe toàn diện",
  "brand": {
    "@type": "Brand",
    "name": "Rimo"
  },
  "category": "Phụ kiện ô tô",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "VND",
    "lowPrice": "1500000",
    "highPrice": "10000000",
    "offerCount": "5"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Fonts */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              websiteSchema,
              localBusinessSchema,
              productSchema
            ])
          }}
        />

        {/* Thêm meta tags bổ sung cho SEO */}
        <meta name="geo.region" content="VN-HN" />
        <meta name="geo.placename" content="Hà Nội" />
        <meta name="geo.position" content="20.987787;105.861443" />
        <meta name="ICBM" content="20.987787, 105.861443" />

        {/* Thẻ cho mạng xã hội */}
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />

      </head>

      <body>
        <RecoilProvider>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </RecoilProvider>
      </body>
    </html>
  );
}