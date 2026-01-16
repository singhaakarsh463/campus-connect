import { motion } from 'framer-motion';
import { Search, MessageCircle, Home, UserCheck, Building, Smartphone } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search Your Area',
      description: 'Enter your college name or location to find nearby PGs, flats, and hostels',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Building,
      title: 'Compare Options',
      description: 'View photos, prices, facilities, and distance from your college',
      color: 'bg-secondary/10 text-secondary',
    },
    {
      icon: MessageCircle,
      title: 'Contact Directly',
      description: 'WhatsApp or call the owner/tenant directly - no broker fees!',
      color: 'bg-accent/20 text-accent-foreground',
    },
    {
      icon: Home,
      title: 'Move In Happy',
      description: 'Visit, negotiate, and move into your perfect student accommodation',
      color: 'bg-success/10 text-success',
    },
  ];

  const forOwners = [
    {
      icon: Smartphone,
      title: 'Easy Listing',
      description: 'Post your room in minutes with photos and details',
    },
    {
      icon: UserCheck,
      title: 'Verified Students',
      description: 'Connect with genuine college students looking for rooms',
    },
    {
      icon: MessageCircle,
      title: 'Direct Leads',
      description: 'Get direct calls and messages from interested students',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* For Students */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient">StudentNest</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finding your perfect room is as easy as 1-2-3-4. No complicated processes, no hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-6 h-full shadow-card hover:shadow-elevated transition-shadow">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-sm font-bold text-primary-foreground shadow-soft">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-border" />
              )}
            </motion.div>
          ))}
        </div>

        {/* For Owners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary/5 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">For PG Owners & Students Moving Out</h3>
            <p className="text-muted-foreground">List your room for free and reach thousands of students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {forOwners.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
