import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project }) {
  const { id, title, description, techStack = [], image, liveLink } = project;

  return (
    <div className="card group overflow-hidden">
      {/* Image */}
      <div
        className="w-full h-48 rounded-xl mb-4 overflow-hidden relative"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl opacity-30">🖥</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      {/* Tags */}
      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.slice(0, 3).map(tech => (
            <span key={tech} className="tag">{tech}</span>
          ))}
          {techStack.length > 3 && (
            <span className="tag">+{techStack.length - 3}</span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <Link
          to={`/project/${id}`}
          className="btn-outline flex-1 justify-center text-sm py-2"
        >
          View Details <ArrowUpRight size={14} />
        </Link>
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-gold-400 transition-colors flex-shrink-0"
          >
            <ExternalLink size={15} />
          </a>
        )}
      </div>
    </div>
  );
}
