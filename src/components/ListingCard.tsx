import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Listing } from '@/types/listing';
import {
  MapPin,
  Wifi,
  Utensils,
  Car,
  Shield,
  Phone,
  MessageCircle,
  Heart,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Home,
  Users,
  Building,
  BadgeCheck,
  ArrowUpRight,
} from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

const facilityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Meals: Utensils,
  Parking: Car,
  Security: Shield,
};

const typeIcons: Record<string, React.ElementType> = {
  pg: Home,
  flat: Building,
  hostel: Users,
};

const ListingCard = ({ listing, index = 0 }: ListingCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const TypeIcon = typeIcons[listing.type] || Building;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hi, I'm interested in your listing "${listing.title}" on StudentNest.`;
    window.open(
      `https://wa.me/${listing.contact.whatsapp?.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`tel:${listing.contact.phone}`, '_self');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/listing/${listing.id}`}>
        <article className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
          {/* Image Gallery */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={listing.images[currentImage]}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Image Navigation */}
            {listing.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-soft hover:bg-card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-soft hover:bg-card"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Image Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {listing.images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        idx === currentImage ? 'bg-primary-foreground' : 'bg-primary-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Like Button */}
            <button
              onClick={handleLike}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 flex items-center justify-center shadow-soft hover:bg-card transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isLiked ? 'fill-destructive text-destructive' : 'text-foreground'
                }`}
              />
            </button>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {listing.isMovingOut && (
                <Badge className="bg-accent text-accent-foreground font-semibold">
                  Moving Out Soon
                </Badge>
              )}
              {listing.postedBy.type === 'student' && (
                <Badge variant="secondary" className="gap-1">
                  <GraduationCap className="w-3 h-3" />
                  Student Posted
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Type & Gender */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                <TypeIcon className="w-3.5 h-3.5" />
                {listing.type}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {listing.genderPreference === 'coed' ? 'Co-ed' : listing.genderPreference}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm line-clamp-1">{listing.location}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-medium ml-auto flex-shrink-0">
                {listing.distanceFromCollege} km
              </span>
            </div>

            {/* Facilities */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {listing.facilities.slice(0, 4).map((facility) => {
                const Icon = facilityIcons[facility];
                return (
                  <span
                    key={facility}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground"
                  >
                    {Icon && <Icon className="w-3 h-3" />}
                    {facility}
                  </span>
                );
              })}
              {listing.facilities.length > 4 && (
                <span className="text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground">
                  +{listing.facilities.length - 4} more
                </span>
              )}
            </div>

            {/* Price & Contact */}
            <div className="flex items-end justify-between pt-3 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  ₹{listing.rent.toLocaleString('en-IN')}
                  <span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {listing.postedBy.isVerified && (
                    <BadgeCheck className="w-3.5 h-3.5 text-secondary" />
                  )}
                  {listing.postedBy.name}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="whatsapp"
                  size="sm"
                  onClick={handleWhatsApp}
                  className="gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
                <Button variant="call" size="sm" onClick={handleCall}>
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
