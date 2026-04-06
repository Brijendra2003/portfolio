export default function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono glass-gold text-gold-400 mb-4 ${center ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
          {eyebrow}
        </div>
      )}
      <h2 className={`section-title ${center ? 'mx-auto' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle mt-3 ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
