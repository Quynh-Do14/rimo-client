const PREFIX = "";
const ADMIN_PREFIX = "/FATS/admin";

export const ROUTE_PATH = {

    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,
    VERIFY_EMAIL: `${PREFIX}/auth/verify-email`,
    FORGOT_PASSWORD: `${PREFIX}/auth/forgot-password`,
    RESET_PASSWORD: `${PREFIX}/auth/reset-password`,

    ///Client
    HOME_PAGE: `${PREFIX}/`,
    PRODUCT: `${PREFIX}/san-pham`,
    BLOG: `${PREFIX}/tin-tuc`,

    ///Management
    MANAGE_LAYOUT: `${ADMIN_PREFIX}`,

    CATEGORY_MANAGEMENT: `${ADMIN_PREFIX}/category`,
    ADD_CATEGORY_MANAGEMENT: `${ADMIN_PREFIX}/category/add`,

    BLOG_CATEGORY_MANAGEMENT: `${ADMIN_PREFIX}/blog-category-management`,
    ADD_BLOG_CATEGORY_MANAGEMENT: `${ADMIN_PREFIX}/blog-category-management/add`,

    BLOG_MANAGEMENT: `${ADMIN_PREFIX}/blog-management`,
    ADD_BLOG_MANAGEMENT: `${ADMIN_PREFIX}/blog-management/add`,

    INTERNAL_BLOG_MANAGEMENT: `${ADMIN_PREFIX}/internal-blog-management`,
    ADD_INTERNAL_BLOG_MANAGEMENT: `${ADMIN_PREFIX}/internal-blog-management/add`,

    BANNER_MANAGEMENT: `${ADMIN_PREFIX}/banner`,
    ADD_BANNER_MANAGEMENT: `${ADMIN_PREFIX}/banner/add`,

    USER_MANAGEMENT: `${ADMIN_PREFIX}/user-management`,
    ADD_USER_MANAGEMENT: `${ADMIN_PREFIX}/user-management/add`,

    VIDEO_MANAGEMENT: `${ADMIN_PREFIX}/video-management`,
    ADD_VIDEO_MANAGEMENT: `${ADMIN_PREFIX}/video-management/add`,
}