import { ROUTE_PATH } from '@/core/common/appRouter';
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb';
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout';
import styles from '@/assets/styles/pages/product/slugProduct.module.css'
import { configImageURL, formatCurrency, splitTakeId } from '@/infrastructure/helper/helper';
import { Metadata } from 'next';
import GalleryComponent from './components/gallery';
import { Endpoint } from '@/core/common/apiLink';
import ProductAdvantageComponent from './components/advantage';
import RelationProductComponent from './components/relationProduct';
import { ProductInterface } from '@/infrastructure/interface/product/product.interface';

type Props = {
    params: { slug: string };
};
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata
    ({ params }: Props): Promise<Metadata> {
    const product: ProductInterface = await fetch(`${baseURL}${Endpoint.Product.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) => res.json());

    return {
        title: product.name,
        description: product.short_description,
        openGraph: {
            title: product.name,
            description: product.short_description,
            images: configImageURL(product.image),
        },
    };
}

const ProductSlugPage = async ({ params }: Props) => {
    const dataDetail: ProductInterface = await fetch(`${baseURL}${Endpoint.Product.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) =>
        res.json()
    );

    return (
        <ClientLayout>
            <div className={styles.productContainer}>
                <div className='padding-common'>
                    <BreadcrumbCommon
                        breadcrumb={"Sản phẩm"}
                        redirect={ROUTE_PATH.PRODUCT}
                        title={dataDetail.name}
                        blackColor={true}
                    />
                </div>
                <div className={`${styles.content} padding-common`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        {/* Column 1: Gallery */}
                        <div className="w-full">
                            <GalleryComponent slides={dataDetail.images} />
                        </div>

                        {/* Column 2: Product Info */}
                        <div className={styles.productInfo}>
                            <h1>{dataDetail.name}</h1>
                            <div className="space-y-4">
                                {/* Giá sản phẩm */}
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-red-600">
                                        {formatCurrency(dataDetail.price)}đ
                                    </span>
                                    {dataDetail.price_sale ? (
                                        <span className="text-lg text-gray-500 line-through">
                                            {formatCurrency(dataDetail.price_sale)}đ
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <div className="flex">
                                <div className={styles.categoryTag}>
                                    {dataDetail.category_name}
                                </div>
                            </div>
                            <ProductAdvantageComponent product={dataDetail.productFigure} />
                        </div>
                    </div>
                </div>
                <div
                    className={styles.productImg}
                    style={{
                        backgroundImage: `url(${configImageURL(dataDetail.image)})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                >
                    <div className={`${styles.content} padding-common`}>
                        <div className={styles.description}>
                            <h2>{dataDetail.short_description}</h2>
                        </div>
                    </div>
                </div>


                {/* <div className={`${styles.content} padding-common`}>
                    <div className={styles.specificationHeader}>
                        <div className={styles.title}>Ưu điểm nổi bật</div>
                    </div>
                    <ProductAdvantageComponent product={dataDetail.productFigure} />
                </div> */}

                <div className={`${styles.content} padding-common`}>
                    <div className={styles.specificationHeader}>
                        <div className={styles.title}>Mô tả sản phẩm</div>
                    </div>
                    <article
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: dataDetail.description }}
                    />
                </div>
                <div className={`${styles.content} padding-common`}>
                    <div className={styles.specificationHeader}>
                        <div className={styles.title}>Sản phẩm tương tự</div>
                    </div>
                    <RelationProductComponent listProduct={dataDetail.sameCategoryProducts} />
                </div>

            </div>
        </ClientLayout>
    )
}

export default ProductSlugPage