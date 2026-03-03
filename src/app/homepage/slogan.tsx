'use client'
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/assets/styles/pages/home/slogan.css";
import categoryProductService from "@/infrastructure/repository/category/categoryProduct.service";
import { configImageURL } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import videoService from "@/infrastructure/repository/video/video.service";
import YouTubeThumbnail from "@/infrastructure/common/thumbnailYoutube/thumbnailYoutube";
import { VideoInterface } from "@/infrastructure/interface/video/video.interface";
import dynamic from "next/dynamic";
import { PageLoading } from "@/infrastructure/common/loading/loadingPage";
import { Modal } from "antd";
import YoutubeVideo from "@/infrastructure/common/thumbnailYoutube/youtube";
import { ConfigPageInterface } from "@/infrastructure/interface/configPage/configPage.interface";

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}

const SloganContent = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const configContent = configPage.find(item => item.type == type);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        fade: false, // Đổi từ true thành false để có transition slide thay vì fade
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

    const [listProductCategory, setListProductCategory] = useState<Array<VideoInterface>>([])
    const [selectedVideo, setSelectedVideo] = useState<string>('');
    const [isOpenModalVideo, setIsOpenModalVide] = useState<boolean>(false);

    const onGetListCategoryProductAsync = async () => {
        const param = {
            limit: 8,
        }
        try {
            await videoService.GetVideo(
                param,
                () => { }
            ).then((res) => {
                setListProductCategory(res.data);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListCategoryProductAsync().then(_ => { });
    }, []);

    const onOpenModalVideo = (item: VideoInterface, videoId: string) => {
        setSelectedVideo(videoId);
        setIsOpenModalVide(true);
    };

    return (
        <div className="car-tech-slider-container">
            <div className="section-header dark">
                {
                    configContent?.box_content
                        ?
                        < div className="header-badge">
                            <span className="badge-text">{configContent?.box_content}</span>
                        </div>
                        : null
                }
                {
                    configContent?.title
                        ?
                        <h1 className="main-title-custom">

                            <article
                                dangerouslySetInnerHTML={{ __html: configContent?.title }}
                            />
                        </h1>
                        :
                        <h1 className="main-title">
                            CÔNG NGHỆ <span className="highlight">MỚI</span>
                        </h1>
                }

                <p className="subtitle">
                    {configContent?.description ? configContent?.description : "PCU cao cấp - Tự phục hồi vết xước ở 20°C"}
                </p>
            </div>
            <div className="slider-wrapper">
                <Slider {...settings}>
                    {listProductCategory.map((slide, index) => {
                        const videoId = slide.link_url.split('v=')[1];
                        return (
                            <div onClick={() => onOpenModalVideo(slide, videoId)} key={index} className="car-slide-item">
                                <div
                                    className="car-slide-content"
                                    style={{
                                        background: "linear-gradient(180deg, #222222 0%, #333333 100%)",
                                        borderColor: "#FFD700"
                                    }}
                                >
                                    <div className="car-slide-left">
                                        <div className="product-badge">
                                            <span className="badge-text">Video trải nghiệm</span>
                                        </div>

                                        <h2 className="car-slide-title">
                                            <span className="title-text text-truncate-3">{slide.name}</span>
                                        </h2>

                                        <p className="car-slide-description text-truncate-4">{slide.description}</p>
                                    </div>

                                    <div className="car-slide-right">
                                        <div className="car-image-container">
                                            {/* <div
                                            className="car-image-placeholder"
                                            style={{
                                                backgroundImage: `url(${configImageURL(slide.image)})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        >
                                        </div> */}
                                            <YouTubeThumbnail name={slide.name} url={slide.link_url} />
                                            <div className="play-icon">
                                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                                    <circle cx="40" cy="40" r="38" fill="white" fill-opacity="0.9" />
                                                    <path d="M32 24L56 40L32 56V24Z" fill="black" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
                <Modal
                    key={"f-0"}
                    open={isOpenModalVideo}
                    width={"90%"}
                    closable={true}
                    onCancel={() => setIsOpenModalVide(false)}
                    footer={null}
                    centered
                    destroyOnHidden
                >
                    <YoutubeVideo
                        videoId={selectedVideo}
                    />
                </Modal>
            </div>
        </div>
    );
};

const SloganSlider = dynamic(() => Promise.resolve(SloganContent), {
    ssr: false,
    loading: () => <PageLoading />
});

export default SloganSlider;