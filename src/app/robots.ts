import { MetadataRoute } from 'next'

// ✅ Đúng cách
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // AI Crawlers
            {
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'CCBot',
                    'OAI-SiteChecker',
                    'anthropic-ai',
                    'FacebookBot',
                    'Claude-Web'
                ],
                disallow: '/',
            },
            // Googlebot
            {
                userAgent: 'Googlebot',
                allow: [
                    '/',
                    '/tin-tuc/',
                    '/san-pham/',
                    '/dai-ly/',
                ],
                disallow: [
                    '/api/',
                    '/admin/',
                    '/profile/',
                    '/login/',
                    '/register/',
                    '/user/',
                ],
            },
            // Google-Extended (AI crawler của Google)
            {
                userAgent: 'Google-Extended',
                disallow: '/', // Chặn nếu không muốn AI của Google crawl
            },
            // Default rule
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/tin-tuc/',
                    '/san-pham/',
                    '/dai-ly/',
                ],
                disallow: [
                    '/api/',
                    '/admin/',
                    '/profile/',
                    '/login/',
                    '/register/',
                    '/user/',
                ],
            },
        ],
        sitemap: 'https://rimo.vn/sitemap.xml',
    }
}