import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedListings from '@/components/FeaturedListings';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <FeaturedListings />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
