'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/assets/styles/pages/product.module.css'
import seriesService from '@/infrastructure/repository/series/series.service';

interface ProductSpec {
    id: number;
    key: string;
    value: string;
}

interface ProductData {
    id: number;
    name: string;
    product_id: number;
    created_at: string;
    updated_at: string;
    series_id: number;
    image: string | null;
    product_name: string;
    series_name: string;
    productFigure: ProductSpec[];
}

interface BrandData {
    name: string;
    fig: ProductData;
}

type Props = {
    dataProductSeries: any[]
}

const ProductFiguresComponent = (props: Props) => {
    const { dataProductSeries } = props;
    const [expandedBrand, setExpandedBrand] = useState<string | null>('QUANTUM');
    const [expandedModels, setExpandedModels] = useState<Record<string, number[]>>({});
    const [listSeries, setListSeries] = useState<any[]>([]);
    const [dataFigures, setDataFigures] = useState<BrandData[]>([]);
    console.log('dataFigures', dataFigures);

    const onGetListSeriesAsync = async () => {
        const param = {
            limit: 1000,
        }
        try {
            await seriesService.GetSeries(
                param,
                () => { }
            ).then((res) => {
                setListSeries(res.data)
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListSeriesAsync()
    }, [])

    useEffect(() => {
        if (dataProductSeries.length && listSeries.length) {
            let resultFinal: BrandData[] = []

            // Group by series name first
            const groupedBySeries: Record<string, BrandData> = {};

            dataProductSeries.forEach((product) => {
                const series = listSeries.find(s => s.id === product.series_id);
                if (series) {
                    const seriesName = series.name;

                    // Create or update brand entry
                    resultFinal.push({
                        name: seriesName,
                        fig: product
                    });
                }
            });

            setDataFigures(resultFinal)
        }
    }, [listSeries, dataProductSeries]);

    const toggleBrand = (brandName: string) => {
        setExpandedBrand(expandedBrand === brandName ? null : brandName);
    };

    const toggleModel = (brandName: string, modelId: number) => {
        setExpandedModels(prev => {
            const brandModels = prev[brandName] || [];
            if (brandModels.includes(modelId)) {
                return {
                    ...prev,
                    [brandName]: brandModels.filter(id => id !== modelId)
                };
            } else {
                return {
                    ...prev,
                    [brandName]: [...brandModels, modelId]
                };
            }
        });
    };

    const isModelExpanded = (brandName: string, modelId: number) => {
        return expandedModels[brandName]?.includes(modelId) || false;
    };

    // Group dataFigures by series name to show them properly
    const groupedData = dataFigures.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = [];
        }
        acc[item.name].push(item.fig);
        return acc;
    }, {} as Record<string, ProductData[]>);

    return (
        <div className={styles.figureContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Thông số kỹ thuật sản phẩm</h1>
                <p className={styles.subtitle}>Khám phá chi tiết từng dòng sản phẩm của chúng tôi</p>
            </div>

            <div className={styles.brandsContainer}>
                {Object.entries(groupedData).map(([brandName, products], brandIndex) => (
                    <div
                        key={brandIndex}
                        className={`${styles.brandCard} ${expandedBrand === brandName ? styles.expanded : ''}`}
                    >
                        <div
                            className={styles.brandHeader}
                            onClick={() => toggleBrand(brandName)}
                        >
                            <div className={styles.brandInfo}>
                                <h2 className={styles.brandName}>{brandName}</h2>
                                <div className={styles.modelCount}>
                                    {products.length} mẫu sản phẩm
                                </div>
                            </div>
                            <div className={styles.expandIcon}>
                                <i className={`fas fa-chevron-${expandedBrand === brandName ? 'up' : 'down'}`}></i>
                            </div>
                        </div>

                        {expandedBrand === brandName && (
                            <div className={styles.modelsContainer}>
                                <div className={styles.modelsGrid}>
                                    {products.map((product, productIndex) => (
                                        <div
                                            key={product.id}
                                            className={`${styles.modelCard} ${isModelExpanded(brandName, product.id) ? styles.modelExpanded : ''}`}
                                        >
                                            <div
                                                className={styles.modelHeader}
                                                onClick={() => toggleModel(brandName, product.id)}
                                            >
                                                <div className={styles.modelImageContainer}>
                                                    {product.image ? (
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className={styles.modelImage}
                                                        />
                                                    ) : (
                                                        <div className={styles.noImage}>
                                                            <i className="fas fa-image"></i>
                                                            <span>No Image</span>
                                                        </div>
                                                    )}
                                                    <div className={styles.modelOverlay}></div>
                                                </div>
                                                <div className={styles.modelInfo}>
                                                    <h3 className={styles.modelName}>{product.name}</h3>
                                                    <div className={styles.specCount}>
                                                        {product.productFigure?.length || 0} thông số kỹ thuật
                                                    </div>
                                                    <div className={styles.productId}>
                                                        ID: {product.id}
                                                    </div>
                                                </div>
                                                <div className={styles.modelExpandIcon}>
                                                    <i className={`fas fa-chevron-${isModelExpanded(brandName, product.id) ? 'up' : 'down'}`}></i>
                                                </div>
                                            </div>

                                            {isModelExpanded(brandName, product.id) && product.productFigure && (
                                                <div className={styles.specsContainer}>
                                                    <div className={styles.specsGrid}>
                                                        {product.productFigure.map((spec, specIndex) => (
                                                            <div key={spec.id || specIndex} className={styles.specCard}>
                                                                <div className={styles.specIcon}>
                                                                    <i className="fas fa-check-circle"></i>
                                                                </div>
                                                                <div className={styles.specContent}>
                                                                    <div className={styles.specKey}>{spec.key}</div>
                                                                    <div className={styles.specValue}>{spec.value}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerInfo}>
                        <h3>Cần hỗ trợ thêm?</h3>
                        <p>Liên hệ với chúng tôi để được tư vấn chi tiết về sản phẩm</p>
                    </div>
                    <button className={styles.contactButton}>
                        <i className="fas fa-phone-alt"></i>
                        Liên hệ ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFiguresComponent;