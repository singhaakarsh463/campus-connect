import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ListingCard from '@/components/ListingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockListings, facilityOptions } from '@/data/mockListings';
import { PropertyType, GenderPreference, SearchFilters } from '@/types/listing';
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Home,
  Building,
  Users,
  IndianRupee,
  Navigation,
} from 'lucide-react';

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<SearchFilters>({
    location: searchParams.get('location') || '',
    college: searchParams.get('college') || '',
    type: (searchParams.get('type') as PropertyType) || 'all',
    genderPreference: (searchParams.get('gender') as GenderPreference) || 'all',
    minRent: parseInt(searchParams.get('minRent') || '0') || undefined,
    maxRent: parseInt(searchParams.get('maxRent') || '0') || undefined,
    maxDistance: parseFloat(searchParams.get('distance') || '0') || undefined,
    facilities: searchParams.get('facilities')?.split(',').filter(Boolean) || [],
  });

  const propertyTypes = [
    { value: 'all', label: 'All', icon: Building },
    { value: 'pg', label: 'PG', icon: Home },
    { value: 'flat', label: 'Flat', icon: Building },
    { value: 'hostel', label: 'Hostel', icon: Users },
  ];

  const genderOptions = [
    { value: 'all', label: 'All' },
    { value: 'boys', label: 'Boys' },
    { value: 'girls', label: 'Girls' },
    { value: 'coed', label: 'Co-ed' },
  ];

  const distanceOptions = [
    { value: undefined, label: 'Any distance' },
    { value: 1, label: 'Within 1 km' },
    { value: 2, label: 'Within 2 km' },
    { value: 5, label: 'Within 5 km' },
  ];

  const rentRanges = [
    { min: undefined, max: undefined, label: 'Any price' },
    { min: 0, max: 5000, label: 'Under ₹5,000' },
    { min: 5000, max: 10000, label: '₹5,000 - ₹10,000' },
    { min: 10000, max: 15000, label: '₹10,000 - ₹15,000' },
    { min: 15000, max: undefined, label: 'Above ₹15,000' },
  ];

  // Filter listings
  const filteredListings = useMemo(() => {
    return mockListings.filter((listing) => {
      // Location/College filter
      if (filters.location || filters.college) {
        const searchTerm = (filters.location || filters.college || '').toLowerCase();
        const matchesLocation = listing.location.toLowerCase().includes(searchTerm);
        const matchesCollege = listing.college.toLowerCase().includes(searchTerm);
        if (!matchesLocation && !matchesCollege) return false;
      }

      // Type filter
      if (filters.type && filters.type !== 'all' && listing.type !== filters.type) {
        return false;
      }

      // Gender filter
      if (
        filters.genderPreference &&
        filters.genderPreference !== 'all' &&
        listing.genderPreference !== filters.genderPreference
      ) {
        return false;
      }

      // Rent filter
      if (filters.minRent && listing.rent < filters.minRent) return false;
      if (filters.maxRent && listing.rent > filters.maxRent) return false;

      // Distance filter
      if (filters.maxDistance && listing.distanceFromCollege > filters.maxDistance) {
        return false;
      }

      // Facilities filter
      if (filters.facilities && filters.facilities.length > 0) {
        const hasAllFacilities = filters.facilities.every((f) =>
          listing.facilities.includes(f)
        );
        if (!hasAllFacilities) return false;
      }

      return true;
    });
  }, [filters]);

  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      college: '',
      type: 'all',
      genderPreference: 'all',
      minRent: undefined,
      maxRent: undefined,
      maxDistance: undefined,
      facilities: [],
    });
    setSearchParams({});
  };

  const activeFilterCount = [
    filters.type !== 'all',
    filters.genderPreference !== 'all',
    filters.minRent || filters.maxRent,
    filters.maxDistance,
    (filters.facilities?.length || 0) > 0,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Find Your Perfect <span className="text-gradient">Room</span>
            </h1>
            <p className="text-muted-foreground">
              {filteredListings.length} rooms available
              {filters.location && ` near "${filters.location}"`}
              {filters.college && ` near "${filters.college}"`}
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by college or location..."
                value={filters.location || filters.college || ''}
                onChange={(e) => updateFilter('location', e.target.value)}
                className="pl-12 h-12 rounded-xl"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant={showFilters ? 'default' : 'outline'}
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 w-6 h-6 rounded-full bg-primary-foreground text-primary text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card rounded-2xl p-6 mb-8 shadow-card"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Clear all
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Property Type */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Property Type</label>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => updateFilter('type', type.value as PropertyType | 'all')}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          filters.type === type.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Gender Preference</label>
                  <div className="flex flex-wrap gap-2">
                    {genderOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          updateFilter('genderPreference', option.value as GenderPreference | 'all')
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          filters.genderPreference === option.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rent Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    Rent Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {rentRanges.map((range, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          updateFilter('minRent', range.min);
                          updateFilter('maxRent', range.max);
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          filters.minRent === range.min && filters.maxRent === range.max
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Distance */}
                <div>
                  <label className="text-sm font-medium mb-3 block flex items-center gap-1">
                    <Navigation className="w-4 h-4" />
                    Distance from College
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {distanceOptions.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => updateFilter('maxDistance', option.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          filters.maxDistance === option.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div className="mt-6 pt-6 border-t border-border">
                <label className="text-sm font-medium mb-3 block">Facilities</label>
                <div className="flex flex-wrap gap-2">
                  {facilityOptions.map((facility) => (
                    <button
                      key={facility}
                      onClick={() => {
                        const current = filters.facilities || [];
                        const updated = current.includes(facility)
                          ? current.filter((f) => f !== facility)
                          : [...current, facility];
                        updateFilter('facilities', updated);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        filters.facilities?.includes(facility)
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {facility}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Property Type Quick Filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {propertyTypes.map((type) => (
              <Button
                key={type.value}
                variant={filters.type === type.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateFilter('type', type.value as PropertyType | 'all')}
                className="gap-1.5 flex-shrink-0"
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </Button>
            ))}
          </div>

          {/* Listings Grid */}
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing, index) => (
                <ListingCard key={listing.id} listing={listing} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No rooms found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search for a different location
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Listings;
