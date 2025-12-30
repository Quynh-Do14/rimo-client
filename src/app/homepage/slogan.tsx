'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/assets/styles/pages/home/slogan.css";


const SloganSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        fade: true,
        adaptiveHeight: true,
        dotsClass: "slick-dots custom-dots",
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    arrows: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                    fade: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    dots: true,
                    fade: false,
                    speed: 600,
                }
            }
        ]
    };

    const slides = [
        {
            id: 1,
            title: "PHIM CÁCH NHIỆT Ô TÔ",
            description: "Công nghệ cách nhiệt cao cấp, bảo vệ toàn diện cho xe hơi",
            features: [
                "Chống tia UV 99.9%",
                "Giảm nhiệt cabin lên đến 85%",
                "An toàn khi va chạm, chống vỡ kính",
                "Bảo vệ nội thất xe khỏi phai màu",
                "Tiết kiệm nhiên liệu điều hòa"
            ],
            bgColor: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
            accentColor: "#FFD700"
        },
        {
            id: 2,
            title: "PHIM CÁCH NHIỆT 5G",
            description: "Không ảnh hưởng tín hiệu, tương thích công nghệ hiện đại",
            features: [
                "Không cản sóng 5G/4G",
                "Duy trì GPS, Bluetooth ổn định",
                "Tương thích với ADAS, camera 360",
                "Không ảnh hưởng hệ thống giải trí",
                "Bảo đảm kết nối không dây"
            ],
            bgColor: "linear-gradient(135deg, #121212 0%, #2a2a2a 100%)",
            accentColor: "#FFD700"
        },
        {
            id: 3,
            title: "PPF BẢO VỆ SƠN Ô TÔ",
            description: "Lớp màng bảo vệ sơn xe cao cấp, chống trầy xước",
            features: [
                "Chống trầy xước, va đập nhẹ",
                "Tự phục hồi vết xước nhiệt độ cao",
                "Chống hóa chất, phân chim, nhựa cây",
                "Chống ăn mòn, oxy hóa",
                "Bảo vệ sơn gốc, giữ giá trị xe"
            ],
            bgColor: "linear-gradient(135deg, #000000 0%, #333333 100%)",
            accentColor: "#FFD700"
        }
    ];

    return (
        <div className="car-tech-slider-container">
            <div className="slider-header">
                <h1 className="main-title">
                    ĐỘI NGŨ CHUYÊN GIA <span className="highlight">Ô TÔ</span>
                </h1>
                <p className="subtitle">
                    Công nghệ bảo vệ & nâng cấp xe hơi chuyên nghiệp
                </p>
            </div>

            <div className="slider-wrapper">
                <Slider {...settings}>
                    {slides.map((slide) => (
                        <div key={slide.id} className="car-slide-item">
                            <div
                                className="car-slide-content"
                                style={{
                                    background: slide.bgColor,
                                    borderColor: slide.accentColor
                                }}
                            >
                                <div className="car-slide-left">
                                    <div className="product-badge">
                                        <span className="badge-text">CÔNG NGHỆ CAO</span>
                                    </div>

                                    <h2 className="car-slide-title">
                                        <span className="title-text">{slide.title}</span>
                                    </h2>

                                    <p className="car-slide-description">{slide.description}</p>

                                    <div className="car-features-list">
                                        {slide.features.map((feature, index) => (
                                            <div key={index} className="car-feature-item">
                                                <div
                                                    className="feature-icon-wrapper"
                                                    style={{ backgroundColor: slide.accentColor }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </div>
                                                <span className="car-feature-text">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="action-buttons">
                                        <button
                                            className="primary-btn"
                                            style={{ backgroundColor: slide.accentColor }}
                                        >
                                            <span className="btn-text">ĐẶT LỊCH NGAY</span>
                                            <span className="btn-icon">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </button>
                                        <button className="secondary-btn">
                                            <span className="btn-text">XEM BẢNG GIÁ</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="car-slide-right">
                                    <div className="car-image-container">
                                        <div className="car-image-placeholder">
                                            <div className="car-silhouette">
                                                <div className="car-window-tint"></div>
                                                <div className="car-body"></div>
                                                <div className="car-wheels"></div>
                                            </div>
                                            <div className="product-tag">
                                                <span className="tag-text">PREMIUM</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tech-specs">
                                        <div className="spec-item">
                                            <div className="spec-value">10+</div>
                                            <div className="spec-label">Năm bảo hành</div>
                                        </div>
                                        <div className="spec-item">
                                            <div className="spec-value">48H</div>
                                            <div className="spec-label">Thi công</div>
                                        </div>
                                        <div className="spec-item">
                                            <div className="spec-value">24/7</div>
                                            <div className="spec-label">Hỗ trợ</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default SloganSlider;