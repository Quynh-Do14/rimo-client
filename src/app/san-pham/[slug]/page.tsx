import { ROUTE_PATH } from '@/core/common/appRouter';
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb';
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout';
import styles from '@/assets/styles/pages/product/slugProduct.module.css'
import { configImageURL, splitTakeId } from '@/infrastructure/helper/helper';
import { Metadata } from 'next';
import GalleryComponent from './components/gallery';
import { Endpoint } from '@/core/common/apiLink';
import ProductAdvantageComponent from './components/advantage';
import ProductFiguresComponent from './components/figures';

type Props = {
    params: { slug: string };
};
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata
    ({ params }: Props): Promise<Metadata> {
    const blog = await fetch(`${baseURL}${Endpoint.Product.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) => res.json());

    return {
        title: blog.name,
        description: blog.short_description,
        openGraph: {
            title: blog.name,
            description: blog.short_description,
            images: configImageURL(blog.image),
        },
    };
}

const ProductSlugPage = async ({ params }: Props) => {
    const dataDetail = await fetch(`${baseURL}${Endpoint.Product.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) =>
        res.json()
    );

    const dataProductSeries = await fetch(`${baseURL}${Endpoint.ProductSeries.Get}?product_id=${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) =>
        res.json()
    );
    console.log('dataProductSeries', dataProductSeries);

    return (
        <ClientLayout>
            <div className={styles.productContainer}>
                <div className='padding-common'>
                    <BreadcrumbCommon
                        breadcrumb={"Sản phẩm"}
                        redirect={ROUTE_PATH.PRODUCT}
                        title={dataDetail.name}
                    />
                </div>
                <div
                    className={styles.productImg}
                    style={{
                        backgroundImage: `url(${configImageURL(dataDetail.image)})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed'
                    }}
                >
                    <div className={`${styles.content} padding-common`}>
                        <h1>{dataDetail.name}</h1>
                        <div className={styles.description}>
                            <h2>{dataDetail.short_description}</h2>
                        </div>
                    </div>
                </div>

                <div className={`${styles.content} padding-common`}>
                    <GalleryComponent slides={dataDetail.images} />
                </div>
                <div className={`${styles.content} padding-common`}>
                    <div className={styles.specificationHeader}>
                        <div className={styles.title}>Ưu điểm nổi bật</div>
                    </div>
                    <ProductAdvantageComponent product={dataDetail.productFigure} />
                </div>
                <div className={`${styles.content} padding-common`}>
                    <ProductFiguresComponent dataProductSeries={dataProductSeries.data} />
                </div>
            </div>
        </ClientLayout>
    )
}

export default ProductSlugPage