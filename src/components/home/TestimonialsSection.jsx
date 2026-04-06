import SectionHeader from '../common/SectionHeader';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO, TechVentures India',
    text: 'Delivered our entire platform in record time. The code quality was exceptional and the communication was top-notch throughout the project.',
    rating: 5,
    avatar: 'RK',
  },
  {
    name: 'Priya Sharma',
    role: 'Founder, StyleCo',
    text: 'Our e-commerce site went from concept to launch in just 3 weeks. Incredible attention to detail and a stunning final product.',
    rating: 5,
    avatar: 'PS',
  },
  {
    name: 'Michael Chen',
    role: 'CTO, DataFlow',
    text: 'Best freelancer I have worked with. Deep technical knowledge, proactive problem-solving, and always delivers on time.',
    rating: 5,
    avatar: 'MC',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-ink-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>What Clients <span className="gold-text italic">Say</span></>}
          subtitle="Don't take my word for it — here's what my clients have to say."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {testimonials.map(({ name, role, text, rating, avatar }) => (
            <div key={name} className="card flex flex-col gap-4">
              <div className="flex gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#d4a017" className="text-gold-500" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">"{text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-xs font-bold text-ink-900 flex-shrink-0">
                  {avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{name}</p>
                  <p className="text-gray-500 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
