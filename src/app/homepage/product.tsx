'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import '@/assets/styles/pages/home/product.css'
import productService from "@/infrastructure/repository/product/product.service";
import { configImageURL } from "@/infrastructure/helper/helper";

interface GalleryItem {
    id: number;
    type: 'image' | 'video';
    title: string;
    description?: string;
    thumbnail: string;
    videoUrl?: string;
    category: string;
    tags: string[];
}

const ProductSection = () => {
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [listProduct, setListProduct] = useState<Array<any>>([])

    const onGetListProductAsync = async () => {
        const param = {
            limit: 8,
        }
        try {
            await productService.GetProduct(
                param,
                () => { }
            ).then((res) => {
                setListProduct(res.data);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListProductAsync().then(_ => { });
    }, []);

    return (
        <section className="slogan-section">
            {/* Fixed Background */}
            {/* <div className="fixed-background">
                <div className="bg-overlay"></div>
                <div className="bg-pattern"></div>
            </div> */}

            {/* Content Container */}
            <div className="gallery-container">
                {/* Header Section */}
                <div className="gallery-header">
                    <div className="header-left">
                        <div className="title-group">
                            <div className="main-title">
                                <span className="title-part">RIMO</span>
                                <span className="title-highlight"></span>
                            </div>
                            <h1 className="section-title">
                                Sản phẩm nổi bật
                            </h1>
                        </div>

                        <div className="intro-text">
                            <p className="intro-paragraph">
                                <span className="brand-name">RIMO</span> – với sức mạnh đổi mới đang dẫn đầu ngành phim cách nhiệt đến một tương lai chất lượng!
                            </p>
                            <p className="intro-paragraph">
                                RIMO là nhà sản xuất phim cách nhiệt uy tín đến từ Hoa Kỳ. Hiện nay công ty đã mở rộng quy mô với tâm tích hợp bao gồm R&D độc lập, sản xuất - chế tạo và kinh doanh trên phạm vi quốc tế.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="gallery-grid">
                    {listProduct.map(item => (
                        <div
                            key={item.id}
                            className={`gallery-item ${item.type}`}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div className="item-media">
                                <div className="media-container">
                                    {/* Thumbnail */}
                                    <div className="thumbnail-wrapper">
                                        <div
                                            className="thumbnail"
                                            style={{ backgroundImage: `url(${configImageURL(item.image)})` }}
                                        />
                                        <div className="media-overlay"></div>

                                        {/* Type Badge */}
                                        <div className="type-badge">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <path d="M21 15l-5-5L5 21" />
                                            </svg>
                                            <span>ẢNH</span>
                                        </div>

                                        {/* Play Button for Video */}
                                        {item.type === 'video' && (
                                            <button className="play-btn">
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polygon points="10 8 16 12 10 16 10 8" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="item-content">
                                <div className="content-wrapper">
                                    <h3 className="item-title">{item.name}</h3>
                                    {item.description && (
                                        <p className="item-description text-truncate-2">{item.short_description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Hover Effect */}
                            <div className={`item-hover-effect ${hoveredItem === item.id ? 'active' : ''}`}>
                                <div className="hover-content">
                                    <span className="hover-text">XEM CHI TIẾT</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSection;