import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import '../styles/PageLayout.css';

const PageLayout = ({
  children,
  title,
  showAlertBanner = false,
  alertCount = 0,
  showThemeToggle = true,
  showSidebar = false,
  sidebarContent = null,
  sidebarCollapsed = false
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="page-layout">
      {/* Sidebar (if needed) */}
      {showSidebar && sidebarContent && (
        <div className={`page-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          {sidebarContent}
        </div>
      )}

      {/* Main Content Area */}
      <div className="page-main-content-wrapper">
        {/* Topbar */}
        <div className="page-topbar">
          <div className="page-title">{title}</div>
          <div className="topbar-right">
            {showAlertBanner && (
              <div className="alert-banner">{alertCount} Active Alerts</div>
            )}
            {showThemeToggle && (
              <button className="theme-toggle-topbar" onClick={toggleTheme} title="Toggle theme">
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="page-main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
