import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Building, GraduationCap, Users, Home, ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState<string>('all');

  const propertyTypes = [
    { value: 'all', label: 'All Types', icon: Building },
    { value: 'pg', label: 'PG', icon: Home },
    { value: 'flat', label: 'Flat', icon: Building },
    { value: 'hostel', label: 'Hostel', icon: Users },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.set('location', searchLocation);
    if (propertyType !== 'all') params.set('type', propertyType);
    navigate(`/listings?${params.toString()}`);
  };

  const stats = [
    { value: '10,000+', label: 'Active Listings' },
    { value: '50,000+', label: 'Happy Students' },
    { value: '100+', label: 'Cities Covered' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm font-medium">Made for Indian Students</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            Find Your Perfect{' '}
            <span className="text-gradient">Room</span>
            <br />
            Near College
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Connect directly with PG owners, flat-mates & students moving out.
            <span className="text-foreground font-semibold"> No brokers. No commission.</span>
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-2xl shadow-elevated p-4 md:p-6 mb-8"
          >
            {/* Property Type Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {propertyTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setPropertyType(type.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    propertyType === type.value
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter college name or area..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-12 h-14 text-base rounded-xl border-2 focus:border-primary"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button
                variant="hero"
                size="xl"
                onClick={handleSearch}
                className="md:w-auto w-full"
              >
                <Search className="w-5 h-5" />
                Search Rooms
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-sm">
              <span className="text-muted-foreground">Popular:</span>
              {['IIT Delhi', 'Christ University', 'VIT Vellore', 'BITS Pilani'].map((college) => (
                <button
                  key={college}
                  onClick={() => {
                    setSearchLocation(college);
                    navigate(`/listings?college=${encodeURIComponent(college)}`);
                  }}
                  className="px-3 py-1 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {college}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA for Owners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 p-6 rounded-2xl bg-secondary/10 border border-secondary/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h3 className="text-lg font-semibold">Are you a PG owner or moving out?</h3>
                <p className="text-muted-foreground">List your room for free and reach thousands of students</p>
              </div>
              <Button variant="cta" size="lg" onClick={() => navigate('/post')}>
                Post Free Listing
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
