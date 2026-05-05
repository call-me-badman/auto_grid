import React from 'react';
import { Activity, Zap, Thermometer, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../contexts/ThemeContext';
import '../styles/Sensors.css';

const Sensors = () => {
  const { isAdmin, userZone } = useAuth();

  const allSensors = [
    { id: 1, name: 'Main Voltage', value: '222.4', unit: 'V', zone: 'Zone A', type: 'power', status: 'optimal', load: 65 },
    { id: 2, name: 'Current Flow', value: '14.2', unit: 'A', zone: 'Zone A', type: 'current', status: 'optimal', load: 45 },
    { id: 3, name: 'Transformer Temp', value: '42.5', unit: '°C', zone: 'Zone A', type: 'temp', status: 'warning', load: 82 },
    { id: 4, name: 'Main Voltage', value: '258.1', unit: 'V', zone: 'Zone B', type: 'power', status: 'critical', load: 95 },
    { id: 5, name: 'Current Flow', value: '38.0', unit: 'A', zone: 'Zone B', type: 'current', status: 'critical', load: 98 },
    { id: 6, name: 'Main Voltage', value: '215.5', unit: 'V', zone: 'Zone C', type: 'power', status: 'warning', load: 78 },
    { id: 7, name: 'Main Voltage', value: '220.0', unit: 'V', zone: 'Zone D', type: 'power', status: 'optimal', load: 60 },
  ];

  const filteredSensors = isAdmin 
    ? allSensors 
    : allSensors.filter(s => s.zone === userZone);

  const getStatusColor = (status) => {
    if (status === 'optimal') return 'var(--green)';
    if (status === 'warning') return 'var(--accent)';
    return 'var(--red)';
  };

  return (
    <div className="sensors-container fadein">
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
                <div className="pulse-dot" style={{ background: getStatusColor(sensor.status) }} />
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
