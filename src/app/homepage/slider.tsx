'use client'
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/assets/styles/pages/home/fullWidthSlider.css'
import bannerService from "@/infrastructure/repository/banner/banner.service";
import { configImageURL } from "@/infrastructure/helper/helper";

interface Stat {
    number: string;
    label: string;
    suffix: string;
}

const FullWidthSlider = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [listBanner, setListBanner] = useState<Array<string>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const onGetListBannerAsync = async () => {
        try {
            await bannerService.GetBanner(
                {},
                setLoading
            ).then((res) => {
                const listImg = res.data.map((item: any) => item.image)
                setListBanner(listImg);
            })
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        onGetListBannerAsync().then(_ => { });
    }, []);

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        fade: true,
        adaptiveHeight: false,
        beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
        appendDots: (dots: React.ReactNode) => (
            <div className="custom-dots-container">
                <ul className="custom-dots"> {dots} </ul>
            </div>
        ),
        customPaging: (i: number) => (
            <div className={`dot-indicator ${currentSlide === i ? 'active' : ''}`}>
                <span className="dot-number">0{i + 1}</span>
                <div className="dot-progress"></div>
            </div>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    fade: false,
                }
            }
        ]
    };

    const stats: Stat[] = [
        { number: "10+", label: "Năm kinh nghiệm", suffix: "năm" },
        { number: "5000+", label: "Khách hàng", suffix: "khách" },
        { number: "99%", label: "Hài lòng", suffix: "hài lòng" },
        { number: "24/7", label: "Hỗ trợ", suffix: "hỗ trợ" }
    ];
    console.log('listBanner', listBanner);

    return (
        <div className="modern-slider-container">
            <style jsx>{`
            :global(.slick-arrow) {
                width: 60px !important;
                height: 60px !important;
                z-index: 10 !important;
                background: rgba(0, 0, 0, 0.3) !important;
                border-radius: 50% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.3s ease !important;
                backdrop-filter: blur(10px) !important;
            }

            :global(.slick-arrow:hover) {
                background: rgba(0, 0, 0, 0.5) !important;
                transform: scale(1.1) !important;
            }

            :global(.slick-arrow:before) {
                font-size: 24px !important;
                color: #FFD700 !important;
                opacity: 1 !important;
            }

            :global(.slick-prev) {
                left: 40px !important;
            }

            :global(.slick-next) {
                right: 40px !important;
            }

            :global(.slick-dots) {
                display: none !important;
            }

            @media (max-width: 992px) {
                :global(.slick-arrow) {
                display: none !important;
                }
            }

            @media (max-width: 1200px) {
                :global(.slick-arrow) {
                width: 50px !important;
                height: 50px !important;
                }
            }
            `}</style>
            {/* Main Slider */}
            <div className="slider-wrapper">
                <Slider {...settings}>
                    {listBanner.map((slide: string, index: number) => (
                        <div key={index} className="slide-item">
                            {/* Background Image with Overlay */}
                            <div
                                className="slide-background"
                                style={{
                                    backgroundImage: `url(${configImageURL(slide)})`,
                                    '--overlay-color': 'rgba(0, 0, 0, 0.4)'
                                } as React.CSSProperties}
                            >
                                <div className="image-overlay"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="slide-content">
                                <div className="content-wrapper">
                                    {/* Slide Badge */}
                                    <div className="slide-badge">
                                        <span className="badge-text">QUAD FILM PREMIUM</span>
                                        <div className="badge-line"></div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="main-content">
                                        {/* <div className="title-group">
                                            <h2 className="slide-title">
                                                {slide.title}
                                            </h2>
                                            <h3 className="slide-subtitle">
                                                {slide.subtitle}
                                            </h3>
                                        </div>

                                        <p className="slide-description">
                                            {slide.description}
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
                <div className="stats-container">
                    {stats.map((stat: Stat, index: number) => (
                        <div key={index} className="stat-item">
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                            <div className="stat-suffix">{stat.suffix}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default FullWidthSlider;