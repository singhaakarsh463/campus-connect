import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { facilityOptions, popularColleges, popularLocations } from '@/data/mockListings';
import {
  Home,
  Building,
  Users,
  Upload,
  MapPin,
  IndianRupee,
  Calendar,
  Phone,
  ArrowRight,
  GraduationCap,
  X,
  Plus,
  CheckCircle2,
} from 'lucide-react';

type PropertyType = 'pg' | 'flat' | 'hostel';
type GenderType = 'boys' | 'girls' | 'coed';
type PosterType = 'owner' | 'student';

const PostListing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    posterType: '' as PosterType | '',
    isMovingOut: false,
    propertyType: '' as PropertyType | '',
    genderPreference: '' as GenderType | '',
    title: '',
    description: '',
    location: '',
    nearbyCollege: '',
    rent: '',
    deposit: '',
    availableFrom: '',
    facilities: [] as string[],
    contactName: '',
    contactPhone: '',
    images: [] as string[],
  });

  const propertyTypes = [
    { value: 'pg', label: 'PG / Paying Guest', icon: Home, description: 'Single room with shared facilities' },
    { value: 'flat', label: 'Flat / Apartment', icon: Building, description: 'Full flat or room sharing' },
    { value: 'hostel', label: 'Hostel', icon: Users, description: 'Dormitory-style accommodation' },
  ];

  const genderOptions = [
    { value: 'boys', label: 'Boys Only' },
    { value: 'girls', label: 'Girls Only' },
    { value: 'coed', label: 'Co-ed (All Welcome)' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleFacility = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success('Listing posted successfully! 🎉');
    setIsSubmitting(false);
    navigate('/listings');
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.posterType !== '';
      case 2:
        return formData.propertyType !== '' && formData.genderPreference !== '';
      case 3:
        return formData.title && formData.location && formData.rent && formData.availableFrom;
      case 4:
        return formData.contactName && formData.contactPhone;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                    s === step
                      ? 'gradient-hero text-primary-foreground'
                      : s < step
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
              ))}
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-hero"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step 1: Who are you? */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-3xl font-bold mb-2">Post Your Room</h1>
              <p className="text-muted-foreground mb-8">
                List your room for free and reach thousands of students
              </p>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Who are you?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData((prev) => ({ ...prev, posterType: 'owner', isMovingOut: false }))}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      formData.posterType === 'owner'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                      <Building className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">PG/Flat Owner</h3>
                    <p className="text-sm text-muted-foreground">
                      I own or manage a property and want to list it
                    </p>
                  </button>

                  <button
                    onClick={() => setFormData((prev) => ({ ...prev, posterType: 'student', isMovingOut: true }))}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      formData.posterType === 'student'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                      <GraduationCap className="w-7 h-7 text-accent-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">Student Moving Out</h3>
                    <p className="text-sm text-muted-foreground">
                      I'm vacating my room and want to help find the next tenant
                    </p>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Property Type */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">What type of property?</h2>

              <div className="space-y-4 mb-8">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setFormData((prev) => ({ ...prev, propertyType: type.value as PropertyType }))}
                    className={`w-full p-5 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${
                      formData.propertyType === type.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      formData.propertyType === type.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <type.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <h2 className="text-xl font-semibold mb-4">Who is this for?</h2>
              <div className="flex flex-wrap gap-3">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData((prev) => ({ ...prev, genderPreference: option.value as GenderType }))}
                    className={`px-5 py-3 rounded-xl font-medium transition-all ${
                      formData.genderPreference === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Property Details */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Property Details</h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Listing Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Spacious PG near IIT Delhi"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the room, amenities, rules, etc."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location/Address</Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="location"
                        name="location"
                        placeholder="Area, City"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="pl-12 h-12"
                        list="locations"
                      />
                      <datalist id="locations">
                        {popularLocations.map((loc) => (
                          <option key={loc} value={loc} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="nearbyCollege">Nearby College</Label>
                    <div className="relative mt-2">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="nearbyCollege"
                        name="nearbyCollege"
                        placeholder="Select or type college"
                        value={formData.nearbyCollege}
                        onChange={handleInputChange}
                        className="pl-12 h-12"
                        list="colleges"
                      />
                      <datalist id="colleges">
                        {popularColleges.map((college) => (
                          <option key={college} value={college} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="rent">Monthly Rent (₹)</Label>
                    <div className="relative mt-2">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="rent"
                        name="rent"
                        type="number"
                        placeholder="8000"
                        value={formData.rent}
                        onChange={handleInputChange}
                        className="pl-12 h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="deposit">Security Deposit (₹)</Label>
                    <div className="relative mt-2">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="deposit"
                        name="deposit"
                        type="number"
                        placeholder="16000"
                        value={formData.deposit}
                        onChange={handleInputChange}
                        className="pl-12 h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="availableFrom">Available From</Label>
                    <div className="relative mt-2">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="availableFrom"
                        name="availableFrom"
                        type="date"
                        value={formData.availableFrom}
                        onChange={handleInputChange}
                        className="pl-12 h-12"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Facilities & Amenities</Label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {facilityOptions.map((facility) => (
                      <button
                        key={facility}
                        type="button"
                        onClick={() => toggleFacility(facility)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.facilities.includes(facility)
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {facility}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Contact Details */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-2">Contact Details</h2>
              <p className="text-muted-foreground mb-6">
                Students will use this to contact you directly
              </p>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="contactName">Your Name</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    placeholder="Enter your name"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Phone / WhatsApp Number</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="pl-12 h-12"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    We'll add WhatsApp and Call buttons using this number
                  </p>
                </div>

                {/* Summary */}
                <div className="mt-8 p-6 bg-muted rounded-2xl">
                  <h3 className="font-semibold mb-4">Listing Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property Type</span>
                      <span className="font-medium capitalize">{formData.propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">For</span>
                      <span className="font-medium capitalize">{formData.genderPreference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{formData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rent</span>
                      <span className="font-medium">₹{formData.rent}/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <Button
                variant="hero"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Post Listing
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostListing;
