import React, { useEffect, useState } from 'react';
import {
  Home,
  Activity,
  AlertTriangle,
  Users,
  MessageSquare,
  Zap,
  LogOut,
  Settings,
  Circle,
  Menu,
  Pin,
  PinOff
} from 'lucide-react';
import { useAuth } from '../../contexts/ThemeContext';
import '../styles/Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, pinned = false, onTogglePinned }) => {
  // Gmail-like:
  // - "Rail" mode by default on desktop (icons only, expands on hover via CSS)
  // - "Pinned" keeps the sidebar expanded (pushes layout)
  const { user, logout, isAdmin } = useAuth();

  const [canHover, setCanHover] = useState(true);
  const [touchExpanded, setTouchExpanded] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.('(hover: hover) and (pointer: fine)');
    if (!mql) return;

    const apply = () => setCanHover(!!mql.matches);
    apply();

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', apply);
      return () => mql.removeEventListener('change', apply);
    }
    // Safari fallback
    // eslint-disable-next-line deprecation/deprecation
    mql.addListener(apply);
    // eslint-disable-next-line deprecation/deprecation
    return () => mql.removeListener(apply);
  }, []);

  const expanded = pinned || (!canHover && touchExpanded);
  const collapsed = !expanded;

  const toggleTouchExpanded = () => setTouchExpanded((v) => !v);

  const navItems = isAdmin
    ? [
      { id: 'overview', label: 'Overview', icon: Home },
      { id: 'sensors', label: 'Sensors', icon: Activity },
      { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: 2 },
      { id: 'workers', label: 'Workers', icon: Users },
      { id: 'chat', label: 'Chat', icon: MessageSquare },
    ]
    : [
      { id: 'overview', label: 'Overview', icon: Home },
      { id: 'sensors', label: 'My Zone', icon: Activity },
      { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: 1 },
      { id: 'chat', label: 'Admin Chat', icon: MessageSquare },
    ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (!canHover) setTouchExpanded(false);
  };

  const handleSettings = () => {
    setActiveTab('settings');
    if (!canHover) setTouchExpanded(false);
  };

  return (
    <nav
      className={`sidebar ${collapsed ? 'collapsed' : ''} ${pinned ? 'pinned' : 'rail'} ${canHover ? 'can-hover' : 'no-hover'}`}
    >
      <div className="logo-wrap">
        <button
          type="button"
          className="sidebar-toggle"
          onClick={toggleTouchExpanded}
          aria-label={touchExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          title={touchExpanded ? 'Collapse' : 'Expand'}
        >
          <Menu size={18} />
        </button>
        <Zap className="logo-icon" size={28} color="var(--accent)" />
        <div className="logo-content">
          <div className="logo-text font-display">Auto_Grid</div>
          <div className="logo-sub">
            {isAdmin ? 'CONTROL CENTER' : 'WORKER PORTAL'}
          </div>
        </div>
        <button
          type="button"
          className="pin-btn"
          onClick={onTogglePinned}
          aria-label={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
          title={pinned ? 'Unpin' : 'Pin'}
        >
          {pinned ? <PinOff size={16} /> : <Pin size={16} />}
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
        <div className="user-avatar-wrap">
          <div className="avatar">
            {user?.initials || '??'}
          </div>
          {!collapsed && (
            <div className="user-info">
              <div className="user-name">
                {user?.name || 'User'}
              </div>
              <div className="user-status">
                <Circle size={8} fill="var(--green)" color="var(--green)" /> {isAdmin ? 'Active' : `On Duty · ${user?.zone}`}
              </div>
            </div>
          )}
        </div>

        <div className="sidebar-actions">
          <button className="action-btn" onClick={handleSettings} title={collapsed ? "Settings" : ""}>
            <Settings size={16} />
          </button>
          <button className="action-btn" onClick={logout} title={collapsed ? "Logout" : ""}>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Sidebar;