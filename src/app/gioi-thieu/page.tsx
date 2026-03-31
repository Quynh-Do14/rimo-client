import { ROUTE_PATH } from '@/core/common/appRouter'
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import React from 'react'
import styles from '@/assets/styles/pages/introduce.module.css'
import TocClient from './tocClient'
import BannerCommon from '@/infrastructure/common/banner/BannerCommon'
import { Metadata } from 'next'
import { configImageURL } from '@/infrastructure/helper/helper'
import { Endpoint } from '@/core/common/apiLink'
import { ContentPageInterface } from '@/infrastructure/interface/contentPage/contentPage.interface'

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;
const introduceUrl = `${publicURL}${ROUTE_PATH.INTRODUCE}`;

const keywords = [
    "CÔNG TY TNHH TM XNK NỘI THẤT Ô TÔ QUANG MINH",
    "Công ty TNHH Thương Mại Xuất nhập khẩu Nội thất ô tô Quang Minh",
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

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": publicURL
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Giới thiệu",
            "item": introduceUrl
        },
    ]
};

const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": introduceUrl,
    "url": introduceUrl,
    "name": "Giới thiệu - Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô",
    "description": "Rimo - Thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô. Công nghệ Nano Ceramic & Phún xạ kim loại. Chứng nhận COCQ đầy đủ, Công ty Quang Minh nhập khẩu và phân phối chính hãng tại Việt Nam.",
    "mainEntity": {
        "@type": "Organization",
        "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh",
        "description": "Nhà nhập khẩu và phân phối chính hãng phim cách nhiệt Rimo tại Việt Nam",
        "foundingDate": "2017-04-12",
        "foundingLocation": "Hà Nội, Việt Nam",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Số 12 Ngõ 44 Tư Đình – Tổ 5 – Phường Long Biên",
            "addressLocality": "Hà Nội",
            "addressCountry": "VN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "02462926666",
            "contactType": "customer service"
        }
    },
    "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": configImageURL('/uploads/RIMO-logo.png'),
        "caption": "Phim cách nhiệt & Phim PPF Rimo"
    },
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbSchema.itemListElement
    },
    "significantLinks": [
        `${publicURL}${ROUTE_PATH.PRODUCT}`,
        `${publicURL}${ROUTE_PATH.BLOG}`
    ]
};

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${publicURL}#organization`,
    "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh",
    "alternateName": "Rimo Việt Nam",
    "url": publicURL,
    "logo": configImageURL('/uploads/RIMO-logo.png'),
    "description": "Nhà nhập khẩu và phân phối chính hãng phim cách nhiệt Rimo tại Việt Nam",
    "sameAs": [
        "https://www.facebook.com/potech.vietnam",
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "02462926666",
        "contactType": "customer service",
        "areaServed": "VN",
        "availableLanguage": "Vietnamese"
    }
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${publicURL}#website`,
    "url": publicURL,
    "name": "Phim cách nhiệt & Phim PPF Rimo",
    "description": "Phim cách nhiệt và PPF Rimo chính hãng - Công ty Quang Minh",
    "publisher": {
        "@type": "Organization",
        "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh",
        "logo": configImageURL('/uploads/RIMO-logo.png')
    }
};

// ✅ Gộp tất cả schema vào một mảng để dễ quản lý
const allSchemas = [aboutPageSchema, organizationSchema, websiteSchema, breadcrumbSchema];

export const metadata: Metadata = {
    title: "Giới thiệu - Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô",
    description: "Rimo - Thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô. Công nghệ Nano Ceramic & Phún xạ kim loại. Chứng nhận COCQ đầy đủ, Công ty Quang Minh nhập khẩu và phân phối chính hãng tại Việt Nam.",
    keywords: keywords.join(", "),
    authors: [{ name: "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh" }],

    openGraph: {
        type: "website",
        url: `${publicURL}/${ROUTE_PATH.INTRODUCE}`,
        title: "Giới thiệu - Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô",
        description: "Rimo - Thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô. Công nghệ Nano Ceramic & Phún xạ kim loại.",
        images: [
            {
                url: configImageURL('/uploads/RIMO-logo.png'),
                alt: "Phim cách nhiệt & Phim PPF Rimo",
            },
        ],
        siteName: "Phim cách nhiệt & Phim PPF Rimo",
    },

    twitter: {
        card: "summary_large_image",
        title: "Giới thiệu - Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô",
        description: "Rimo - Thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô",
        images: [configImageURL('/uploads/RIMO-logo.png')],
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
        canonical: `${publicURL}/${ROUTE_PATH.INTRODUCE}`,
    },

    other: {
        'og:image:alt': 'Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô',
        'twitter:image:alt': 'Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô',
        'og:locale': 'vi_VN',
        'business:contact_data:street': 'Số 12 Ngõ 44 Tư Đình – Tổ 5 – Phường Long Biên – Thành phố Hà Nội',
        'business:contact_data:locality': 'Hà Nội',
        'business:contact_data:country': 'VN',
        'business:contact_data:phone': '02462926666',
    }
};

// ✅ Helper function để extract headings an toàn
const extractHeadings = (htmlContent: string) => {
    const headings: { id: string; text: any; level: number }[] = [];
    const headingMatches = String(htmlContent).match(/<(h[2-3])[^>]*>(.*?)<\/\1>/g);

    if (headingMatches) {
        headingMatches.forEach((heading, index) => {
            const level = heading.match(/h([2-3])/)?.[1] ?? '2';
            const text = heading.replace(/<\/?h[2-3][^>]*>/g, '');
            const id = `heading-${index}`;
            headings.push({ id, text, level: parseInt(level) });
        });
    }

    return headings;
};

// ✅ Helper function để thêm id vào headings
const addIdsToHeadings = (htmlContent: string, existingHeadings: { id: string; text: any; level: number }[]) => {
    let index = 0;
    return String(htmlContent).replace(/<(h[2-3])[^>]*>(.*?)<\/\1>/g, (_match, tag, text) => {
        const id = existingHeadings[index]?.id || `heading-${index}`;
        index++;
        return `<${tag} id="${id}">${text}</${tag}>`;
    });
};

const IntroducePage = async () => {
    // ✅ Thêm error handling cho fetch
    let content = "";
    try {
        const response = await fetch(`${baseURL}${Endpoint.ContentPage.Get}?type=INTRODUCE`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const config = await response.json();
        const contentPage: ContentPageInterface[] = config?.data || [];

        if (contentPage.length > 0 && contentPage[0]?.content) {
            content = contentPage[0].content;
        }
    } catch (error) {
        console.error("Failed to fetch introduce content:", error);
        content = "<p>Nội dung đang được cập nhật...</p>";
    }

    // ✅ Extract headings từ content
    const allHeadings = extractHeadings(content);

    // ✅ Tách headings cho TOC (chỉ lấy h2 và h3)
    const tocItems = allHeadings.filter(item => item.level === 2 || item.level === 3);

    // ✅ Thêm id vào headings
    const updatedContent = addIdsToHeadings(content, allHeadings);

    return (
        <>
            {/* ✅ Render tất cả schema trong một map để tránh duplicate */}
            {allSchemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema)
                    }}
                />
            ))}

            <ClientLayout>
                <BannerCommon
                    type={'INTRODUCE'}
                />
                <div className={`${styles.introduceContainer} padding-common`}>
                    <BreadcrumbCommon
                        breadcrumb={"Giới thiệu"}
                        redirect={ROUTE_PATH.INTRODUCE}
                        title={'CÔNG TY TNHH THƯƠNG MẠI XNK NỘI THẤT Ô TÔ QUANG MINH'}
                        blackColor={true}
                    />
                    <TocClient tocItems={tocItems} />
                    <div className="tiny-style">
                        <article
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: updatedContent }}
                        />
                    </div>
                </div>
            </ClientLayout>
        </>
    )
}

export default IntroducePage