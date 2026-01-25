'use client'
import React, { useEffect, useState } from "react";
import "@/assets/styles/pages/home/article.css";
import blogService from "@/infrastructure/repository/blog/blog.service";
import { configImageURL, convertDateOnlyShow, convertSlug } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import Image from "next/image";

const ArticleSection = () => {
    const [highlightedArticle, setHighlightedArticle] = useState<any>({})
    const [featuredArticle, setFeaturedArticle] = useState<any>({})
    const [listBlog, setListBlog] = useState<Array<any>>([])

    const [loading, setLoading] = useState<boolean>(false);

    const onGetListBlogAsync = async () => {
        const param = {
            limit: 6,
        }
        try {
            await blogService.GetBlog(
                param,
                setLoading
            ).then((res) => {
                // setHighlightedArticle(res.data?.[0]);
                // setFeaturedArticle(res.data?.[1]);
                // setListBlog(res.data?.slice(2, 6));
                setListBlog(res.data);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListBlogAsync().then(_ => { });
    }, []);

    return (
        <div className="news-article-container">
            {/* Header */}
            <div className="news-header">
                <div className="article-badge">
                    <span className="badge-text">TIN TỨC & BÀI VIẾT</span>
                </div>
                <h2 className="article-title">
                    Cập Nhật <span className="highlight">Tin Tức</span> Mới Nhất
                </h2>
                <p className="article-subtitle">
                    Thông tin mới nhất về công nghệ, sự kiện và kiến thức chuyên sâu về bảo vệ ô tô
                </p>
            </div>

            {/* Featured Article */}
            {/* {featuredArticle && (
                <div className="featured-article">
                    <div className="featured-image">
                        <Image
                            src={configImageURL(featuredArticle.image)}
                            alt={featuredArticle.title}
                            width={500}
                            height={300}
                            className="object-cover" />
                        <div className="image-overlay"></div>
                        <div className="featured-badge">
                            <span className="badge-text">NỔI BẬT</span>
                        </div>
                    </div>
                    <div className="featured-content">
                        <div className="category-tag">
                            <span className="tag-text">{featuredArticle.category_name}</span>
                        </div>
                        <h3 className="featured-title">{featuredArticle.title}</h3>
                        <p className="featured-excerpt text-truncate-3">{featuredArticle.short_description}</p>
                        <div className="featured-meta">
                            <div className="meta-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span>{convertDateOnlyShow(featuredArticle.created_at)}</span>
                            </div>
                            <div className="meta-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <span>{featuredArticle.user_name}</span>
                            </div>
                        </div>
                        <button className="read-more-btn">
                            <span className="btn-text">XEM CHI TIẾT</span>
                            <span className="btn-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            )} */}

            {/* Highlighted Technology Card */}
            {/* {highlightedArticle && (
                <div className="tech-highlight-card">
                    <div className="tech-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>
                    <div className="tech-content">
                        <div className="tech-badge">
                            <span className="badge-text">{highlightedArticle.category_name}</span>
                        </div>
                        <h3 className="tech-title">{highlightedArticle.title}</h3>
                        <p className="tech-description text-truncate-3">{highlightedArticle.short_description}</p>
                        <button className="tech-cta-btn">
                            <span className="btn-text">KHÁM PHÁ NGAY</span>
                            <span className="btn-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                            </span>
                        </button>
                    </div>
                    <div className="tech-image">
                        <Image
                            src={configImageURL(highlightedArticle.image)}
                            alt={highlightedArticle.title}
                            width={500}
                            height={300}
                            className="object-cover" />
                    </div>
                </div>
            )} */}

            {/* News Grid */}
            <div className="news-grid">
                {listBlog
                    // .filter(article => !article.featured && !article.highlight)
                    .map(article => (
                        <div key={article.id} className="news-card">
                            <div className="card-image">
                                <Image
                                    src={configImageURL(article.image)}
                                    alt={article.title}
                                    width={500}
                                    height={300}
                                    className="object-cover"
                                />
                                <div className="card-category">
                                    <span className="category-text">{article.category_name}</span>
                                </div>
                                <div className="card-overlay"></div>
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{article.title}</h3>
                                <p className="card-excerpt text-truncate-3">{article.short_description}</p>
                                <div className="card-meta">
                                    <div className="meta-item">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <span>{convertDateOnlyShow(article.created_at)}</span>
                                    </div>
                                    <div className="meta-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        <span>{article.user_name}</span>
                                    </div>
                                </div>
                                <Link
                                    href={`${ROUTE_PATH.BLOG}/${convertSlug(article?.title)}-${article?.id}.html`} className="card-footer">
                                    <button className="card-read-btn">
                                        <span className="btn-text">Xem chi tiết</span>
                                        <span className="btn-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Load More */}
            {/* <Link href={ROUTE_PATH.BLOG}>
                <div className="load-more-article">
                    <button className="load-more-btn">
                        <span className="btn-text">TẢI THÊM BÀI VIẾT</span>
                        <span className="btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                        </span>
                    </button>
                </div>
            </Link> */}
        </div >
    );
};

export default ArticleSection;