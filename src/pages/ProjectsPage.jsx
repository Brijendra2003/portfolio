import { useEffect, useState } from 'react';
import { Loader2, FolderOpen } from 'lucide-react';
import { getProjects } from '../firebase/services';
import ProjectCard from '../components/projects/ProjectCard';
import SectionHeader from '../components/common/SectionHeader';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-gold text-gold-400 text-xs font-mono mb-5">
            <FolderOpen size={12} /> Portfolio
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            My <span className="gold-text italic">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A collection of projects I've built for clients and personal exploration.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <Loader2 size={36} className="animate-spin text-gold-400" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-gray-500 text-lg">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
