'use client'
import React, { useEffect, useState } from "react";
import "@/assets/styles/pages/home/article.css";
import blogService from "@/infrastructure/repository/blog/blog.service";
import { configImageURL, convertDateOnlyShow, convertSlug } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import Image from "next/image";
import { ConfigPageInterface } from "@/infrastructure/interface/configPage/configPage.interface";

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}

const ArticleSection = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const [listBlog, setListBlog] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(false);
    const configContent = configPage.find(item => item.type == type);

    const onGetListBlogAsync = async () => {
        const param = {
            limit: 4,
        }
        try {
            await blogService.GetBlog(
                param,
                setLoading
            ).then((res) => {
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
            <div className="section-header light">
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
                        <h2 className="main-title-custom">

                            <article
                                dangerouslySetInnerHTML={{ __html: configContent?.title }}
                            />
                        </h2>
                        :
                        <h2 className="main-title">
                            Cập Nhật <span className="highlight">Tin Tức</span> Mới Nhất
                        </h2>
                }
                <p className="subtitle">
                    {configContent?.description ? configContent?.description : "Thông tin mới nhất về công nghệ, sự kiện và kiến thức chuyên sâu về bảo vệ ô tô"}
                </p>
            </div>
            {/* News Grid */}
            <div className="news-grid">
                {listBlog
                    // .filter(article => !article.featured && !article.highlight)
                    .map(article => (
                        <Link
                            href={`${ROUTE_PATH.BLOG}/${convertSlug(article?.title)}-${article?.id}.html`} key={article.id} className="news-card">
                            <div className="card-image">
                                <Image
                                    src={configImageURL(article.image)}
                                    alt={article.title}
                                    width={900}
                                    height={600}
                                    className="object-cover"
                                />
                                {/* <div className="card-category">
                                    <span className="category-text">{article.category_name}</span>
                                </div> */}
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

                            </div>
                        </Link>
                    ))
                }
            </div >

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