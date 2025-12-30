'use client'
import React, { useState, useCallback, memo } from 'react'
import Slider, { Settings } from 'react-slick';
import styles from '@/assets/styles/pages/product.module.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { configImageURL } from '@/infrastructure/helper/helper';

const SlideItem = memo(({ slide }: { slide: string }) => {
    return (
        <div className={styles.slideItem}>
            <div
                className={styles.slideBackground}
                style={{ backgroundImage: `url(${configImageURL(slide)})` }}
                role="img"
            />
        </div>
    );
});

SlideItem.displayName = 'SlideItem';
type Props = {
    slides: string[];
};

const GalleryComponent = (props: Props) => {
    const { slides } = props;

    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const handleBeforeChange = useCallback((oldIndex: number, newIndex: number) => {
        setCurrentSlide(newIndex);
    }, []);

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 800, // Giảm tốc độ chuyển động
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        fade: true,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)', // Thêm easing mượt mà hơn
        adaptiveHeight: false,
        lazyLoad: 'progressive', // Tối ưu tải ảnh
        beforeChange: handleBeforeChange,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                    speed: 600,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    fade: false,
                    speed: 500,
                    cssEase: 'ease'
                }
            }
        ]
    };

    return (
        <div className={styles.sliderWrapper}>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <SlideItem key={index} slide={slide} />
                ))}
            </Slider>
        </div>
    )
}

export default memo(GalleryComponent);