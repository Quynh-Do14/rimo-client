import styles from '@/assets/styles/components/footer.module.css';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaCar, FaShieldAlt, FaFileContract, FaWrench, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

const FooterSection = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>
                        LIÊN HỆ
                    </h3>
                    <div className={styles.contactInfo}>
                        <p className={styles.contactItem}>
                            <FaMapMarkerAlt className={styles.contactIcon} />
                            <span>Địa chỉ: Số 12 Ngõ 44 Tư Đình – Tổ 5 – Phường Long Biên – Thành phố Hà Nội</span>
                        </p>
                        <p className={styles.contactItem}>
                            <FaMapMarkerAlt className={styles.contactIcon} />
                            <span>Địa chỉ: Số 15 Tùng Thiện Vương – Phường Phú Định – Thành phố Hồ Chí Minh</span>
                        </p>
                        <p className={styles.contactItem}>
                            <FaEnvelope className={styles.contactIcon} />
                            <span>inmax.quangminh@gmail.com</span>
                        </p>
                        <p className={styles.contactItem}>
                            <FaPhoneAlt className={styles.contactIcon} />
                            <span>1900.8113</span>
                        </p>
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>
                        LIÊN KẾT
                    </h3>
                    <ul className={styles.linksList}>
                        <li className={styles.linkItem}>
                            <FaFileContract className={styles.linkIcon} />
                            <a href="#" className={styles.link}>Chính sách bảo hành</a>
                        </li>
                        <li className={styles.linkItem}>
                            <FaWrench className={styles.linkIcon} />
                            <a href="#" className={styles.link}>Dịch vụ sửa chữa</a>
                        </li>
                        <li className={styles.linkItem}>
                            <FaShieldAlt className={styles.linkIcon} />
                            <a href="#" className={styles.link}>Bảo dưỡng định kỳ</a>
                        </li>
                    </ul>
                </div>

                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>
                        THEO DÕI CHÚNG TÔI
                    </h3>
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
                </div>
            </div>

            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} RIMO. Tất cả các quyền được bảo lưu.</p>
                <p>Chuyên gia phim cách nhiệt & chăm sóc ô tô hàng đầu Việt Nam</p>
            </div>
        </footer>
    );
}
export default FooterSection;