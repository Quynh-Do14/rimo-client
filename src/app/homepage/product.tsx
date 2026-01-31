'use client'

import React, { useState, useEffect } from "react";
import styles from '@/assets/styles/pages/home/homeProduct.module.css'
import productService from "@/infrastructure/repository/product/product.service";
import { configImageURL, convertSlug, formatCurrencyVND } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { useRecoilValue } from "recoil";
import { CategoryProductState } from "@/core/common/atoms/category/categoryState";
import dynamic from "next/dynamic";
import { PageLoading } from "@/infrastructure/common/loading/loadingPage";
import Image from "next/image";
import { ProductInterface } from "@/infrastructure/interface/product/product.interface";

const ProductContent = () => {
    const [listProduct, setListProduct] = useState<Array<ProductInterface>>([])
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
        <section className={styles.productSection}>
            {/* Content Container */}
            {categoryProductState.map((category, key) => {
                const productFromCategory = listProduct.filter(
                    (filter) => filter.category_id == category.id
                );
                const gridStyle =
                    productFromCategory.length == 2
                        ? styles.galleryGrid2Col
                        : productFromCategory.length == 3
                            ? styles.galleryGrid3Col
                            : styles.galleryGrid;
                const itemMediaCol =
                    productFromCategory.length == 2
                        ? styles.itemMedia2Col
                        : productFromCategory.length == 3
                            ? styles.itemMedia3Col
                            : styles.itemMedia;
                return (
                    <div className={styles.galleryContainer} key={key}>
                        {/* Header Section */}
                        <div className={styles.galleryHeader}>
                            <h2 className={styles.mainTitle}>{category.name ? category.name : ""}</h2>
                        </div>

                        {/* Gallery Grid */}
                        <div className={gridStyle}>
                            {productFromCategory.slice(0, 4).map((item) => (
                                <Link
                                    href={`${ROUTE_PATH.PRODUCT}/${convertSlug(item.name)}-${item.id}.html`}
                                    key={item.id}
                                    className={styles.galleryItem}
                                >
                                    <div className={itemMediaCol}>
                                        {/* Thumbnail */}
                                        <div className={styles.thumbnailWrapper}>
                                            <Image
                                                src={configImageURL(item.image)}
                                                alt={item.name}
                                                fill
                                                className='object-cover'
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.itemContent}>
                                        <div className={styles.contentWrapper}>
                                            <h3 className={styles.itemTitle}>{item.name}</h3>
                                            <div className={styles.itemPrice}>
                                                {item.price_sale ? (
                                                    <>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            <span className={styles.salePrice}>
                                                                {formatCurrencyVND(item.price_sale)}
                                                            </span>
                                                        </div>
                                                        <span className={styles.originalPrice}>
                                                            {formatCurrencyVND(item.price)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className={styles.normalPrice}>
                                                        {formatCurrencyVND(item.price)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

// Export default với dynamic import
const ProductSection = dynamic(() => Promise.resolve(ProductContent), {
    ssr: false,
    loading: () => <PageLoading />
});

export default ProductSection;