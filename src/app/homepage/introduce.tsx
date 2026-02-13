'use client'
import React, { useEffect, useState } from 'react';
import introduce1 from '@/assets/images/introduce1.jpg';
import introduce2 from '@/assets/images/introduce2.jpg';
import introduce3 from '@/assets/images/introduce3.jpg';
import introduce4 from '@/assets/images/introduce4.jpg';
import introduce5 from '@/assets/images/introduce5.jpg';
import introduce6 from '@/assets/images/introduce6.jpg';
import styles from '@/assets/styles/pages/home/introduce.module.css'
import { SloganInterface } from '@/infrastructure/interface/slogan/slogan.interface';
import sloganService from '@/infrastructure/repository/slogan/slogan.service';
import { configImageURL } from '@/infrastructure/helper/helper';

const IntroduceSection = () => {
    const [listResponse, setListResponse] = useState<Array<SloganInterface>>([])
    const onGetListAsync = async () => {
        const param = {

        }
        try {
            await sloganService.GetSlogan(
                param,
                () => { }
            ).then((res) => {
                setListResponse(res.data)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListAsync().then(_ => { });
    }, [])
    return (
        <div className={styles.introduceContainer}>
            <div className={styles.pageHeader}>
                <h2 className={styles.mainTitle}>
                    Công nghệ vượt trội giúp  <span className={styles.highlight}>bảo vệ xe tối đa</span>
                </h2>
                {/* <p className={styles.subtTitle}>
                    Công nghệ bảo vệ & nâng cấp xe hơi chuyên nghiệp
                </p> */}
            </div>
            <div className={styles.introduceContent}>
                {listResponse.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div
                            className={styles.imageContainer}
                            style={{
                                backgroundImage: `url(${configImageURL(item.image)})`,
                                objectFit: 'cover'
                            }}
                        >
                            <h3 className={styles.title}>{item.name}</h3>
                            <h4 className={styles.content}>{item.description}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default IntroduceSection