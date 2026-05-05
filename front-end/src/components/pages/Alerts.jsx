import React from 'react';
import { AlertTriangle, Clock, ShieldCheck, Zap, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/ThemeContext';
import '../styles/Alerts.css';

const Alerts = () => {
  const { isAdmin, userZone } = useAuth();

  const allAlerts = [
    { id: 1, type: 'critical', title: 'Line Fault Detected', zone: 'Zone B', time: '09:02 AM', status: 'ACTIVE', reading: '38A' },
    { id: 2, type: 'warning', title: 'Voltage Flux', zone: 'Zone A', time: '08:45 AM', status: 'ACTIVE', reading: '258V' },
    { id: 3, type: 'info', title: 'Phase Balancing', zone: 'Zone C', time: '07:30 AM', status: 'RESOLVED', reading: 'NORMAL' },
    { id: 4, type: 'warning', title: 'Thermal Warning', zone: 'Zone A', time: '06:15 AM', status: 'RESOLVED', reading: '45°C' },
    { id: 5, type: 'critical', title: 'High Current', zone: 'Zone D', time: '05:00 AM', status: 'RESOLVED', reading: '22A' },
  ];

  const filteredAlerts = isAdmin 
    ? allAlerts 
    : allAlerts.filter(a => a.zone === userZone);

  return (
    <div className="alerts-container fadein">
      <div className="alerts-grid-view">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div key={alert.id} className={`alert-card-premium ${alert.type} ${alert.status.toLowerCase()}`}>
              <div className="alert-header-premium">
                <div className="alert-type-badge">
                  <AlertTriangle size={14} />
                  <span>{alert.type.toUpperCase()}</span>
                </div>
                <div className="alert-time-badge">
                  <Clock size={12} />
                  <span className="mono">{alert.time}</span>
                </div>
              </div>

              <div className="alert-body-premium">
                <h4 className="alert-title-premium">{alert.title}</h4>
                <div className="alert-detail-row">
                  <div className="detail-item">
                    <span className="detail-label">LOCATION</span>
                    <span className="detail-value">{alert.zone}</span>
                  </div>
                  <div className="detail-item text-right">
                    <span className="detail-label">LAST READING</span>
                    <span className="detail-value mono">{alert.reading}</span>
                  </div>
                </div>
              </div>

              <div className="alert-footer-premium">
                <div className="status-indicator-wrap">
                  <div className={`status-dot-pulse ${alert.status.toLowerCase()}`}></div>
                  <span className={`status-text ${alert.status.toLowerCase()}`}>{alert.status}</span>
                </div>
                <button className="resolve-btn-premium">
                  {alert.status === 'ACTIVE' ? 'RESOLVE' : 'DETAILS'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-alerts-state">
            <ShieldCheck size={48} color="var(--green)" />
            <h3>All Systems Nominal</h3>
            <p>No active alerts found for {isAdmin ? 'the entire grid' : userZone}.</p>
          </div>
        )}
      </div>

      {!isAdmin && (
        <div className="worker-notice">
          <ShieldCheck size={16} />
          <span>Security Protocol: Displaying critical events for <strong>{userZone}</strong> only.</span>
        </div>
      )}
    </div>
  );
};

export default Alerts;
