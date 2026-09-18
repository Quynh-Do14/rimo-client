import React from "react";
import styles from "@/assets/styles/pages/product/product.module.css";
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import ProductList from "./components/product-list";
import { Metadata } from "next";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { Endpoint } from "@/core/common/apiLink";
import { configImageURL } from "@/infrastructure/helper/helper";
import { CategoryProductInterface } from "@/infrastructure/interface/category/categoryProduct.interface";

type Props = {
    params: { slug: string };
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;

// Định nghĩa fallback data
const FALLBACK_DATA = {
    title: 'Sản phẩm RIMO',
    content: 'Sản phẩm phụ kiện ô tô chất lượng cao tại RIMO',
    description: 'Sản phẩm RIMO - Phụ kiện ô tô chính hãng, giá tốt nhất thị trường',
    slug: 'san-pham',
};

// Cache product data để tái sử dụng
let cachedProduct: CategoryProductInterface | null = null;

async function getProduct(slug: string): Promise<CategoryProductInterface> {
    const response = await fetch(`${baseURL}${Endpoint.Category.GetBySlug}/${slug}`, {
        cache: 'no-store', // Tắt cache
    });
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    const data = await response.json();
    cachedProduct = data;
    return data;
}

// Hàm tạo meta description
function generateDescription(product: CategoryProductInterface | null): string {
    if (!product) {
        return 'Sản phẩm RIMO - Phụ kiện ô tô chính hãng, chất lượng cao, giá tốt nhất thị trường';
    }

    // Tạo description từ content
    if (product.content) {
        // Loại bỏ HTML tags và lấy text thuần
        const plainText = product.content.replace(/<[^>]*>/g, '');
        const truncated = plainText.length > 160
            ? plainText.slice(0, 160) + '...'
            : plainText;
        return `${product.title} - ${truncated}`;
    }

    // Tạo description từ các thuộc tính
    const parts = [];
    if (product.title) parts.push(product.title);

    return `${parts.join(' - ')} - Sản phẩm phụ kiện ô tô chất lượng cao tại RIMO`;
}

// Hàm tạo keywords
function generateKeywords(product: CategoryProductInterface | null): string {
    if (!product) {
        return 'Sản phẩm RIMO, phụ kiện ô tô, RIMO, phụ kiện xe hơi, đồ chơi xe hơi, nội thất ô tô, phụ kiện chính hãng';
    }

    const keywords = new Set<string>();

    // Thêm title
    if (product.title) keywords.add(product.title);

    // Thêm từ khóa từ API
    if (product.keyword && Array.isArray(product.keyword)) {
        product.keyword.forEach(item => {
            if (item.keyword) keywords.add(item.keyword);
        });
    }

    // Thêm từ khóa mở rộng
    if (product.title) {
        // Tách từ khóa từ title
        const titleWords = product.title.split(' ');
        titleWords.forEach(word => {
            if (word.length > 2) keywords.add(word);
        });
    }

    // Thêm từ khóa mặc định nếu chưa đủ
    if (keywords.size < 5) {
        keywords.add('Sản phẩm RIMO');
        keywords.add('phụ kiện ô tô');
        keywords.add('RIMO');
        keywords.add('phụ kiện xe hơi');
        keywords.add('nội thất ô tô');
        keywords.add('phụ kiện chính hãng');
    }

    return Array.from(keywords).join(', ');
}

// ✅ Metadata với fallback và SEO đầy đủ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct("san-pham");
    const productUrl = `${publicURL}${ROUTE_PATH.PRODUCT}`;

    // Nếu không có sản phẩm, trả về metadata mặc định
    if (!product) {
        return {
            title: 'Sản phẩm RIMO | Phụ kiện ô tô chính hãng',
            description: 'Sản phẩm RIMO - Phụ kiện ô tô chính hãng, chất lượng cao, giá tốt nhất thị trường',
            keywords: 'Sản phẩm RIMO, phụ kiện ô tô, RIMO, phụ kiện xe hơi, đồ chơi xe hơi, nội thất ô tô',
            robots: {
                index: true,
                follow: true,
            },
            alternates: {
                canonical: productUrl,
            },
        };
    }

    const description = generateDescription(product);
    const keywords = generateKeywords(product);

    return {
        title: product.title ? product.title : product.name,
        description: description,
        keywords: keywords,

        openGraph: {
            title: product.title ? product.title : product.name,
            description: description,
            images: [
                {
                    url: configImageURL('/uploads/RIMO-logo.png'),
                    width: 1200,
                    height: 630,
                    alt: product.title ? product.title : product.name,
                }
            ],
            type: 'website',
            url: productUrl,
            siteName: 'RIMO - Phụ kiện ô tô',
            locale: 'vi_VN',
        },

        twitter: {
            card: 'summary_large_image',
            title: product.title ? product.title : product.name,
            description: description,
            images: [
                {
                    url: configImageURL('/uploads/RIMO-logo.png'),
                    alt: product.title ? product.title : product.name,
                }
            ],
        },

        alternates: {
            canonical: productUrl,
        },

        robots: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },

        verification: {
            google: process.env.GOOGLE_VERIFICATION,
        },

        category: 'Phụ kiện ô tô',
        authors: [{ name: 'RIMO' }],
    };
}

// Component ProductPage - Trang danh sách sản phẩm (Category Page)
const ProductPage = async ({ params }: Props) => {
    const dataDetail = await getProduct("san-pham");
    const productUrl = `${publicURL}${ROUTE_PATH.PRODUCT}`;

    const imageUrl = configImageURL('/uploads/RIMO-logo.png');

    const productName = dataDetail.title || FALLBACK_DATA.title;
    const productDescription = dataDetail.content
        ? dataDetail.content.replace(/<[^>]*>/g, '').slice(0, 200)
        : FALLBACK_DATA.description;

    // ✅ SCHEMA CHÍNH: CollectionPage (chuẩn cho trang danh mục sản phẩm)
    // KHÔNG có offers, price, review, aggregateRating vì đây không phải sản phẩm cụ thể
    const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": productUrl,
        "url": productUrl,
        "name": productName,
        "description": productDescription,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${publicURL}/#website`,
            "url": publicURL,
            "name": "RIMO - Phụ kiện ô tô"
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": imageUrl,
            "caption": productName,
            "width": "1200",
            "height": "630"
        },
        "about": {
            "@type": "Thing",
            "name": "Phụ kiện ô tô"
        },
        "inLanguage": "vi-VN"
    };

    // ✅ SCHEMA ItemList: Liệt kê các sản phẩm con trong danh mục (nếu API có trả về)
    // Chỉ chứa position, url, name - KHÔNG có offers/price
    // const itemListSchema = (dataDetail.products && Array.isArray(dataDetail.products) && dataDetail.products.length > 0) ? {
    //     "@context": "https://schema.org",
    //     "@type": "ItemList",
    //     "@id": `${productUrl}#itemlist`,
    //     "name": productName,
    //     "numberOfItems": dataDetail.products.length,
    //     "itemListElement": dataDetail.products.map((item: any, index: number) => ({
    //         "@type": "ListItem",
    //         "position": index + 1,
    //         "url": `${publicURL}${ROUTE_PATH.PRODUCT}/${item.slug || item.id}`,
    //         "name": item.title || item.name || `Sản phẩm ${index + 1}`
    //     }))
    // } : null;

    // ✅ Schema Breadcrumb - CHỈ 2 cấp vì đây là trang danh mục
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
                "name": "Sản phẩm",
                "item": `${publicURL}${ROUTE_PATH.PRODUCT}`
            }
        ]
    };

    // ✅ Schema WebPage (bổ sung cho CollectionPage)
    const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${productUrl}#webpage`,
        "url": productUrl,
        "name": productName,
        "description": productDescription,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${publicURL}/#website`,
            "url": publicURL,
            "name": "RIMO - Phụ kiện ô tô"
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": imageUrl,
            "caption": productName,
            "width": "1200",
            "height": "630"
        },
        "about": {
            "@type": "Thing",
            "name": "Phụ kiện ô tô"
        }
    };

    return (
        <ClientLayout>
            {/* JSON-LD Schemas cho trang danh sách sản phẩm */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
            />
            {/* {itemListSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
                />
            )} */}

            <div className={styles.productSection}>
                <ProductList
                    name={dataDetail.name}
                    title={dataDetail.title}
                />
                {
                    dataDetail?.content &&
                    <div className="bg-white">
                        <div className={`padding-common`}>
                            <div className="tiny-style">
                                <article
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: dataDetail.content }}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </ClientLayout>
    );
};

export default ProductPage;