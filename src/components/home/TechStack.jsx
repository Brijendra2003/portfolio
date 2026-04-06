import SectionHeader from '../common/SectionHeader';

const techs = [
  'React.js', 'Next.js', 'Node.js', 'TypeScript', 'React Native',
  'Firebase', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion',
  'Express.js', 'GraphQL', 'Docker', 'AWS', 'Figma',
];

export default function TechStack() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <SectionHeader
        eyebrow="Tech Stack"
        title={<>Tools & <span className="gold-text italic">Technologies</span></>}
        subtitle="The modern stack I use to build world-class digital products."
        center
      />

      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {techs.map((tech, i) => (
          <div
            key={tech}
            className="px-5 py-2.5 rounded-full glass text-sm font-mono text-gray-300 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-200 cursor-default"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
}
