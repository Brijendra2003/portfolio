import { useEnquiry } from '../context/EnquiryContext';
import SectionHeader from '../components/common/SectionHeader';
import { Globe, Smartphone, Layout, Megaphone, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Full-stack web applications built with modern technologies. From simple websites to complex enterprise platforms, I deliver scalable and performant solutions.',
    features: [
      'React / Next.js frontend development',
      'Node.js / Express backend APIs',
      'Database design & integration',
      'Authentication & authorization',
      'Performance optimization',
      'SEO & accessibility best practices',
    ],
    benefits: ['Faster time-to-market', 'Scalable architecture', 'Clean, maintainable code'],
    color: '#3b82f6',
    startingAt: '₹25,000',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform mobile apps using React Native. Build once, deploy everywhere — iOS and Android — with a truly native user experience.',
    features: [
      'React Native cross-platform apps',
      'iOS & Android deployment',
      'Push notifications',
      'Offline support',
      'App Store / Play Store submission',
      'Firebase / backend integration',
    ],
    benefits: ['Single codebase', 'Native performance', 'Cost-effective'],
    color: '#8b5cf6',
    startingAt: '₹40,000',
  },
  {
    icon: Layout,
    title: 'Static Websites',
    description: 'Blazing-fast, SEO-friendly static websites. Perfect for portfolios, corporate sites, and content-heavy platforms that demand speed.',
    features: [
      'HTML/CSS/JS or React',
      'Optimized for Core Web Vitals',
      'Responsive design',
      'CMS integration (optional)',
      'CDN deployment',
      'Form & analytics setup',
    ],
    benefits: ['Ultra-fast loading', 'Low hosting cost', 'Zero downtime'],
    color: '#10b981',
    startingAt: '₹8,000',
  },
  {
    icon: Megaphone,
    title: 'Landing Pages',
    description: 'High-converting landing pages engineered for results. Ideal for real estate projects, product launches, and lead generation campaigns.',
    features: [
      'Conversion-optimized layout',
      'Lead capture forms',
      'Enquiry / WhatsApp CTA',
      'Google Analytics integration',
      'A/B test ready',
      'Mobile-first design',
    ],
    benefits: ['Higher conversions', 'More leads', 'Faster ROI'],
    color: '#d4a017',
    startingAt: '₹5,000',
  },
];

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We discuss your project goals, timeline, and budget.' },
  { step: '02', title: 'Proposal', desc: 'I send a detailed proposal with scope, timeline, and pricing.' },
  { step: '03', title: 'Design & Dev', desc: 'I build your project with regular check-ins and updates.' },
  { step: '04', title: 'Launch', desc: 'We test, refine, and deploy your project to production.' },
];

export default function ServicesPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-gold text-gold-400 text-xs font-mono mb-5">
            <Zap size={12} /> Services
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            What I <span className="gold-text italic">Build</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From MVPs to enterprise-grade platforms — I offer end-to-end development services to bring your vision to life.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-8 mb-24">
          {services.map(({ icon: Icon, title, description, features, benefits, color, startingAt }, idx) => (
            <div
              key={title}
              className="card p-8 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left */}
              <div className="lg:col-span-1">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <Icon size={26} style={{ color }} />
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-3">{title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{description}</p>
                <div className="mb-5">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Starting At</p>
                  <p className="font-display text-2xl font-bold text-gold-400">{startingAt}</p>
                </div>
                <button
                  onClick={openEnquiry}
                  className="btn-primary text-sm py-2.5 w-full justify-center"
                >
                  Get a Quote <ArrowRight size={14} />
                </button>
              </div>

              {/* Right */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">What's Included</h4>
                  <ul className="space-y-2">
                    {features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle2 size={15} className="text-gold-400 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Key Benefits</h4>
                  <ul className="space-y-3">
                    {benefits.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mb-24">
          <SectionHeader
            eyebrow="How It Works"
            title={<>My <span className="gold-text italic">Process</span></>}
            subtitle="A straightforward process to take your project from idea to reality."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
            {process.map(({ step, title, desc }) => (
              <div key={step} className="card text-center">
                <p className="font-display text-4xl font-bold gold-text mb-3">{step}</p>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-3xl p-10 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(212,160,23,0.1), rgba(59,79,212,0.06))', border: '1px solid rgba(212,160,23,0.2)' }}
        >
          <h2 className="font-display text-3xl font-bold text-white mb-3">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-6">Let's discuss your project and find the right solution for your needs.</p>
          <button onClick={openEnquiry} className="btn-primary">
            Send an Enquiry <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}
