import React from 'react';
import {
  Home,
  Activity,
  AlertTriangle,
  Users,
  MessageSquare,
  Zap,
  LogOut,
  Settings,
  Menu
} from 'lucide-react';
import { useAuth } from '../../contexts/ThemeContext';
import '../styles/Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, pinned = false, onTogglePinned }) => {
  const { user, logout, isAdmin } = useAuth();
  const collapsed = !pinned;

  const navItems = isAdmin
    ? [
      { id: 'overview', label: 'Overview', icon: Home },
      { id: 'sensors', label: 'Sensors', icon: Activity },
      { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
      { id: 'workers', label: 'Workers', icon: Users },
      { id: 'chat', label: 'Chat', icon: MessageSquare },
    ]
    : [
      { id: 'overview', label: 'Overview', icon: Home },
      { id: 'sensors', label: 'My Zone', icon: Activity },
      { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
      { id: 'chat', label: 'Admin Chat', icon: MessageSquare },
    ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleLogout = () => {
    logout();
  };

  const handleSettings = () => {
    setActiveTab('settings');
  };

  return (
    <nav
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
    >
      <div className="logo-wrap">
        <Zap className="logo-icon" size={28} color="var(--accent)" />
        <div className="logo-content">
          <div className="logo-text font-display">Auto_Grid</div>
          <div className="logo-sub">
            {isAdmin ? 'CONTROL CENTER' : 'WORKER PORTAL'}
          </div>
        </div>
        <button
          type="button"
          className="sidebar-toggle"
          onClick={onTogglePinned}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <Menu size={18} />
        </button>
      </div>

      <div className="nav-section">
        <div className="nav-label">NAVIGATION</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              title={collapsed ? item.label : ''}
            >
              <Icon size={18} />
              <span className="nav-text">{item.label}</span>
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-actions-stack">
          <button className="footer-nav-btn" onClick={handleSettings}>
            <Settings size={18} />
            <span className="footer-nav-text">Settings</span>
          </button>
          <button className="footer-nav-btn logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span className="footer-nav-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Sidebar;