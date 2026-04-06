import { useEnquiry } from '../../context/EnquiryContext';
import { ArrowRight, Zap } from 'lucide-react';

export default function CtaSection() {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div
        className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(212,160,23,0.12) 0%, rgba(59,79,212,0.08) 100%)',
          border: '1px solid rgba(212,160,23,0.2)',
        }}
      >
        {/* Decorative orbs */}
        <div className="orb orb-gold w-64 h-64 -top-20 -right-20 opacity-20" />
        <div className="orb orb-blue w-48 h-48 -bottom-10 -left-10 opacity-15" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-gold text-gold-400 text-xs font-mono mb-6">
            <Zap size={12} />
            Ready to Start?
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Build Something <span className="gold-text italic">Amazing</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how I can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openEnquiry} className="btn-primary text-base py-3.5 px-8 font-semibold">
              Get a Free Quote <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
