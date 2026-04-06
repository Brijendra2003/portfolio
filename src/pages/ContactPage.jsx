import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Loader2 } from 'lucide-react';
import { submitLead } from '../firebase/services';
import toast from 'react-hot-toast';

const initialForm = { name: '', email: '', phone: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    const result = await submitLead(form);
    setLoading(false);
    if (result.success) {
      toast.success('Message sent! I\'ll reply within 24 hours.');
      setForm(initialForm);
      setErrors({});
    } else {
      toast.error('Failed to send. Please try again.');
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-gold text-gold-400 text-xs font-mono mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            Get In Touch
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Let's <span className="gold-text italic">Connect</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail, label: 'Email', value: 'hello@devfolio.dev', href: 'mailto:hello@devfolio.dev' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
              { icon: MapPin, label: 'Location', value: 'Pune, Maharashtra, India', href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="card flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl glass-gold flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
                  {href ? (
                    <a href={href} className="text-white text-sm font-medium hover:text-gold-400 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="card">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-4">Find Me Online</p>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: 'https://github.com', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-gray-300 hover:text-gold-400 hover:border-gold-500/30 transition-all text-sm"
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="card glass-gold">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-white text-sm font-semibold">Available Now</p>
              </div>
              <p className="text-gray-400 text-xs">Typical response time: within 4 hours</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 card p-8">
            <h3 className="font-display text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1.5 block">Full Name</label>
                  <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} className="input-field" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1.5 block">Phone</label>
                  <input type="text" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} className="input-field" />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Email Address</label>
                <input type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} className="input-field" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell me about your project, timeline, and budget..."
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="input-field resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-70">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
