import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import { Map, Zap, Users, AlertTriangle, Activity, TrendingUp, CheckCircle, MessageSquare, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/ThemeContext';
import '../styles/Overview.css';

const Overview = () => {
  const { user, isAdmin, userZone } = useAuth();
  const [timeframe, setTimeframe] = useState('daily'); // 'daily' or 'weekly'

  const dailyData = [
    { time: '00:00', power: 0, voltage: 0, current: 0, frequency: 0 },
    { time: '04:00', power: 0, voltage: 0, current: 0, frequency: 0 },
    { time: '08:00', power: 0, voltage: 0, current: 0, frequency: 0 },
    { time: '12:00', power: 0, voltage: 0, current: 0, frequency: 0 },
    { time: '16:00', power: 0, voltage: 0, current: 0, frequency: 0 },
    { time: '20:00', power: 0, voltage: 0, current: 0, frequency: 0 },
    { time: '23:59', power: 0, voltage: 0, current: 0, frequency: 0 },
  ];

  const weeklyData = [
    { day: 'Mon', power: 0, voltage: 0, current: 0, frequency: 0 },
    { day: 'Tue', power: 0, voltage: 0, current: 0, frequency: 0 },
    { day: 'Wed', power: 0, voltage: 0, current: 0, frequency: 0 },
    { day: 'Thu', power: 0, voltage: 0, current: 0, frequency: 0 },
    { day: 'Fri', power: 0, voltage: 0, current: 0, frequency: 0 },
    { day: 'Sat', power: 0, voltage: 0, current: 0, frequency: 0 },
    { day: 'Sun', power: 0, voltage: 0, current: 0, frequency: 0 },
  ];

  const chartData = timeframe === 'daily' ? dailyData : weeklyData;
  const xAxisKey = timeframe === 'daily' ? 'time' : 'day';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          {payload.map((pld, index) => (
            <p key={index} style={{ color: pld.color }}>
              {`${pld.name}: ${pld.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getStats = () => {
    if (isAdmin) {
      return [
        { icon: Map, label: 'TOTAL ZONES', value: '0', color: 'var(--blue)' },
        { icon: Users, label: 'WORKERS ONLINE', value: '0', color: 'var(--blue)' },
        { icon: AlertTriangle, label: 'ACTIVE ALERTS', value: '0', color: 'var(--red)' },
        { icon: Zap, label: 'AVG VOLTAGE', value: '0V', color: 'var(--blue)' },
        { icon: Map, label: 'TOTAL ZONES', value: '0', color: 'var(--blue)' },
        { icon: Users, label: 'WORKERS ONLINE', value: '0', color: 'var(--blue)' },
        { icon: AlertTriangle, label: 'ACTIVE ALERTS', value: '0', color: 'var(--red)' },
        { icon: Zap, label: 'AVG VOLTAGE', value: '0V', color: 'var(--blue)' },
      ];
    } else {
      return [
        { icon: Map, label: 'MY ZONE', value: userZone?.split(' ')[1] || '—', color: 'var(--blue)' },
        { icon: Zap, label: 'CURRENT VOLTAGE', value: '0V', color: 'var(--blue)' },
        { icon: Activity, label: 'POWER STATUS', value: 'OFFLINE', color: 'var(--blue)' },
        { icon: AlertTriangle, label: 'ZONE ALERTS', value: '0', color: 'var(--red)' },
        { icon: Map, label: 'MY ZONE', value: userZone?.split(' ')[1] || '—', color: 'var(--blue)' },
        { icon: Zap, label: 'CURRENT VOLTAGE', value: '0V', color: 'var(--blue)' },
        { icon: Activity, label: 'POWER STATUS', value: 'OFFLINE', color: 'var(--blue)' },
        { icon: AlertTriangle, label: 'ZONE ALERTS', value: '0', color: 'var(--red)' },
      ];
    }
  };

  const stats = getStats();

  return (
    <div className="overview-container fadein">
      <div className="overview-header">
        <div className="timeframe-selector">
          <button
            className={`time-btn ${timeframe === 'daily' ? 'active' : ''}`}
            onClick={() => setTimeframe('daily')}
          >
            <Clock size={14} /> Daily readings
          </button>
          
        </div>
      </div>

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

      <div className="charts-section">
        <div className="charts-grid">
          {/* Power Trend */}
          <div className="overview-card chart-card">
            <div className="card-header">
              <h3>POWER TREND (kW)</h3>
              <Activity size={18} className="card-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey={xAxisKey}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={15}
                  />
                  <YAxis
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-15}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="power" name="Power" stroke="var(--blue)" fillOpacity={1} fill="url(#colorPower)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Voltage Trend */}
          <div className="overview-card chart-card">
            <div className="card-header">
              <h3>VOLTAGE TREND (V)</h3>
              <Zap size={18} className="card-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey={xAxisKey}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={15}
                  />
                  <YAxis
                    domain={['dataMin - 5', 'dataMax + 5']}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-15}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="voltage" name="Voltage" stroke="var(--accent)" strokeWidth={2} dot={{ r: 4, fill: 'var(--accent)' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Current Trend */}
          <div className="overview-card chart-card">
            <div className="card-header">
              <h3>CURRENT TREND (A)</h3>
              <Activity size={18} className="card-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--green)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey={xAxisKey}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={15}
                  />
                  <YAxis
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-15}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="current" name="Current" stroke="var(--green)" fillOpacity={1} fill="url(#colorCurrent)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Frequency Trend */}
          <div className="overview-card chart-card">
            <div className="card-header">
              <h3>FREQUENCY TREND (Hz)</h3>
              <TrendingUp size={18} className="card-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey={xAxisKey}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={15}
                  />
                  <YAxis
                    domain={[49, 51]}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-15}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="frequency" name="Frequency" stroke="var(--purple)" strokeWidth={2} dot={{ r: 4, fill: 'var(--purple)' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="charts-grid">
          {/* Power Trend */}
          <div className="overview-card chart-card">
            <div className="card-header">
              <h3>POWER TREND (kW)</h3>
              <Activity size={18} className="card-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey={xAxisKey}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={15}
                  />
                  <YAxis
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-15}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="power" name="Power" stroke="var(--blue)" fillOpacity={1} fill="url(#colorPower)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Voltage Trend */}
          <div className="overview-card chart-card">
            <div className="card-header">
              <h3>VOLTAGE TREND (V)</h3>
              <Zap size={18} className="card-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey={xAxisKey}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={15}
                  />
                  <YAxis
                    domain={['dataMin - 5', 'dataMax + 5']}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-15}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="voltage" name="Voltage" stroke="var(--accent)" strokeWidth={2} dot={{ r: 4, fill: 'var(--accent)' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Current Trend */}
          <div className="overview-card chart-card">
            <div className="card-header">
              <h3>CURRENT TREND (A)</h3>
              <Activity size={18} className="card-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--green)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey={xAxisKey}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={15}
                  />
                  <YAxis
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-15}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="current" name="Current" stroke="var(--green)" fillOpacity={1} fill="url(#colorCurrent)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Frequency Trend */}
          <div className="overview-card chart-card">
            <div className="card-header">
              <h3>FREQUENCY TREND (Hz)</h3>
              <TrendingUp size={18} className="card-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey={xAxisKey}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={15}
                  />
                  <YAxis
                    domain={[49, 51]}
                    stroke="var(--muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-15}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="frequency" name="Frequency" stroke="var(--purple)" strokeWidth={2} dot={{ r: 4, fill: 'var(--purple)' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        {isAdmin ? (
          <>
            <div className="overview-card" onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'sensors' }))} style={{ cursor: 'pointer' }}>
              <div className="card-header">
                <h3>ZONE STATUS</h3>
                <Activity size={18} className="card-icon" />
              </div>
              <div className="zone-list">
                {[
                  { name: 'Zone A', reading: '0V · 0A', status: 'OFFLINE', color: 'var(--muted)' },
                  { name: 'Zone B', reading: '0V · 0A', status: 'OFFLINE', color: 'var(--muted)' },
                  { name: 'Zone C', reading: '0V · 0A', status: 'OFFLINE', color: 'var(--muted)' },
                  { name: 'Zone D', reading: '0V · 0A', status: 'OFFLINE', color: 'var(--muted)' },
                  { name: 'Zone A', reading: '0V · 0A', status: 'OFFLINE', color: 'var(--muted)' },
                  { name: 'Zone B', reading: '0V · 0A', status: 'OFFLINE', color: 'var(--muted)' },
                  { name: 'Zone C', reading: '0V · 0A', status: 'OFFLINE', color: 'var(--muted)' },
                  { name: 'Zone D', reading: '0V · 0A', status: 'OFFLINE', color: 'var(--muted)' },
                ].map((z, i) => (
                  <div key={i} className="zone-row">
                    <div className="zone-info">
                      <div className="zone-name">{z.name}</div>
                      <div className="zone-reading mono">{z.reading}</div>
                    </div>
                    <div className="status-pill-mini" style={{ color: z.color, border: `1px solid ${z.color}` }}>{z.status}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overview-card" onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'alerts' }))} style={{ cursor: 'pointer' }}>
              <div className="card-header">
                <h3>RECENT ALERTS</h3>
                <AlertTriangle size={18} className="card-icon" />
              </div>
              <div className="alert-list-mini">
                <div className="no-data-msg">No active alerts recorded.</div>
                <div className="no-data-msg">No active alerts recorded.</div>
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
                  <span className="detail-value mono">0 V</span>
                  <span className="detail-value mono">0 V</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Current</span>
                  <span className="detail-value mono">0 A</span>
                  <span className="detail-value mono">0 A</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Power</span>
                  <span className="detail-value mono">0 kW</span>
                  <span className="detail-value mono">0 kW</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Frequency</span>
                  <span className="detail-value mono">0 Hz</span>
                  <span className="detail-value mono">0 Hz</span>
                </div>
              </div>
            </div>

            <div className="overview-card" onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'chat' }))} style={{ cursor: 'pointer' }}>
              <div className="card-header">
                <h3>RECENT FROM ADMIN</h3>
                <MessageSquare size={18} className="card-icon" />
              </div>
              <div className="admin-messages-mini">
                <div className="no-data-msg">No recent messages.</div>
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
            <div className="no-data-msg">No recent activity recorded.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
