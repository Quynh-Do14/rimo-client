import HeaderSection from "@/infrastructure/common/Layouts/HeaderSection";
import ArticleSection from "./homepage/article";
import FullWidthSlider from "./homepage/slider";
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import styles from '@/assets/styles/pages/home/home.module.css'
import ProductSection from "./homepage/product";
import SloganSlider from "./homepage/slogan";

export default function Home() {
  return (
    <ClientLayout>
      <div className={styles.homePageContainer}>
        <FullWidthSlider />
        <SloganSlider />
        <ProductSection />
        <ArticleSection />
      </div>
    </ClientLayout>
  );
}
