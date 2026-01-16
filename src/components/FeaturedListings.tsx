import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ListingCard from './ListingCard';
import { mockListings } from '@/data/mockListings';

const FeaturedListings = () => {
  const featuredListings = mockListings.slice(0, 6);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Fresh Listings</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Rooms Available <span className="text-gradient">Right Now</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Verified PGs, flats, and hostels near your college. Direct contact with owners - no middlemen!
          </p>
        </motion.div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredListings.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/listings">
            <Button variant="outline" size="lg" className="gap-2">
              View All Listings
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedListings;
