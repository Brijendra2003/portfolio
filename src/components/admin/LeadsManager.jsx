import { useState, useEffect } from 'react';
import { getLeads, deleteLead } from '../../firebase/services';
import { Loader2, Trash2, Mail, Phone, Clock, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LeadsManager() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [selected, setSelected] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    const data = await getLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    setDeletingId(id);
    const result = await deleteLead(id);
    if (result.success) {
      toast.success('Lead deleted.');
      setLeads(prev => prev.filter(l => l.id !== id));
      if (selected?.id === id) setSelected(null);
    } else {
      toast.error('Failed to delete.');
    }
    setDeletingId(null);
  };

  const formatDate = (ts) => {
    if (!ts) return 'N/A';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400 text-sm">{leads.length} enquir{leads.length !== 1 ? 'ies' : 'y'}</p>
        <button onClick={fetchLeads} className="btn-outline text-sm py-2 px-4">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-gold-400" /></div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 card">
          <p className="text-gray-500">No leads yet. Enquiries from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2 overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                  <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wider">Contact</th>
                  <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-right px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, idx) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelected(lead)}
                    style={{ borderBottom: idx < leads.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                    className={`hover:bg-white/[0.03] transition-colors cursor-pointer ${selected?.id === lead.id ? 'bg-gold-500/5' : ''}`}
                  >
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{lead.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()}
                          className="text-gray-500 text-xs flex items-center gap-1 hover:text-gold-400 transition-colors">
                          <Mail size={10} /> {lead.email}
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock size={11} />
                        {formatDate(lead.createdAt)}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={e => { e.stopPropagation(); handleDelete(lead.id); }}
                          disabled={deletingId === lead.id}
                          className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                        >
                          {deletingId === lead.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail panel */}
          <div>
            {selected ? (
              <div className="card h-full">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-lg font-bold text-white">{selected.name}</h3>
                  <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white">
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Email</p>
                    <a href={`mailto:${selected.email}`} className="text-gold-400 text-sm hover:text-gold-300 transition-colors flex items-center gap-1">
                      <Mail size={13} /> {selected.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Phone</p>
                    <a href={`tel:${selected.phone}`} className="text-white text-sm flex items-center gap-1 hover:text-gold-400 transition-colors">
                      <Phone size={13} /> {selected.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Message</p>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{selected.message}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Received</p>
                    <p className="text-gray-400 text-xs">{formatDate(selected.createdAt)}</p>
                  </div>
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your Enquiry`}
                    className="btn-primary w-full justify-center text-sm py-2.5 mt-2 inline-flex"
                  >
                    <Mail size={14} /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="card h-full flex items-center justify-center text-center p-10">
                <div>
                  <Mail size={32} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Click a lead to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
