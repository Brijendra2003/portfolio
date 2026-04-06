import { useState, useEffect } from 'react';
import { getProjects, addProject, updateProject, deleteProject } from '../../firebase/services';
import { Plus, Pencil, Trash2, Loader2, X, Save, ExternalLink, Image } from 'lucide-react';
import toast from 'react-hot-toast';

const emptyProject = {
  title: '',
  description: '',
  techStack: '',
  image: '',
  liveLink: '',
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const openAdd = () => {
    setEditProject(null);
    setForm(emptyProject);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditProject(project);
    setForm({
      title: project.title || '',
      description: project.description || '',
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack || '',
      image: project.image || '',
      liveLink: project.liveLink || '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
      image: form.image.trim(),
      liveLink: form.liveLink.trim(),
    };
    let result;
    if (editProject) {
      result = await updateProject(editProject.id, payload);
    } else {
      result = await addProject(payload);
    }
    setSaving(false);
    if (result.success) {
      toast.success(editProject ? 'Project updated!' : 'Project added!');
      setModalOpen(false);
      fetchProjects();
    } else {
      toast.error('Failed to save project.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    setDeletingId(id);
    const result = await deleteProject(id);
    if (result.success) {
      toast.success('Project deleted.');
      setProjects(prev => prev.filter(p => p.id !== id));
    } else {
      toast.error('Failed to delete.');
    }
    setDeletingId(null);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400 text-sm">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        <button onClick={openAdd} className="btn-primary text-sm py-2.5">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-gold-400" /></div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 card">
          <p className="text-gray-500">No projects yet. Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wider">Project</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Tech Stack</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Live Link</th>
                <th className="text-right px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr
                  key={project.id}
                  style={{
                    borderBottom: idx < projects.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg glass flex items-center justify-center flex-shrink-0">
                          <Image size={14} className="text-gray-500" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">{project.title}</p>
                        <p className="text-gray-500 text-xs line-clamp-1 max-w-xs">{project.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(project.techStack || []).slice(0, 3).map(t => (
                        <span key={t} className="tag text-xs">{t}</span>
                      ))}
                      {(project.techStack || []).length > 3 && (
                        <span className="tag text-xs">+{project.techStack.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    {project.liveLink ? (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                        className="text-gold-400 hover:text-gold-300 flex items-center gap-1 text-xs transition-colors"
                      >
                        <ExternalLink size={12} /> View
                      </a>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(project)}
                        className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-gold-400 transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deletingId === project.id}
                        className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        {deletingId === project.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          onClick={e => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
            style={{ background: '#161625', border: '1px solid rgba(212,160,23,0.2)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-white">
                {editProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Project Title *</label>
                <input type="text" placeholder="My Awesome Project" value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Description</label>
                <textarea placeholder="Describe the project, what it does, and your role..." rows={4}
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  className="input-field resize-none" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Tech Stack (comma-separated)</label>
                <input type="text" placeholder="React, Node.js, Firebase, Tailwind CSS" value={form.techStack}
                  onChange={e => setForm(p => ({ ...p, techStack: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Image URL</label>
                <input type="url" placeholder="https://example.com/project-screenshot.jpg" value={form.image}
                  onChange={e => setForm(p => ({ ...p, image: e.target.value }))} className="input-field" />
                <p className="text-gray-600 text-xs mt-1">Paste a direct image URL (e.g. from Imgur, Cloudinary)</p>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Live / Demo Link</label>
                <input type="url" placeholder="https://myproject.vercel.app" value={form.liveLink}
                  onChange={e => setForm(p => ({ ...p, liveLink: e.target.value }))} className="input-field" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-2.5 text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-2.5 text-sm disabled:opacity-70">
                  {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> Save Project</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
