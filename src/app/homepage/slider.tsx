'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/assets/styles/pages/home/fullWidthSlider.css'
import bannerService from "@/infrastructure/repository/banner/banner.service";
import { configImageURL } from "@/infrastructure/helper/helper";
import { BannerInterface } from "@/infrastructure/interface/banner/banner.interface";
import AnimatedNumber from "@/infrastructure/common/controls/AnimatedNumber";
import dynamic from "next/dynamic";
import { Settings } from "react-slick";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { ConfigPageInterface } from "@/infrastructure/interface/configPage/configPage.interface";

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}

const Slider = dynamic(() => import("react-slick"), {
    ssr: false,
    loading: () =>
        <div className="slider-wrapper">
            <div className="slide-item"></div>
        </div>
});


const FullWidthSlider = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const configContent: ConfigPageInterface[] = configPage.filter(item => item.type == type);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [listBanner, setListBanner] = useState<Array<BannerInterface>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [isAnimate, setIsAnimate] = useState<boolean>(false);
    const textRef = useRef<HTMLDivElement>(null);

    const onGetListBannerAsync = async () => {
        try {
            await bannerService.GetBanner(
                {
                    type: "HOMEPAGE"
                },
                setLoading
            ).then((res) => {
                setListBanner(res.data);
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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Chỉ set true một lần duy nhất
                if (entry.isIntersecting && !isAnimate) {
                    setIsAnimate(true);
                }
            },
            {
                threshold: 0.1
            }
        );

        const currentSectionRef = textRef.current;
        if (currentSectionRef) {
            observer.observe(currentSectionRef);
        }

        return () => {
            if (currentSectionRef) {
                observer.unobserve(currentSectionRef);
            }
        };
    }, [isAnimate]);

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
            {
                !loading ?
                    <div className="slider-wrapper">
                        <Slider {...settings}>
                            {listBanner.map((slide, index: number) => (
                                <Link href={slide.url ? slide.url : ROUTE_PATH.PRODUCT} key={index} className="slide-item">
                                    {/* Background Image with Overlay */}
                                    <div
                                        className="slide-background"
                                        style={{
                                            backgroundImage: `url(${configImageURL(slide.image)})`,
                                            '--overlay-color': 'rgba(0, 0, 0, 0.4)'
                                        } as React.CSSProperties}
                                    >
                                    </div>
                                </Link>
                            ))}
                        </Slider>
                    </div>
                    :
                    <div className="slider-wrapper">
                        <div className="slide-item"></div>
                    </div>
            }


            {/* Stats Bar */}
            <div className="stats-bar">
                <div className="stats-container">
                    {configContent.map((stat: ConfigPageInterface, index: number) => (
                        <div key={index} className="stat-item" >

                            <div className="stat-number">
                                <article
                                    dangerouslySetInnerHTML={{ __html: stat.title }}
                                />
                            </div>
                            <div ref={textRef} className="stat-label">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default FullWidthSlider;