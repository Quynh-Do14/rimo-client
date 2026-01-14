'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import '@/assets/styles/pages/home/product.css'
import productService from "@/infrastructure/repository/product/product.service";
import { configImageURL, convertSlug, formatCurrencyVND } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";

const ProductSection = () => {
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
        <section className="product-section">
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
                            <h2 className="section-title">
                                Sản phẩm nổi bật
                            </h2>
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
                        <Link href={`${ROUTE_PATH.PRODUCT}/${convertSlug(item.name)}-${item.id}.html`}
                            key={item.id}
                            className={`gallery-item ${item.type}`}
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
                                    <div className="item-price">
                                        {item.price_sale ? (
                                            <>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <span className="sale-price">{formatCurrencyVND(item.price_sale)}</span>
                                                </div>
                                                <span className="original-price">{formatCurrencyVND(item.price)}</span>
                                            </>
                                        ) : (
                                            <span className="normal-price">{formatCurrencyVND(item.price)}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default ProductSection;