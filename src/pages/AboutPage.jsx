import { useEnquiry } from '../context/EnquiryContext';
import SectionHeader from '../components/common/SectionHeader';
import { ArrowRight, Award, BookOpen, Coffee, Code2 } from 'lucide-react';

const skills = [
  { category: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'GraphQL', 'REST APIs', 'Python'] },
  { category: 'Mobile', items: ['React Native', 'Expo', 'iOS & Android', 'App Store Deploy'] },
  { category: 'Database', items: ['Firebase', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] },
  { category: 'DevOps & Tools', items: ['Docker', 'AWS', 'Git', 'CI/CD', 'Vercel'] },
  { category: 'Design', items: ['Figma', 'Adobe XD', 'UI/UX Principles', 'Responsive Design'] },
];

const timeline = [
  { year: '2024', title: 'Senior Freelance Developer', desc: 'Scaled freelancing practice, delivering 20+ projects for clients globally.', icon: Code2 },
  { year: '2022', title: 'Full-Stack Developer', desc: 'Led development of multiple SaaS products and e-commerce platforms.', icon: Award },
  { year: '2020', title: 'Started Freelancing', desc: 'Left corporate job to pursue passion for building products independently.', icon: Coffee },
  { year: '2019', title: 'B.E. Computer Science', desc: 'Graduated with distinction, focusing on software engineering and systems.', icon: BookOpen },
];

export default function AboutPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-gold text-gold-400 text-xs font-mono mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              About Me
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Passionate Dev,<br />
              <span className="gold-text italic">Problem Solver</span>
            </h1>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I'm a full-stack software developer based in India with 5+ years of experience building digital products for startups, enterprises, and everything in between.
              </p>
              <p>
                My approach combines technical precision with design sensibility — I don't just write code, I craft experiences that users love and businesses rely on.
              </p>
              <p>
                When I'm not coding, I'm exploring new technologies, contributing to open-source, or mentoring aspiring developers.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={openEnquiry} className="btn-primary">
                Work With Me <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Avatar / visual */}
          <div className="relative flex items-center justify-center">
            <div
              className="w-72 h-72 md:w-96 md:h-96 rounded-3xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(212,160,23,0.1), rgba(59,79,212,0.08))',
                border: '1px solid rgba(212,160,23,0.2)',
              }}
            >
              <span className="text-9xl">👨‍💻</span>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-ink-900/80 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 glass-gold rounded-2xl p-4">
              <p className="text-gold-400 font-display text-2xl font-bold">5+</p>
              <p className="text-gray-400 text-xs">Years Exp.</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-28">
          <SectionHeader
            eyebrow="Skills"
            title={<>My Technical <span className="gold-text italic">Expertise</span></>}
            subtitle="A comprehensive toolkit built over years of real-world project experience."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(({ category, items }) => (
              <div key={category} className="card">
                <h3 className="text-gold-400 text-sm font-mono font-semibold mb-4 uppercase tracking-wider">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <SectionHeader
            eyebrow="Journey"
            title={<>Experience & <span className="gold-text italic">Milestones</span></>}
          />
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent" />
            <div className="space-y-8">
              {timeline.map(({ year, title, desc, icon: Icon }) => (
                <div key={year} className="flex gap-8 items-start pl-16 relative">
                  <div
                    className="absolute left-0 w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0"
                  >
                    <Icon size={18} className="text-ink-900" />
                  </div>
                  <div className="card flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gold-400 font-mono text-sm font-semibold">{year}</span>
                      <h3 className="text-white font-semibold font-display text-lg">{title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
