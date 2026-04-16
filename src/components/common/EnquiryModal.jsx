import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { useEnquiry } from "../../context/EnquiryContext";
import { submitLead } from "../../firebase/services";
import toast from "react-hot-toast";

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function EnquiryModal() {
  const { isOpen, closeEnquiry } = useEnquiry();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) errs.name = "Name is required";

    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";

    if (!form.phone.trim()) {
      errs.phone = "Phone is required";
    }
    // Indian mobile validation
    else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      errs.phone = "Invalid mobile number";
    }

    if (!form.message.trim()) errs.message = "Message is required";

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    const result = await submitLead(form);
    setLoading(false);
    if (result.success) {
      toast.success("Enquiry sent! I'll get back to you shortly.");
      setForm(initialForm);
      setErrors({});
      closeEnquiry();
    } else {
      toast.error("Failed to send. Please try again.");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && closeEnquiry()}
    >
      <div
        className="w-full max-w-lg rounded-3xl p-8 relative"
        style={{
          background: "#161625",
          border: "1px solid rgba(212, 160, 23, 0.2)",
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(212, 160, 23, 0.05)",
        }}
      >
        {/* Close */}
        <button
          onClick={closeEnquiry}
          className="absolute top-5 right-5 w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono glass-gold text-gold-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            New Enquiry
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            Let's Work Together
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Fill in the details and I'll get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="input-field text-sm"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="input-field text-sm"
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="input-field text-sm"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="input-field text-sm resize-none"
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center text-sm py-3 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send size={16} /> Send Enquiry
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
