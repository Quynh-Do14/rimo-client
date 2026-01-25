import HeaderSection from "@/infrastructure/common/Layouts/HeaderSection";
import ArticleSection from "./homepage/article";
import FullWidthSlider from "./homepage/slider";
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import styles from '@/assets/styles/pages/home/home.module.css'
import ProductSection from "./homepage/product";
import SloganSlider from "./homepage/slogan";
import IntroduceSection from "./homepage/introduce";

export default function Home() {
  return (
    <ClientLayout>
      <div className={styles.homePageContainer}>
        <FullWidthSlider />
        <div className={styles.darkBackground}>
          <SloganSlider />
        </div>
        <ProductSection />
        <div className={styles.darkBackground}>
          <IntroduceSection />
        </div>
        <ArticleSection />
      </div>
    </ClientLayout>
  );
}
