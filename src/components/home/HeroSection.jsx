import { useEnquiry } from "../../context/EnquiryContext";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Sparkles } from "lucide-react";

export default function HeroSection() {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background orbs */}
      <div
        className="orb orb-gold w-96 h-96 -top-20 -right-20"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="orb orb-blue w-80 h-80 bottom-20 -left-20"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="orb orb-gold w-64 h-64 bottom-40 right-1/3"
        style={{ animationDelay: "1.5s", opacity: 0.08 }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,160,23,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold text-gold-400 text-sm font-mono mb-8">
          <Sparkles size={14} />
          Available for Freelance Projects
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">
          I Build <span className="gold-text italic pr-5">Digital</span>
          <br />
          Products That{" "}
          <span
            className="relative inline-block"
            style={{
              textDecoration: "underline",
              textDecorationColor: "rgba(212,160,23,0.4)",
              textUnderlineOffset: "8px",
            }}
          >
            Matter
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Full-stack developer specializing in web & mobile applications. I
          craft{" "}
          <span className="text-gold-400 font-medium">premium experiences</span>{" "}
          with clean code and thoughtful design.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={openEnquiry}
            className="btn-primary text-base py-3.5 px-8 font-semibold"
          >
            Start a Project <ArrowRight size={18} />
          </button>
          <Link to="/projects" className="btn-outline text-base py-3.5 px-8">
            View My Work
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs font-mono uppercase tracking-widest">
            Scroll to explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold-500/50 to-transparent" />
        </div>
      </div>

      {/* Floating code snippet */}
      <div
        className="absolute right-8 top-1/3 hidden xl:block glass rounded-2xl p-5 font-mono text-xs text-gray-400 max-w-xs"
        style={{ transform: "rotate(2deg)" }}
      >
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <p>
          <span className="text-blue-400">const</span>{" "}
          <span className="text-green-400">developer</span> = {"{"}
        </p>
        <p className="ml-4">
          name: <span className="text-gold-400">"Brijendra Tiwari"</span>,
        </p>
        <p className="ml-4">
          skills: [<span className="text-gold-400">"React"</span>,{" "}
          <span className="text-gold-400">"Node"</span>,
          <span className="text-gold-400">"Python"</span>,
          <span className="text-gold-400">"Java"</span>,<br />
          <span className="text-gold-400">"Automation Testing"</span>
          ],
        </p>
        <p className="ml-4">
          available: <span className="text-green-400">true</span>
        </p>
        <p>{"}"}</p>
      </div>
    </section>
  );
}
