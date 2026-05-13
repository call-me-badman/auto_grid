import React, { useState } from 'react';
import Sidebar from './Sidebar';
import PageLayout from '../layout/PageLayout';
import { useAuth } from '../../contexts/ThemeContext';
import Overview from './Overview';
import Sensors from './Sensors';
import Alerts from './Alerts';
import Chat from './Chat';
import Workers from './Workers';
import Settings from './Settings';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  // Keep sidebar expanded by default (icon + label visible)
  const [sidebarPinned, setSidebarPinned] = useState(true);
  const { isAdmin } = useAuth();

  React.useEffect(() => {
    const handleTabChange = (e) => {
      if (e.detail && titleMap[e.detail]) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  const titleMap = {
    overview: isAdmin ? 'System Overview' : 'My Dashboard',
    sensors: isAdmin ? 'Sensors' : 'My Zone',
    alerts: 'Alerts',
    workers: 'Workers',
    chat: isAdmin ? 'Communications' : 'Admin Chat',
    settings: 'Settings'
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'sensors':
        return <Sensors />;
      case 'alerts':
        return <Alerts />;
      case 'workers':
        return <Workers />;
      case 'chat':
        return <Chat />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <PageLayout
      title={titleMap[activeTab] || (isAdmin ? 'System Overview' : 'My Dashboard')}
      showAlertBanner={isAdmin}
      alertCount={isAdmin ? 2 : 1}
      showThemeToggle={true}
      showSidebar={true}
      sidebarCollapsed={!sidebarPinned}
      sidebarContent={
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          pinned={sidebarPinned}
          onTogglePinned={() => setSidebarPinned((p) => !p)}
        />
      }
    >
      {renderTab()}
    </PageLayout>
  );
};

export default Dashboard;
