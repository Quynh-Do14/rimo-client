// app/sitemap.ts
import { MetadataRoute } from 'next'
import { Endpoint } from '@/core/common/apiLink'
import { ProductInterface } from '@/infrastructure/interface/product/product.interface'
import { BlogInterface } from '@/infrastructure/interface/blog/blog.interface'

const baseURL = process.env.NEXT_PUBLIC_API_URL
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch products
  const productsRes = await fetch(`${baseURL}${Endpoint.Product.Get}`, {
    next: { revalidate: 3600 } // Cache 1 giờ
  })
  const products: ProductInterface[] = await productsRes.json()

  // Fetch blogs
  const blogsRes = await fetch(`${baseURL}${Endpoint.Blog.Get}`, {
    next: { revalidate: 3600 }
  })
  const blogs: BlogInterface[] = await blogsRes.json()

  // Static URLs
  const staticUrls = [
    {
      url: 'https://rimo.vn/',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://rimo.vn/san-pham',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://rimo.vn/danh-muc',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://rimo.vn/dai-ly',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://rimo.vn/tin-tuc',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://rimo.vn/lien-he',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Dynamic product URLs
  const productUrls = products.map((product) => ({
    url: `${publicURL}/san-pham/${product.slug}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Dynamic blog URLs
  const blogUrls = blogs.map((blog) => ({
    url: `${publicURL}/tin-tuc/${blog.slug}`,
    lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticUrls, ...productUrls, ...blogUrls]
}