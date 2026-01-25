'use client'

import { ROUTE_PATH } from '@/core/common/appRouter'
import React, { useEffect, useState } from 'react'
import styles from "@/assets/styles/pages/blog/blog.module.css";
import Link from 'next/link';
import { configImageURL, convertDateOnlyShow, convertSlug } from '@/infrastructure/helper/helper';
import blogService from '@/infrastructure/repository/blog/blog.service'
import Image from 'next/image'
import { BlogInterface } from '@/infrastructure/interface/blog/blog.interface'
import BlogSkeleton from '@/app/tin-tuc/skeleton'

const BlogInProductSlug = () => {
    const [listBlog, setListBlog] = useState<Array<BlogInterface>>([])
    const [loading, setLoading] = useState<boolean>(false);


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
        onGetListBlogAsync().then(() => { });
    }, []);

    return (
        <div className={styles.newsArticleContainer}>
            <div className={styles.newsGrid}>
                {loading
                    ?
                    <BlogSkeleton />
                    :
                    listBlog.map((article, index) => (
                        <div key={index} className={styles.newsCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src={configImageURL(article.image)}
                                    alt={article.title}
                                    width={500}
                                    height={300}
                                    className={styles.cardImage}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className={styles.cardCategory}>
                                    <span className={styles.categoryText}>
                                        {article.category_name}
                                    </span>
                                </div>
                                <div className={styles.cardOverlay}></div>
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{article.title}</h3>
                                <p className={styles.cardExcerpt}>{article.short_description}</p>
                                <div className={styles.cardMeta}>
                                    <div className={styles.metaItem}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <span>{convertDateOnlyShow(article.created_at)}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        <span>{article.user_name}</span>
                                    </div>
                                </div>
                                <div className={styles.cardFooter}>
                                    <Link
                                        href={`${ROUTE_PATH.BLOG}/${convertSlug(article?.title)}-${article?.id}.html`}
                                        className={styles.cardReadBtn}
                                    >
                                        <span className={styles.btnText}>Xem chi tiết</span>
                                        <span className={styles.btnIcon}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
export default BlogInProductSlug;