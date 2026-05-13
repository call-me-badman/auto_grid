import React, { useState } from 'react';
import { Activity, Zap, Thermometer, ShieldCheck, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/ThemeContext';
import '../styles/Sensors.css';

const Sensors = () => {
  const { isAdmin, userZone } = useAuth();
  const [timeframe, setTimeframe] = useState('daily');

  const allSensors = [
    { id: 1, name: 'Main Voltage', value: '0', unit: 'V', zone: 'Zone A', type: 'power', status: 'offline', load: 0 },
    { id: 2, name: 'Current Flow', value: '0', unit: 'A', zone: 'Zone A', type: 'current', status: 'offline', load: 0 },
    { id: 3, name: 'Transformer Temp', value: '0', unit: '°C', zone: 'Zone A', type: 'temp', status: 'offline', load: 0 },
    { id: 4, name: 'Main Voltage', value: '0', unit: 'V', zone: 'Zone B', type: 'power', status: 'offline', load: 0 },
    { id: 5, name: 'Current Flow', value: '0', unit: 'A', zone: 'Zone B', type: 'current', status: 'offline', load: 0 },
    { id: 6, name: 'Transformer Temp', value: '0', unit: '°C', zone: 'Zone B', type: 'temp', status: 'offline', load: 0 },
    { id: 7, name: 'Main Voltage', value: '0', unit: 'V', zone: 'Zone C', type: 'power', status: 'offline', load: 0 },
    { id: 8, name: 'Current Flow', value: '0', unit: 'A', zone: 'Zone C', type: 'current', status: 'offline', load: 0 },
    { id: 9, name: 'Transformer Temp', value: '0', unit: '°C', zone: 'Zone C', type: 'temp', status: 'offline', load: 0 },
  ];

  const filteredSensors = isAdmin
    ? allSensors
    : allSensors.filter(s => s.zone === userZone);

  const getStatusColor = (status) => {
    if (status === 'optimal') return 'var(--green)';
    if (status === 'warning') return 'var(--amber)';
    if (status === 'critical') return 'var(--red)';
    return 'var(--muted)';
  };

  const getZoneSummaryData = () => {
    // In a real app, this would change based on timeframe
    return [
      { label: 'VOLTAGE LEVEL', value: '0V', icon: Zap, color: 'var(--muted)', trend: '0%' },
      { label: 'CURRENT FLOW', value: '0A', icon: Activity, color: 'var(--muted)', trend: '0%' },
      { label: 'FREQUENCY', value: '0Hz', icon: TrendingUp, color: 'var(--muted)', trend: 'STABLE' },
      { label: 'POWER LOAD', value: '0kW', icon: Zap, color: 'var(--muted)', trend: '0%' }
    ];
  };

  const summaryData = getZoneSummaryData();

  return (
    <div className="sensors-container fadein">
      <div className="sensors-header-row">
        <div className="zone-indicator">
          <ShieldCheck size={18} color="var(--blue)" />
          <span>{isAdmin ? 'ALL ZONES MONITORING' : `AUTHORIZED ACCESS: ${userZone?.toUpperCase()}`}</span>
        </div>
        <div className="timeframe-selector">
          <button
            className={`time-btn ${timeframe === 'daily' ? 'active' : ''}`}
            onClick={() => setTimeframe('daily')}
          >
            <Clock size={14} /> Daily
          </button>
          <button
            className={`time-btn ${timeframe === 'weekly' ? 'active' : ''}`}
            onClick={() => setTimeframe('weekly')}
          >
            <Clock size={14} /> Weekly
          </button>
        </div>
      </div>

      <div className="sensor-summary-grid">
        {summaryData.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="summary-block">
              <div className="summary-info">
                <div className="summary-label">{item.label}</div>
                <div className="summary-value mono">{item.value}</div>
                <div className="summary-trend">
                  <span className={item.trend.includes('-') ? 'down' : 'up'}>
                    {item.trend}
                  </span>
                  {' '} vs last {timeframe === 'daily' ? 'hour' : 'week'}
                </div>
              </div>
              <div className="summary-icon-wrap" style={{ background: `${item.color}15`, color: item.color }}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="sensor-grid">
        {filteredSensors.map((sensor) => (
          <div key={sensor.id} className={`sensor-card ${sensor.status}`}>
            <div className="sensor-header">
              <div className="sensor-type">
                {sensor.type === 'power' && <Zap size={18} />}
                {sensor.type === 'current' && <Activity size={18} />}
                {sensor.type === 'temp' && <Thermometer size={18} />}
                <span>{sensor.name}</span>
              </div>
              {isAdmin && <div className="sensor-zone-label">{sensor.zone}</div>}
            </div>

            <div className="sensor-body">
              <div className="sensor-reading">
                <span className="reading-value mono">{sensor.value}</span>
                <span className="reading-unit">{sensor.unit}</span>
              </div>

              <div className="sensor-load-wrap">
                <div className="load-meta">
                  <span className="load-label">LOAD CAPACITY</span>
                  <span className="load-percent mono">{sensor.load}%</span>
                </div>
                <div className="load-track">
                  <div
                    className="load-fill"
                    style={{
                      width: `${sensor.load}%`,
                      background: getStatusColor(sensor.status),
                      boxShadow: `0 0 10px ${getStatusColor(sensor.status)}88`
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="sensor-footer">
              <div className="status-indicator">
                <span style={{ color: getStatusColor(sensor.status) }}>{sensor.status.toUpperCase()}</span>
              </div>
              <div className="last-sync">SYNC: 1s AGO</div>
            </div>
          </div>
        ))}
      </div>

      {!isAdmin && (
        <div className="worker-notice">
          <ShieldCheck size={16} />
          <span>Showing authorized sensors for <strong>{userZone}</strong> only. Contact Admin for cross-zone access.</span>
        </div>
      )}
    </div>
  );
};

export default Sensors;
