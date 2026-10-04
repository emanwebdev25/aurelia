import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";
import BrandStory from "@/components/home/BrandStory";
import PromoBanner from "@/components/home/PromoBanner";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedCategories />
        <NewArrivals />
        <BestSellers />
        <BrandStory />
        <PromoBanner />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}