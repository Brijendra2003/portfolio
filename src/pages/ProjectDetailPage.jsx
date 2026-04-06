import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { getProjectById } from '../firebase/services';
import { useEnquiry } from '../context/EnquiryContext';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    getProjectById(id).then(data => {
      setProject(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-gold-400" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle size={48} className="text-red-400" />
        <h2 className="font-display text-2xl text-white">Project Not Found</h2>
        <Link to="/projects" className="btn-outline text-sm">
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </div>
    );
  }

  const { title, description, techStack = [], image, liveLink, createdAt } = project;

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors text-sm mb-10">
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {/* Hero image */}
        {image && (
          <div className="w-full h-72 md:h-96 rounded-3xl overflow-hidden mb-10"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-line">{description}</p>

            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 inline-flex"
              >
                View Live Project <ExternalLink size={16} />
              </a>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            {techStack.length > 0 && (
              <div className="card">
                <h3 className="text-gold-400 text-xs font-mono uppercase tracking-wider mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map(tech => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Date */}
            {createdAt && (
              <div className="card">
                <h3 className="text-gold-400 text-xs font-mono uppercase tracking-wider mb-2">Completed</h3>
                <p className="text-white text-sm">
                  {createdAt.toDate ? createdAt.toDate().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' }) : 'N/A'}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="card glass-gold">
              <h3 className="text-white font-semibold mb-2">Like what you see?</h3>
              <p className="text-gray-400 text-sm mb-4">Let's build something similar for your business.</p>
              <button onClick={openEnquiry} className="btn-primary w-full justify-center text-sm py-2.5">
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
