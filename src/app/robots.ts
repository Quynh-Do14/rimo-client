import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: [
                    '/profile/',
                    '/login/',
                    '/register/',
                    '/forgetPassword/'
                ],
                allow: [
                    '/*.js$',
                    '/*.css$',
                    '/*.png$',
                    '/*.jpg$',
                    '/*.jpeg$',
                    '/*.gif$',
                    '/*.pdf$',
                    '/*.doc$',
                    '/*.docx$',

                    '/tin-tuc/',
                    '/san-pham/',
                    '/dai-ly/',
                    '/gioi-thieu/',
                    '/lien-he/',
                ],
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/Register/RegisterGoogle',
            },
        ],
        sitemap: 'https://rimo.vn/sitemap.xml',
    }
}