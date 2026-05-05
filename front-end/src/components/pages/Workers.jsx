import React from 'react';
import { User, MapPin, MessageSquare, Phone, MoreHorizontal, Circle, ShieldCheck } from 'lucide-react';
import { useAuth, WORKER_PERSONAS } from '../../contexts/ThemeContext';
import '../styles/Workers.css';

const Workers = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="no-access-state">
        <ShieldCheck size={48} />
        <h3>Access Restricted</h3>
        <p>The worker directory is only accessible to system administrators.</p>
      </div>
    );
  }

  return (
    <div className="workers-container fadein">
      <div className="workers-grid-view">
        {WORKER_PERSONAS.map((worker) => (
          <div key={worker.id} className="worker-card-premium">
            <div className="worker-card-header">
              <div className="worker-avatar-large">
                {worker.initials}
                <div className="status-dot-online"></div>
              </div>
              <div className="worker-card-actions">
                <button className="icon-btn"><MoreHorizontal size={18} /></button>
              </div>
            </div>

            <div className="worker-card-body">
              <h4 className="worker-card-name">{worker.name}</h4>
              <p className="worker-card-role">{worker.role}</p>
              
              <div className="worker-card-meta">
                <div className="meta-item">
                  <MapPin size={14} />
                  <span>{worker.zone}</span>
                </div>
                <div className="meta-item">
                  <Circle size={10} fill="var(--green)" color="var(--green)" />
                  <span className="green">ON DUTY</span>
                </div>
              </div>

              <div className="worker-action-buttons">
                <button className="worker-btn primary">
                  <MessageSquare size={16} />
                  MESSAGE
                </button>
                <button className="worker-btn secondary">
                  <Phone size={16} />
                  CALL
                </button>
              </div>
            </div>

            <div className="worker-card-footer">
              <div className="footer-stat">
                <span className="stat-label">LAST ROUND</span>
                <span className="stat-value mono">08:45 AM</span>
              </div>
              <div className="footer-stat">
                <span className="stat-label">PERFORMANCE</span>
                <span className="stat-value mono">98%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workers;
