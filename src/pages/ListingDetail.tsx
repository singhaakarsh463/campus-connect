import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockListings } from '@/data/mockListings';
import {
  MapPin,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  IndianRupee,
  Navigation,
  BadgeCheck,
  GraduationCap,
  Home,
  Building,
  Users,
  Wifi,
  Utensils,
  Car,
  Shield,
  Dumbbell,
  Tv,
  Droplets,
  Shirt,
  Zap,
  Video,
  UserCheck,
  ArrowLeft,
} from 'lucide-react';

const facilityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Meals: Utensils,
  Parking: Car,
  Security: Shield,
  Gym: Dumbbell,
  TV: Tv,
  'Hot Water': Droplets,
  Laundry: Shirt,
  'Power Backup': Zap,
  CCTV: Video,
  Warden: UserCheck,
};

const typeIcons: Record<string, React.ElementType> = {
  pg: Home,
  flat: Building,
  hostel: Users,
};

const ListingDetail = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
            <Link to="/listings">
              <Button>Browse Listings</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const TypeIcon = typeIcons[listing.type] || Building;

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in your listing "${listing.title}" on StudentNest. Is it still available?`;
    window.open(
      `https://wa.me/${listing.contact.whatsapp?.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const handleCall = () => {
    window.open(`tel:${listing.contact.phone}`, '_self');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `Check out this ${listing.type} for ₹${listing.rent}/month`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-16">
        {/* Image Gallery */}
        <div className="relative h-[50vh] md:h-[60vh] bg-muted overflow-hidden">
          <img
            src={listing.images[currentImage]}
            alt={listing.title}
            className="w-full h-full object-cover"
          />

          {/* Navigation */}
          {listing.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImage((prev) => (prev - 1 + listing.images.length) % listing.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/90 flex items-center justify-center shadow-soft hover:bg-card transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev + 1) % listing.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/90 flex items-center justify-center shadow-soft hover:bg-card transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Thumbnails */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImage ? 'border-primary' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Back Button */}
          <Link
            to="/listings"
            className="absolute top-4 left-4 w-12 h-12 rounded-full bg-card/90 flex items-center justify-center shadow-soft hover:bg-card transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-12 h-12 rounded-full bg-card/90 flex items-center justify-center shadow-soft hover:bg-card transition-colors"
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-destructive text-destructive' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="w-12 h-12 rounded-full bg-card/90 flex items-center justify-center shadow-soft hover:bg-card transition-colors"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-20 flex flex-wrap gap-2">
            {listing.isMovingOut && (
              <Badge className="bg-accent text-accent-foreground font-semibold text-sm px-3 py-1">
                Moving Out Soon
              </Badge>
            )}
            {listing.postedBy.type === 'student' && (
              <Badge variant="secondary" className="gap-1 text-sm px-3 py-1">
                <GraduationCap className="w-4 h-4" />
                Student Posted
              </Badge>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                {/* Type & Gender */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm font-medium">
                    <TypeIcon className="w-4 h-4" />
                    {listing.type.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm font-medium capitalize">
                    {listing.genderPreference === 'coed' ? 'Co-ed' : listing.genderPreference}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{listing.title}</h1>

                {/* Location */}
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span>{listing.location}</span>
                  <span className="px-2 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
                    {listing.distanceFromCollege} km from {listing.college}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-3">About this place</h2>
                  <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
                </div>

                {/* Facilities */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Facilities & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {listing.facilities.map((facility) => {
                      const Icon = facilityIcons[facility] || Shield;
                      return (
                        <div
                          key={facility}
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted"
                        >
                          <Icon className="w-5 h-5 text-secondary" />
                          <span className="text-sm font-medium">{facility}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Posted By */}
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      {listing.postedBy.type === 'student' ? (
                        <GraduationCap className="w-7 h-7 text-primary" />
                      ) : (
                        <Building className="w-7 h-7 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{listing.postedBy.name}</span>
                        {listing.postedBy.isVerified && (
                          <BadgeCheck className="w-5 h-5 text-secondary" />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground capitalize">
                        {listing.postedBy.type === 'student' ? 'Current Tenant' : 'Property Owner'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar - Contact & Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-card rounded-2xl shadow-card p-6 sticky top-24">
                {/* Price */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    ₹{listing.rent.toLocaleString('en-IN')}
                    <span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Deposit: ₹{listing.deposit.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Available From */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted mb-6">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Available from</div>
                    <div className="font-medium">
                      {new Date(listing.availableFrom).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="whatsapp"
                    size="xl"
                    className="w-full gap-2"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="call"
                    size="xl"
                    className="w-full gap-2"
                    onClick={handleCall}
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Contact Person</p>
                  <p className="font-semibold">{listing.contact.name}</p>
                  <p className="text-sm text-muted-foreground">{listing.contact.phone}</p>
                </div>

                {/* Safety Note */}
                <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Safety Tip:</strong> Always visit the property before making any payment. Never pay in advance without verification.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListingDetail;
