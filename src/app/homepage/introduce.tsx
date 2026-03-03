'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/assets/styles/pages/home/introduce.module.css'
import { SloganInterface } from '@/infrastructure/interface/slogan/slogan.interface';
import sloganService from '@/infrastructure/repository/slogan/slogan.service';
import { configImageURL } from '@/infrastructure/helper/helper';
import { ConfigPageInterface } from '@/infrastructure/interface/configPage/configPage.interface';

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}

const IntroduceSection = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const configContent = configPage.find(item => item.type == type);

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
                        <h2 className="main-title-custom">

                            <article
                                dangerouslySetInnerHTML={{ __html: configContent?.title }}
                            />
                        </h2>
                        :
                        <h2 className="main-title">
                            Công nghệ vượt trội giúp <span className="highlight">bảo vệ xe tối đa</span>
                        </h2>
                }

                {configContent?.description
                    ?
                    <p className="subtitle">
                        {configContent?.description}
                    </p>
                    :
                    null
                }
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