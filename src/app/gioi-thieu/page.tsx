import { ROUTE_PATH } from '@/core/common/appRouter'
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import React from 'react'
import styles from '@/assets/styles/pages/introduce.module.css'
import VTV from '@/assets/images/gioi-thieu/VTV.png'
import HTV from '@/assets/images/gioi-thieu/HTV.png'
import VOV from '@/assets/images/gioi-thieu/VOV.png'
import VTC from '@/assets/images/gioi-thieu/VTC.png'
import TipCar from '@/assets/images/gioi-thieu/tip-car.png'
import XeHay from '@/assets/images/gioi-thieu/xe-hay.png'
import XeCung from '@/assets/images/gioi-thieu/xe-cung.png'
import TinhT from '@/assets/images/gioi-thieu/tinh-t.png'
import Toyota from '@/assets/images/gioi-thieu/TOYOTA.png'
import Mitsubishi from '@/assets/images/gioi-thieu/Mitshubishi.png'
import Hyundai from '@/assets/images/gioi-thieu/Huyndai.png'
import AutoDaily from '@/assets/images/gioi-thieu/auto-daily-100x100.png'
import Image from 'next/image'
import TocClient from './tocClient'

const IntroducePage = () => {
    const mediaLogos = [
        { name: 'VTV', image: VTV },
        { name: 'HTV', image: HTV },
        { name: 'VOV', image: VOV },
        { name: 'VTC', image: VTC },
        { name: 'Tip Car', image: TipCar },
        { name: 'Xe Hay', image: XeHay },
        { name: 'Xe Cung', image: XeCung },
        { name: 'Tinh Tế', image: TinhT },
        { name: 'Toyota', image: Toyota },
        { name: 'Mitsubishi', image: Mitsubishi },
        { name: 'Hyundai', image: Hyundai },
        { name: 'Auto Daily', image: AutoDaily },
    ]

    return (
        <ClientLayout>
            <div className={`${styles.introduceContainer} padding-common`}>
                <BreadcrumbCommon
                    breadcrumb={"Giới thiệu"}
                    redirect={ROUTE_PATH.INTRODUCE}
                    title={'CÔNG TY TNHH THƯƠNG MẠI XNK NỘI THẤT Ô TÔ QUANG MINH'}
                    blackColor={true}
                />
                <TocClient />

                <div className={styles.container}>
                    <h1 className={styles.title} id='gioi-thieu'>CÔNG TY TNHH TM XNK NỘI THẤT Ô TÔ QUANG MINH</h1>

                    <p className={styles.paragraph}>
                        Công ty TNHH Thương Mại Xuất nhập khẩu Nội thất ô tô Quang Minh chuyên cung cấp các sản phẩm phụ kiện,
                        phim cách nhiệt chính hãng và uy tín trên toàn quốc. Không chỉ đem tới một sản phẩm tốt,
                        một giải pháp thông minh mà chúng tôi còn luôn không ngừng đổi mới, sáng tạo để phù hợp
                        với nhu cầu sử dụng tốt nhất của khách hàng tại Việt Nam.
                    </p>

                    <h2 className={styles.heading} id='tam-nhin'>Tầm nhìn</h2>
                    <p className={styles.paragraph}>
                        Không ngừng thay đổi và lớn mạnh, Quang Minh định hướng chinh phục các mục tiêu phát triển
                        to lớn, trở thành đơn vị uy tín hàng đầu châu Á về cung cấp các sản phẩm công nghệ nâng tầm
                        nội thất cho ô tô.
                    </p>
                    <p className={styles.paragraph}>
                        Chúng tôi luôn chú trọng đầu tư vào các cơ sở trang thiết bị hiện đại, chuẩn quốc tế cùng
                        đào tạo nguồn nhân lực chuyên môn cao, cung cấp các dịch vụ bền vững, nâng tầm những trải nghiệm
                        giá trị nhất dành cho khách hàng.
                    </p>

                    <h2 className={styles.heading} id='su-menh'>Sứ mệnh</h2>
                    <p className={styles.paragraph}>
                        Mang trong mình sứ mệnh vì khách hàng mà phụng sự, Quang Minh cam kết mang lại những giải pháp
                        tốt nhất cho không gian nội thất ô tô của bạn.
                    </p>
                    <p className={styles.paragraph}>
                        Với các sản phẩm phim cách nhiệt chất lượng cao, chính hãng, giá thành đảm bảo niêm yết cùng
                        sự chuyên nghiệp trong dịch vụ, chúng tôi tin rằng mọi khách hàng khi đến với Quang Minh đều
                        sẽ nhận được sự hài lòng tuyệt đối.
                    </p>

                    <h2 className={styles.heading} id='gia-tri-cot-loi'>Giá trị cốt lõi RIMO</h2>
                    <p className={styles.paragraph}><strong>I – Integrity:</strong> Chính trực, minh bạch trong cách làm việc và nguồn gốc sản phẩm.</p>
                    <p className={styles.paragraph}><strong>N – Navigation:</strong> Tiên phong công nghệ phún xạ 12 lớp kim loại trong phim cách nhiệt.</p>
                    <p className={styles.paragraph}><strong>M – Morally:</strong> Làm việc bằng cái tâm, đặt đạo đức nghề nghiệp lên hàng đầu.</p>
                    <p className={styles.paragraph}><strong>A – Acknowledge:</strong> Am hiểu sản phẩm, thấu hiểu khách hàng để đưa ra giải pháp phù hợp.</p>
                    <p className={styles.paragraph}><strong>X:</strong> Tượng trưng cho cơ chế phản xạ nhiệt – giá trị cốt lõi của Rimo.</p>

                    <h2 className={styles.heading} id='su-khac-biet'>Sự khác biệt của phim cách nhiệt Rimo</h2>
                    <ul className={styles.list}>
                        <li>Cản nhiệt tốt hơn 10–18°C so với các dòng phim hấp thụ nhiệt</li>
                        <li>Độ xuyên sáng cao, đảm bảo tầm nhìn khi lái xe</li>
                        <li>Độ bền lên đến 30 năm</li>
                        <li>Ngăn 99% tia UV và bức xạ hồng ngoại</li>
                        <li>Giữ mát xe, giảm tải cho hệ thống điều hòa</li>
                        <li>Bảo vệ kính, hạn chế nứt vỡ do nhiệt</li>
                        <li>Nhập khẩu chính hãng, kiểm định và bảo hành đầy đủ</li>
                    </ul>
                    <h2 className={styles.heading} id='doi-tac'>Đối tác của Rimo</h2>
                    <table className={styles.tableMedia}>
                        <tbody>
                            <tr>
                                <td>
                                    <Image src={mediaLogos[0].image} alt={mediaLogos[0].name} width={100} height={100} />
                                </td>
                                <td>
                                    <Image src={mediaLogos[1].image} alt={mediaLogos[1].name} width={100} height={100} />
                                </td>
                                <td>
                                    <Image src={mediaLogos[2].image} alt={mediaLogos[2].name} width={100} height={100} />
                                </td>
                                <td>
                                    <Image src={mediaLogos[3].image} alt={mediaLogos[3].name} width={100} height={100} />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <Image src={mediaLogos[4].image} alt={mediaLogos[4].name} width={100} height={100} />
                                </td>
                                <td>
                                    <Image src={mediaLogos[5].image} alt={mediaLogos[5].name} width={100} height={100} />
                                </td>
                                <td>
                                    <Image src={mediaLogos[6].image} alt={mediaLogos[6].name} width={100} height={100} />
                                </td>
                                <td>
                                    <Image src={mediaLogos[7].image} alt={mediaLogos[7].name} width={100} height={100} />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <Image src={mediaLogos[8].image} alt={mediaLogos[8].name} width={100} height={100} />
                                </td>
                                <td>
                                    <Image src={mediaLogos[9].image} alt={mediaLogos[9].name} width={100} height={100} />
                                </td>
                                <td>
                                    <Image src={mediaLogos[10].image} alt={mediaLogos[10].name} width={100} height={100} />
                                </td>
                                <td>
                                    <Image src={mediaLogos[11].image} alt={mediaLogos[11].name} width={100} height={100} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </ClientLayout>
    )
}

export default IntroducePage