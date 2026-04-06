import { Link } from 'react-router-dom';
import { Globe, Smartphone, Layout, Megaphone, ArrowRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Full-stack web applications built with React, Next.js, and Node.js. Scalable, fast, and production-ready.',
    color: '#3b82f6',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Cross-platform mobile applications using React Native. One codebase, native performance on iOS & Android.',
    color: '#8b5cf6',
  },
  {
    icon: Layout,
    title: 'Static Websites',
    desc: 'Blazing-fast static websites with modern tooling. Perfect for portfolios, blogs, and business sites.',
    color: '#10b981',
  },
  {
    icon: Megaphone,
    title: 'Landing Pages',
    desc: 'High-converting landing pages designed to capture leads and drive business growth.',
    color: '#d4a017',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
        <SectionHeader
          eyebrow="What I Do"
          title={<>Services I <span className="gold-text italic">Offer</span></>}
          subtitle="End-to-end development services tailored to your business needs."
        />
        <Link to="/services" className="btn-outline text-sm mb-12 md:mb-0 self-start md:self-auto">
          All Services <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="card group cursor-default">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
              style={{ background: `${color}18`, border: `1px solid ${color}30` }}
            >
              <Icon size={22} style={{ color }} />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
