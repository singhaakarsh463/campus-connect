import { Link } from 'react-router-dom';
import { Home, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'For Students': [
      { label: 'Search Rooms', path: '/listings' },
      { label: 'How It Works', path: '/#how-it-works' },
      { label: 'Verified Listings', path: '/listings?verified=true' },
      { label: 'Student Tips', path: '/blog' },
    ],
    'For Owners': [
      { label: 'Post Your Room', path: '/post' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Success Stories', path: '/stories' },
      { label: 'Owner Dashboard', path: '/dashboard' },
    ],
    'Company': [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' },
      { label: 'Blog', path: '/blog' },
    ],
    'Legal': [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Refund Policy', path: '/refund' },
      { label: 'Cookie Policy', path: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">StudentNest</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-xs">
              India's most student-friendly platform to find PG, flats, and hostels near your college. No brokers, no commission.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a href="mailto:hello@studentnest.in" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
                hello@studentnest.in
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +91 12345 67890
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Koramangala, Bangalore, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© {currentYear} StudentNest. Made with ❤️ for Indian Students.</p>
            <p>
              Built to solve real problems for college students finding accommodation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
