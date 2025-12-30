'use client'
import React, { useState } from 'react';
import styles from '@/assets/styles/pages/product.module.css'

interface ProductSpec {
    key: string;
    value: string;
}

interface ProductModel {
    key: string;
    image?: string;
    value: ProductSpec[];
}

interface ProductBrand {
    name: string;
    image: string;
    fig: ProductModel[];
}

const ProductFiguresComponent = () => {
    const [expandedBrand, setExpandedBrand] = useState<string | null>('QUANTUM');
    const [expandedModels, setExpandedModels] = useState<Record<string, string[]>>({});

    const data = [
        {
            name: 'QUANTUM',
            image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            fig: [
                {
                    key: 'G30',
                    value: [
                        {
                            key: 'Chất liệu',
                            value: 'TPU cao cấp'
                        },
                        {
                            key: 'Kích thước',
                            value: '30cm x 20cm x 10cm'
                        },
                        {
                            key: 'Trọng lượng',
                            value: '2.5kg'
                        },
                        {
                            key: 'Màu sắc',
                            value: 'Đen, Trắng, Xám'
                        },
                        {
                            key: 'Độ bền',
                            value: 'Chống nước IP68'
                        },
                        {
                            key: 'Bảo hành',
                            value: '24 tháng'
                        }
                    ]
                },
                {
                    key: 'U16',
                    value: [
                        {
                            key: 'Chất liệu',
                            value: 'Nhôm hợp kim'
                        },
                        {
                            key: 'Kích thước',
                            value: '16cm x 16cm x 8cm'
                        },
                        {
                            key: 'Trọng lượng',
                            value: '1.8kg'
                        },
                        {
                            key: 'Màu sắc',
                            value: 'Bạc, Đen mờ'
                        },
                        {
                            key: 'Độ bền',
                            value: 'Chống va đập'
                        },
                        {
                            key: 'Bảo hành',
                            value: '36 tháng'
                        }
                    ]
                },
                {
                    key: 'X250',
                    image: 'https://images.unsplash.com/photo-1581235720701-7f6d6df2f4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    value: [
                        {
                            key: 'Chất liệu',
                            value: 'Nhựa Polycarbonate'
                        },
                        {
                            key: 'Kích thước',
                            value: '25cm x 15cm x 5cm'
                        },
                        {
                            key: 'Trọng lượng',
                            value: '1.2kg'
                        },
                        {
                            key: 'Màu sắc',
                            value: 'Xanh dương, Đỏ, Vàng'
                        },
                        {
                            key: 'Độ bền',
                            value: 'Chống trầy xước'
                        },
                        {
                            key: 'Bảo hành',
                            value: '18 tháng'
                        }
                    ]
                }
            ]
        },
        {
            name: 'SPUTECH',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            fig: [
                {
                    key: 'G30',
                    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    value: [
                        {
                            key: 'Chất liệu',
                            value: 'Thép không gỉ'
                        },
                        {
                            key: 'Kích thước',
                            value: '30cm x 25cm x 12cm'
                        },
                        {
                            key: 'Trọng lượng',
                            value: '3.2kg'
                        },
                        {
                            key: 'Màu sắc',
                            value: 'Inox, Đen bóng'
                        },
                        {
                            key: 'Độ bền',
                            value: 'Chống ăn mòn'
                        },
                        {
                            key: 'Bảo hành',
                            value: '60 tháng'
                        }
                    ]
                },
                {
                    key: 'U16',
                    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    value: [
                        {
                            key: 'Chất liệu',
                            value: 'Gốm công nghệ cao'
                        },
                        {
                            key: 'Kích thước',
                            value: '16cm x 10cm x 6cm'
                        },
                        {
                            key: 'Trọng lượng',
                            value: '0.9kg'
                        },
                        {
                            key: 'Màu sắc',
                            value: 'Trắng sứ, Xanh ngọc'
                        },
                        {
                            key: 'Độ bền',
                            value: 'Chịu nhiệt 500°C'
                        },
                        {
                            key: 'Bảo hành',
                            value: '48 tháng'
                        }
                    ]
                }
            ]
        },
        {
            name: 'AERO DYNAMICS',
            image: 'https://images.unsplash.com/photo-1565689221354-d75b87d6a9e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            fig: [
                {
                    key: 'F1',
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    value: [
                        {
                            key: 'Chất liệu',
                            value: 'Carbon Fiber'
                        },
                        {
                            key: 'Kích thước',
                            value: '40cm x 25cm x 10cm'
                        },
                        {
                            key: 'Trọng lượng',
                            value: '1.5kg'
                        },
                        {
                            key: 'Màu sắc',
                            value: 'Đen carbon, Cam đua'
                        },
                        {
                            key: 'Độ bền',
                            value: 'Cực nhẹ, cứng cáp'
                        },
                        {
                            key: 'Bảo hành',
                            value: '24 tháng'
                        }
                    ]
                }
            ]
        },
        {
            name: 'HYDRO TECH',
            image: 'https://images.unsplash.com/photo-1581235720701-7f6d6df2f4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            fig: [
                {
                    key: 'H20',
                    image: 'https://images.unsplash.com/photo-1565689221354-d75b87d6a9e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    value: [
                        {
                            key: 'Chất liệu',
                            value: 'Nhựa chống thấm'
                        },
                        {
                            key: 'Kích thước',
                            value: '22cm x 18cm x 9cm'
                        },
                        {
                            key: 'Trọng lượng',
                            value: '1.0kg'
                        },
                        {
                            key: 'Màu sắc',
                            value: 'Xanh biển, Trắng'
                        },
                        {
                            key: 'Độ bền',
                            value: 'Chống nước hoàn toàn'
                        },
                        {
                            key: 'Bảo hành',
                            value: '24 tháng'
                        }
                    ]
                }
            ]
        },
        {
            name: 'SOLAR POWER',
            image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            fig: [
                {
                    key: 'SUN-100',
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    value: [
                        {
                            key: 'Chất liệu',
                            value: 'Kính cường lực + Nhôm'
                        },
                        {
                            key: 'Kích thước',
                            value: '100cm x 60cm x 3cm'
                        },
                        {
                            key: 'Trọng lượng',
                            value: '8.5kg'
                        },
                        {
                            key: 'Màu sắc',
                            value: 'Đen, Xanh đen'
                        },
                        {
                            key: 'Độ bền',
                            value: 'Chịu được thời tiết khắc nghiệt'
                        },
                        {
                            key: 'Bảo hành',
                            value: '25 năm'
                        }
                    ]
                }
            ]
        }
    ];

    const toggleBrand = (brandName: string) => {
        setExpandedBrand(expandedBrand === brandName ? null : brandName);
    };

    const toggleModel = (brandName: string, modelKey: string) => {
        setExpandedModels(prev => {
            const brandModels = prev[brandName] || [];
            if (brandModels.includes(modelKey)) {
                return {
                    ...prev,
                    [brandName]: brandModels.filter(key => key !== modelKey)
                };
            } else {
                return {
                    ...prev,
                    [brandName]: [...brandModels, modelKey]
                };
            }
        });
    };

    const isModelExpanded = (brandName: string, modelKey: string) => {
        return expandedModels[brandName]?.includes(modelKey) || false;
    };

    return (
        <div className={styles.figureContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Thông số kỹ thuật sản phẩm</h1>
                <p className={styles.subtitle}>Khám phá chi tiết từng dòng sản phẩm của chúng tôi</p>
            </div>

            <div className={styles.brandsContainer}>
                {data.map((brand, brandIndex) => (
                    <div
                        key={brandIndex}
                        className={`${styles.brandCard} ${expandedBrand === brand.name ? styles.expanded : ''}`}
                    >
                        <div
                            className={styles.brandHeader}
                            onClick={() => toggleBrand(brand.name)}
                        >
                            <div className={styles.brandImageContainer}>
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className={styles.brandImage}
                                />
                                <div className={styles.brandOverlay}></div>
                            </div>
                            <div className={styles.brandInfo}>
                                <h2 className={styles.brandName}>{brand.name}</h2>
                                <div className={styles.modelCount}>
                                    {brand.fig.length} mẫu sản phẩm
                                </div>
                            </div>
                            <div className={styles.expandIcon}>
                                <i className={`fas fa-chevron-${expandedBrand === brand.name ? 'up' : 'down'}`}></i>
                            </div>
                        </div>

                        {expandedBrand === brand.name && (
                            <div className={styles.modelsContainer}>
                                <div className={styles.modelsGrid}>
                                    {brand.fig.map((model, modelIndex) => (
                                        <div
                                            key={modelIndex}
                                            className={`${styles.modelCard} ${isModelExpanded(brand.name, model.key) ? styles.modelExpanded : ''}`}
                                        >
                                            <div
                                                className={styles.modelHeader}
                                                onClick={() => toggleModel(brand.name, model.key)}
                                            >
                                                <div className={styles.modelImageContainer}>
                                                    <img
                                                        src={model.image || brand.image}
                                                        alt={model.key}
                                                        className={styles.modelImage}
                                                    />
                                                    <div className={styles.modelOverlay}></div>
                                                </div>
                                                <div className={styles.modelInfo}>
                                                    <h3 className={styles.modelName}>Model {model.key}</h3>
                                                    <div className={styles.specCount}>
                                                        {model.value.length} thông số kỹ thuật
                                                    </div>
                                                </div>
                                                <div className={styles.modelExpandIcon}>
                                                    <i className={`fas fa-chevron-${isModelExpanded(brand.name, model.key) ? 'up' : 'down'}`}></i>
                                                </div>
                                            </div>

                                            {isModelExpanded(brand.name, model.key) && (
                                                <div className={styles.specsContainer}>
                                                    <div className={styles.specsGrid}>
                                                        {model.value.map((spec, specIndex) => (
                                                            <div key={specIndex} className={styles.specCard}>
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