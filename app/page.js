import Banner from "./Banner/Banner";
import BestSelling from "./components/BestSelling";
import FashionSection from "./components/FashionSection";
import NewProducts from "./components/NewProducts";
import FeaturesSection from "./components/FeaturesSection";
import NewsletterSection from "./components/NewsletterSection";
import CategorySection from "./components/CategorySection";


export default function Home() {
  return (
    <>
      <Banner />
      <main className="min-h-screen bg-white text-gray-800">
        <BestSelling />
        <FashionSection />
        <NewProducts />
        <CategorySection />
        <NewsletterSection />
        <FeaturesSection />
      </main>
    </>
  );
}
