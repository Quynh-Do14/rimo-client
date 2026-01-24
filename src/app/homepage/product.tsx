'use client'

import React, { useState, useEffect } from "react";
import '@/assets/styles/pages/home/product.css'
import productService from "@/infrastructure/repository/product/product.service";
import { configImageURL, convertSlug, formatCurrencyVND } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { useRecoilValue } from "recoil";
import { CategoryProductState } from "@/core/common/atoms/category/categoryState";

const ProductSection = () => {
    const [listProduct, setListProduct] = useState<Array<any>>([])
    const categoryProductState = useRecoilValue(CategoryProductState).data;
    const onGetListProductAsync = async () => {
        const param = {
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
            {/* Content Container */}
            {
                categoryProductState.map((category, key) => {
                    const productFromCategory = listProduct.filter(filter => filter.category_id == category.id)
                    const gridStyle = productFromCategory.length == 2
                        ?
                        'gallery-grid-2-col'
                        : productFromCategory.length == 3
                            ?
                            "gallery-grid-3-col"
                            :
                            "gallery-grid";
                    const itemMediaCol = productFromCategory.length == 2
                        ?
                        'item-media-2-col'
                        : productFromCategory.length == 3
                            ?
                            "item-media-3-col"
                            :
                            "item-media";
                    return (
                        <div className="gallery-container" key={key}>
                            {/* Header Section */}
                            <div className="gallery-header">
                                <h2 className="main-title">
                                    {category.name}
                                    {/* Phim phản xạ nhiệt <span className="highlight">Automotive Window Film</span> */}
                                </h2>
                            </div>

                            {/* Gallery Grid */}
                            <div className={gridStyle}>
                                {productFromCategory.slice(0, 4).map(item => (
                                    <Link href={`${ROUTE_PATH.PRODUCT}/${convertSlug(item.name)}-${item.id}.html`}
                                        key={item.id}
                                        className={`gallery-item`}
                                    >
                                        <div className={itemMediaCol}>
                                            <div className="media-container">
                                                {/* Thumbnail */}
                                                <div className="thumbnail-wrapper">
                                                    <div
                                                        className="thumbnail"
                                                        style={{ backgroundImage: `url(${configImageURL(item.image)})` }}
                                                    />
                                                    <div className="media-overlay"></div>
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
                    )
                })
            }
        </section >
    );
};

export default ProductSection;