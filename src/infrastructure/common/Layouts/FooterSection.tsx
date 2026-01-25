import styles from '@/assets/styles/components/footer.module.css';
import { ROUTE_PATH } from '@/core/common/appRouter';
import Link from 'next/link';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaCar, FaShieldAlt, FaFileContract, FaWrench, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

const FooterSection = () => {
    const menuItems = [
        {
            id: "home",
            label: "TRANG CHỦ",
            href: ROUTE_PATH.HOME_PAGE,
        },
        {
            id: "introduce",
            label: "GIỚI THIỆU",
            href: ROUTE_PATH.INTRODUCE,
        },
        {
            id: "products",
            label: "SẢN PHẨM",
            href: ROUTE_PATH.PRODUCT,
        },
        {
            id: "agency",
            label: "ĐẠI Lý",
            href: ROUTE_PATH.AGENCY,
        },
        {
            id: "blog",
            label: "TIN TỨC",
            href: ROUTE_PATH.BLOG,
        },
        {
            id: "contact",
            label: "LIÊN HỆ",
            href: ROUTE_PATH.CONTACT,
        },
    ];

    const policy = [
        {
            id: "terms",
            label: "Thông tin về điều kiện giao dịch chung",
            href: ROUTE_PATH.TERMS_AND_CONDITIONS,
        },
        {
            id: "privacy",
            label: "CHÍNH SÁCH BẢO MẬT",
            href: ROUTE_PATH.PRIVACY_POLICY,
        },
        {
            id: "purchase",
            label: "CHÍNH SÁCH MUA HÀNG",
            href: ROUTE_PATH.PURCHASE_POLICY,
        },
        {
            id: "warranty",
            label: "CHÍNH SÁCH BẢO HÀNH - ĐỔI TRẢ",
            href: ROUTE_PATH.WARRANTY_RETURN_POLICY,
        },
        {
            id: "shipping",
            label: "Thông tin về vận chuyển và giao nhận",
            href: ROUTE_PATH.SHIPPING_DELIVERY_INFO,
        },
        {
            id: "payment",
            label: "Thông tin về các phương thức thanh toán",
            href: ROUTE_PATH.PAYMENT_METHODS_INFO,
        },
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerSection}>
                    <div className={styles.sectionTitle}>
                        LIÊN HỆ
                    </div>
                    <div className={styles.contactInfo}>
                        <div className={styles.companyInfo}>
                            Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh
                        </div>
                        <div className={styles.companyInfo}>
                            GPKD số 0107801299 do Sở KH và ĐT TP Hà Nội cấp ngày 12/04/2017
                        </div>
                        <div className={styles.companyInfo}>
                            Người đại diện: Ông Nguyễn Văn Ty
                        </div>
                        <div className={styles.contactDetails}>
                            <div className={styles.contactItem}>
                                <FaMapMarkerAlt className={styles.contactIcon} />
                                <span className={styles.contactText}>
                                    Địa chỉ: Số 12 Ngõ 44 Tư Đình – Tổ 5 – Phường Long Biên – Thành phố Hà Nội
                                </span>
                            </div>
                            <div className={styles.contactItem}>
                                <FaMapMarkerAlt className={styles.contactIcon} />
                                <span className={styles.contactText}>
                                    Địa chỉ: Số 15 Tùng Thiện Vương – Phường Phú Định – Thành phố Hồ Chí Minh
                                </span>
                            </div>
                            <div className={styles.contactItem}>
                                <FaEnvelope className={styles.contactIcon} />
                                <span className={styles.contactText}>
                                    inmax.quangminh@gmail.com
                                </span>
                            </div>
                            <div className={styles.contactItem}>
                                <FaPhoneAlt className={styles.contactIcon} />
                                <span className={styles.contactText}>
                                    1900.8113
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <div className={styles.sectionTitle}>
                        LIÊN KẾT NHANH
                    </div>
                    <ul className={styles.linksList}>
                        {
                            menuItems.map((item, index) => (
                                <li
                                    className={styles.linkItem}
                                    key={index}
                                >
                                    <Link
                                        href={item.href}
                                        className={styles.link}
                                        key={index}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className={styles.footerSection}>
                    <div className={styles.sectionTitle}>
                        CHÍNH SÁCH
                    </div>
                    <ul className={styles.linksList}>
                        {
                            policy.map((item, index) => (
                                <li className={styles.linkItem}
                                    key={index}
                                >
                                    <Link
                                        href={item.href}
                                        className={styles.link}
                                        key={index}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* <div className={styles.footerSection}>
                    <div className={styles.sectionTitle}>
                        THEO DÕI CHÚNG TÔI
                    </div>
                    <div className={styles.socialLinks}>
                        <a href="https://www.facebook.com/rimo.vietnam/" className={`${styles.socialIcon} ${styles.facebook}`} aria-label="Facebook">
                            <FaFacebook />
                        </a>
                        <a href="#" className={`${styles.socialIcon} ${styles.zalo}`} aria-label="Zalo">
                            <SiZalo />
                        </a>
                        <a href="#" className={`${styles.socialIcon} ${styles.youtube}`} aria-label="YouTube">
                            <FaYoutube />
                        </a>
                        <a href="#" className={`${styles.socialIcon} ${styles.tiktok}`} aria-label="TikTok">
                            <FaTiktok />
                        </a>
                    </div>
                </div>*/}
            </div>

            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} RIMO. Tất cả các quyền được bảo lưu.</p>
                <p>Chuyên gia phim cách nhiệt & chăm sóc ô tô hàng đầu Việt Nam</p>
            </div>
        </footer>
    );
}
export default FooterSection;