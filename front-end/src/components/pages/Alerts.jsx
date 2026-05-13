import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Bell, Clock, MapPin, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/ThemeContext';
import '../styles/Alerts.css';

const Alerts = () => {
  const { isAdmin, userZone } = useAuth();
  const [expandedAlert, setExpandedAlert] = useState(null);

  const allAlerts = [];

  const filteredAlerts = isAdmin
    ? allAlerts
    : allAlerts.filter(a => a.zone === userZone);

  const toggleAlert = (id) => {
    setExpandedAlert(expandedAlert === id ? null : id);
  };

  return (
    <div className="alerts-container fadein">
      <div className="alerts-header-simple">
        <div className="alerts-count-badge">
          <Bell size={16} />
          <span>{filteredAlerts.length} INCIDENTS RECORDED</span>
        </div>
      </div>

      <div className="alerts-list-view">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => {
            const isExpanded = expandedAlert === alert.id;
            return (
              <div
                key={alert.id}
                className={`alert-dropdown-item ${alert.type} ${isExpanded ? 'expanded' : ''}`}
              >
                <div className="alert-summary-row" onClick={() => toggleAlert(alert.id)}>
                  <div className="alert-primary-info">
                    <span className="alert-time-mini mono">{alert.time}</span>
                    <h4 className="alert-title-text">{alert.title}</h4>
                  </div>

                  <div className="alert-secondary-info">
                    <span className="alert-zone-pill">
                      <MapPin size={12} />
                      {alert.zone}
                    </span>
                    <span className={`alert-status-label ${alert.status.toLowerCase()}`}>
                      {alert.status}
                    </span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="alert-details-content">
                    <div className="details-grid">
                      <div className="detail-item">
                        <label>READING</label>
                        <div className="value mono">{alert.reading}</div>
                      </div>
                      <div className="detail-item">
                        <label>SEVERITY</label>
                        <div className={`value severity ${alert.type}`}>{alert.type.toUpperCase()}</div>
                      </div>
                    </div>
                    <div className="detail-description">
                      <label>INCIDENT ANALYSIS</label>
                      <p>{alert.description}</p>
                    </div>
                    <div className="detail-actions">
                      <button className="action-btn-small primary">ACKNOWLEDGE</button>
                      <button className="action-btn-small secondary">VIEW LOGS</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="no-alerts-state">
            <ShieldCheck size={48} color="var(--green)" />
            <h3>All Systems Nominal</h3>
            <p>No active alerts found for {isAdmin ? 'the entire grid' : userZone}.</p>
          </div>
        )}
      </div>

      {!isAdmin && filteredAlerts.length > 0 && (
        <div className="worker-notice">
          <ShieldCheck size={16} />
          <span>Security Protocol: Displaying critical events for <strong>{userZone}</strong> only.</span>
        </div>
      )}
    </div>
  );
};

export default Alerts;
