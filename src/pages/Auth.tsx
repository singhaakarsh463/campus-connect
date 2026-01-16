import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Home,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  ArrowRight,
  GraduationCap,
  Building,
  ChevronLeft,
} from 'lucide-react';

type AuthMode = 'login' | 'signup';
type UserType = 'student' | 'owner';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'login'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>('student');

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    college: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate auth (will be replaced with Supabase)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (mode === 'login') {
      toast.success('Welcome back! 🎉');
    } else {
      toast.success('Account created successfully! 🏠');
    }

    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-gradient">StudentNest</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {mode === 'login' ? 'Welcome back!' : 'Create your account'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'login'
                ? 'Sign in to continue finding your perfect room'
                : 'Join thousands of students finding their ideal accommodation'}
            </p>
          </div>

          {/* User Type Selection (Signup only) */}
          {mode === 'signup' && (
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">I am a</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('student')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    userType === 'student'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      userType === 'student' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Student</div>
                    <div className="text-xs text-muted-foreground">Looking for room</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setUserType('owner')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    userType === 'owner'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      userType === 'owner' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Building className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Owner</div>
                    <div className="text-xs text-muted-foreground">Listing rooms</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-12 h-12"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-12 h-12"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-12 h-12"
                    required
                  />
                </div>
              </div>
            )}

            {mode === 'signup' && userType === 'student' && (
              <div>
                <Label htmlFor="college">College/University (Optional)</Label>
                <div className="relative mt-2">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="college"
                    name="college"
                    type="text"
                    placeholder="Enter your college name"
                    value={formData.college}
                    onChange={handleInputChange}
                    className="pl-12 h-12"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {mode === 'login' && (
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-12 pr-12 h-12"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle Mode */}
          <p className="text-center mt-8 text-muted-foreground">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-primary font-semibold hover:underline"
            >
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image/Info */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-2 border-primary-foreground rounded-full" />
          <div className="absolute bottom-20 right-20 w-60 h-60 border-2 border-primary-foreground rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-primary-foreground rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center text-primary-foreground max-w-lg"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-8">
            <Home className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Find Your Home Away From Home
          </h2>

          <p className="text-primary-foreground/80 mb-8">
            Join 50,000+ students who found their perfect PG, flat, or hostel through StudentNest.
            No brokers, no commission, just direct connections.
          </p>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-primary-foreground/70">Active Listings</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm text-primary-foreground/70">Cities</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <div className="text-2xl font-bold">₹0</div>
              <div className="text-sm text-primary-foreground/70">Brokerage</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
