import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { getProjects } from '../../firebase/services';
import ProjectCard from '../projects/ProjectCard';
import SectionHeader from '../common/SectionHeader';

export default function LatestProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects(3).then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-24 bg-ink-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeader
            eyebrow="Recent Work"
            title={<>Featured <span className="gold-text italic">Projects</span></>}
            subtitle="A selection of my latest work across different industries."
          />
          <Link to="/projects" className="btn-outline text-sm mb-12 md:mb-0 self-start md:self-auto">
            All Projects <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="animate-spin text-gold-400" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
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
    </section>
  );
}
