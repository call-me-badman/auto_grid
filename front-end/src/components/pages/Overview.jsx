import React from 'react';
import { Map, Zap, Users, AlertTriangle, Activity, TrendingUp, CheckCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/ThemeContext';
import '../styles/Overview.css';

const Overview = () => {
  const { user, isAdmin, userZone } = useAuth();

  const getStats = () => {
    if (isAdmin) {
      return [
        { icon: Map, label: 'TOTAL ZONES', value: '4', color: 'var(--blue)' },
        { icon: Users, label: 'WORKERS ONLINE', value: '3', color: 'var(--green)' },
        { icon: AlertTriangle, label: 'ACTIVE ALERTS', value: '2', color: 'var(--red)' },
        { icon: Zap, label: 'AVG VOLTAGE', value: '219V', color: 'var(--accent)' },
      ];
    } else {
      return [
        { icon: Map, label: 'MY ZONE', value: userZone?.split(' ')[1] || 'A', color: 'var(--blue)' },
        { icon: Zap, label: 'CURRENT VOLTAGE', value: '222V', color: 'var(--accent)' },
        { icon: Activity, label: 'POWER STATUS', value: 'STABLE', color: 'var(--green)' },
        { icon: AlertTriangle, label: 'ZONE ALERTS', value: '1', color: 'var(--red)' },
      ];
    }
  };

  const stats = getStats();

  return (
    <div className="overview-container fadein">
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value mono">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overview-grid">
        {isAdmin ? (
          <>
            <div className="overview-card">
              <div className="card-header">
                <h3>ZONE STATUS</h3>
                <Activity size={18} className="card-icon" />
              </div>
              <div className="zone-list">
                {[
                  { name: 'Zone A', reading: '222V · 14.2A', status: 'NORMAL', color: 'var(--green)' },
                  { name: 'Zone B', reading: '258V · 38.0A', status: 'CRITICAL', color: 'var(--red)' },
                  { name: 'Zone C', reading: '215V · 11.5A', status: 'WARNING', color: 'var(--accent)' },
                  { name: 'Zone D', reading: '220V · 13.0A', status: 'NORMAL', color: 'var(--green)' },
                ].map((z, i) => (
                  <div key={i} className="zone-row">
                    <div className="zone-dot" style={{ background: z.color }}></div>
                    <div className="zone-info">
                      <div className="zone-name">{z.name}</div>
                      <div className="zone-reading mono">{z.reading}</div>
                    </div>
                    <div className="status-pill-mini" style={{ color: z.color, border: `1px solid ${z.color}` }}>{z.status}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overview-card">
              <div className="card-header">
                <h3>RECENT ALERTS</h3>
                <AlertTriangle size={18} className="card-icon" />
              </div>
              <div className="alert-list-mini">
                <div className="alert-item-mini critical">
                  <div className="alert-dot red"></div>
                  <div className="alert-info-mini">
                    <div className="alert-title-mini">Overcurrent — Zone B</div>
                    <div className="alert-meta-mini mono">09:02 · Value: 38A</div>
                  </div>
                </div>
                <div className="alert-item-mini warning">
                  <div className="alert-dot amber"></div>
                  <div className="alert-info-mini">
                    <div className="alert-title-mini">Overvoltage — Zone A</div>
                    <div className="alert-meta-mini mono">08:45 · Value: 258V</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="overview-card">
              <div className="card-header">
                <h3>{userZone} — CURRENT READINGS</h3>
                <TrendingUp size={18} className="card-icon" />
              </div>
              <div className="zone-details-list">
                <div className="detail-row">
                  <span className="detail-label">Voltage</span>
                  <span className="detail-value mono green">222 V</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Current</span>
                  <span className="detail-value mono green">14.2 A</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Power</span>
                  <span className="detail-value mono amber">3.1 kW</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Frequency</span>
                  <span className="detail-value mono purple">50.1 Hz</span>
                </div>
              </div>
            </div>

            <div className="overview-card">
              <div className="card-header">
                <h3>RECENT FROM ADMIN</h3>
                <MessageSquare size={18} className="card-icon" />
              </div>
              <div className="admin-messages-mini">
                <div className="mini-msg">
                  <div className="msg-meta blue">Administrator · 08:09</div>
                  <div className="msg-text">Check transformer B2 next. Performance seems uneven.</div>
                </div>
                <div className="mini-msg reply">
                  <div className="msg-meta gray">You · 08:10</div>
                  <div className="msg-text">On it right away. Reporting back soon.</div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="overview-card full-width">
          <div className="card-header">
            <h3>SYSTEM ACTIVITY</h3>
            <Activity size={18} className="card-icon" />
          </div>
          <div className="activity-timeline">
            <div className="timeline-item">
              <div className="timeline-time mono">09:12 AM</div>
              <div className="timeline-content">Voltage stabilization pattern recognized in {isAdmin ? 'Zone A' : 'your area'}.</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time mono">08:45 AM</div>
              <div className="timeline-content warning">Critical {isAdmin ? 'Zone A' : ''} alert triggered: Potential overload detected.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
