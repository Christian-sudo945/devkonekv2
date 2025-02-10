import React from 'react';
import { ArrowRight, CheckCircle, Code, Users, Zap, Globe, Star, MessageSquare, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  imageUrl?: string;
}

const testimonials: Testimonial[] = [];

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
      {title}
    </h2>
    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      {subtitle}
    </p>
  </motion.div>
);

const ActionButton: React.FC<{
  variant: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ variant, children, onClick }) => {
  const baseClasses = "group inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-200";
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25",
    secondary: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-lg",
    outline: "border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} onClick={onClick}>
      <span className="flex items-center">
        {children}
        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
        {testimonial.name.charAt(0)}
      </div>
      <div className="ml-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">
          {testimonial.name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {testimonial.role} at {testimonial.company}
        </p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 italic">
      "{testimonial.content}"
    </p>
  </motion.div>
);

const StatisticItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
    <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
  </div>
);

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full text-white mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

const AboutSection: React.FC = () => (
  <div className="py-24 bg-gray-50 dark:bg-gray-900">
    <div className="container mx-auto px-6">
      <SectionTitle 
        title="About Our Solution"
        subtitle="Discover how our platform supports your capstone projects, mentorship, and more."
      />
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Code className="w-6 h-6" />}
          title="Capstone Project Support"
          description="Get dedicated support for your capstone projects with access to resources, tools, and expert guidance."
        />
        <FeatureCard
          icon={<Users className="w-6 h-6" />}
          title="Mentorship"
          description="Connect with experienced mentors who can guide you through your project and career development."
        />
        <FeatureCard
          icon={<Zap className="w-6 h-6" />}
          title="Collaboration Tools"
          description="Work seamlessly with your team using our advanced collaboration tools designed for developers."
        />
      </div>
    </div>
  </div>
);

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Connect. Collaborate. Create.
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Join the fastest-growing developer community where innovation meets collaboration. 
              Build your network, share knowledge, and create amazing projects together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <ActionButton variant="primary">
                Get Started Free
              </ActionButton>
              <ActionButton variant="outline">
                View Demo
              </ActionButton>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <StatisticItem value="10K+" label="Active Developers" />
              <StatisticItem value="1M+" label="Lines of Code" />
              <StatisticItem value="5K+" label="Projects Created" />
              <StatisticItem value="50+" label="Countries" />
            </div>
          </motion.div>
        </div>
      </div>
      <AboutSection />
      <div className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Loved by developers worldwide"
            subtitle="See what our community has to say about DevKonek"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
            <div className="relative p-12 md:p-20 text-center">
              
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Join thousands of developers already using DevKonek to build amazing things together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ActionButton variant="secondary">
                  Sign Up Now
                </ActionButton>
                <ActionButton variant="outline">
                  Contact Sales
                </ActionButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;