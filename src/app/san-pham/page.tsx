'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import '@/assets/styles/pages/home/product.css'
import productService from "@/infrastructure/repository/product/product.service";
import { configImageURL, convertSlug, formatCurrencyVND } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import styles from "@/assets/styles/pages/product/product.module.css"
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import BreadcrumbCommon from "@/infrastructure/common/Layouts/Breadcumb";
const ProductPage = () => {
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
        <ClientLayout>
            <div className={styles.productSection}>
                <div className='padding-common'>
                    <BreadcrumbCommon
                        breadcrumb={"Sản phẩm"}
                        redirect={ROUTE_PATH.PRODUCT}
                        title={""}
                    />
                    <div className={styles.galleryContainer}>
                        <div className={styles.galleryHeader}>
                            <div className={styles.headerLeft}>
                                <div className={styles.titleGroup}>
                                    <div className={styles.mainTitle}>
                                        <h1 className={styles.titlePart}>RIMO</h1>
                                        <span className={styles.titleHighlight}></span>
                                    </div>
                                    <h2 className={styles.sectionTitle}>
                                        Sản phẩm nổi bật
                                    </h2>
                                </div>
                            </div>
                        </div>
                        {/* Gallery Grid */}
                        <div className={styles.galleryGrid}>
                            {listProduct.map(item => (
                                <Link href={`${ROUTE_PATH.PRODUCT}/${convertSlug(item.name)}-${item.id}.html`}
                                    key={item.id}
                                    className={`${styles.galleryItem} ${styles[item.type]}`}
                                >
                                    <div className={styles.itemMedia}>
                                        <div className={styles.mediaContainer}>
                                            {/* Thumbnail */}
                                            <div className={styles.thumbnailWrapper}>
                                                <div
                                                    className={styles.thumbnail}
                                                    style={{ backgroundImage: `url(${configImageURL(item.image)})` }}
                                                />
                                                <div className={styles.mediaOverlay}></div>

                                                {/* Play Button for Video */}
                                                {item.type === 'video' && (
                                                    <button className={styles.playBtn}>
                                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <polygon points="10 8 16 12 10 16 10 8" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.itemContent}>
                                        <div className={styles.contentWrapper}>
                                            <h3 className={styles.itemTitle}>{item.name}</h3>
                                            <div className={styles.itemPrice}>
                                                {item.price_sale ? (
                                                    <>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            <span className={styles.salePrice}>{formatCurrencyVND(item.price_sale)}</span>
                                                        </div>
                                                        <span className={styles.originalPrice}>{formatCurrencyVND(item.price)}</span>
                                                    </>
                                                ) : (
                                                    <span className={styles.normalPrice}>{formatCurrencyVND(item.price)}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout >

    );
};

export default ProductPage;