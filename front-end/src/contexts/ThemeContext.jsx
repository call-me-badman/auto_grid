import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useAuth = () => {
  const { user, login, logout } = useTheme();

  return {
    user,
    login,
    logout,
    userType: user?.type || 'guest',
    userZone: user?.zone || null,
    userName: user?.name || 'Guest',
    userInitials: user?.initials || '??',
    isAdmin: user?.type === 'admin',
    isWorker: user?.type === 'worker',
    canAccessAllData: user?.type === 'admin',
    canAccessZoneData: (user?.type === 'worker' && user?.zone) || user?.type === 'admin',
    accessibleZones: user?.type === 'admin'
      ? ['Zone A', 'Zone B', 'Zone C', 'Zone D']
      : (user?.zone ? [user.zone] : [])
  };
};

export const WORKER_PERSONAS = [
  { id: 'worker-1', name: 'Jean Pierre', email: 'jp@grid.com', initials: 'JP', zone: 'Zone A', role: 'Field Worker', type: 'worker' },
  { id: 'worker-2', name: 'Amina Uwase', email: 'amina@grid.com', initials: 'AU', zone: 'Zone B', role: 'Field Worker', type: 'worker' },
  { id: 'worker-3', name: 'Eric Mugisha', email: 'eric@grid.com', initials: 'EM', zone: 'Zone C', role: 'Field Worker', type: 'worker' },
  { id: 'worker-4', name: 'Diane Iradukunda', email: 'diane@grid.com', initials: 'DI', zone: 'Zone D', role: 'Field Worker', type: 'worker' },
];

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--bg', '#0b0f1a');
      root.style.setProperty('--sidebar', '#101624');
      root.style.setProperty('--card', '#161d2f');
      root.style.setProperty('--border', '#243046');
      root.style.setProperty('--accent', '#0070f3');
      root.style.setProperty('--blue', '#0070f3');
      root.style.setProperty('--green', '#10b981');
      root.style.setProperty('--red', '#ff0055');
      root.style.setProperty('--amber', '#f59e0b');
      root.style.setProperty('--purple', '#7928ca');
      root.style.setProperty('--text', '#f8fafc');
      root.style.setProperty('--muted', '#94a3b8');
      root.style.setProperty('--sub', '#64748b');
      root.style.setProperty('--deep', '#070a13');
    } else {
      root.style.setProperty('--bg', '#f8fafc');
      root.style.setProperty('--sidebar', '#ffffff');
      root.style.setProperty('--card', '#ffffff');
      root.style.setProperty('--border', '#e2e8f0');
      root.style.setProperty('--accent', '#0070f3');
      root.style.setProperty('--blue', '#0070f3');
      root.style.setProperty('--green', '#059669');
      root.style.setProperty('--red', '#dc2626');
      root.style.setProperty('--amber', '#d97706');
      root.style.setProperty('--purple', '#7928ca');
      root.style.setProperty('--text', '#0f172a');
      root.style.setProperty('--muted', '#475569');
      root.style.setProperty('--sub', '#64748b');
      root.style.setProperty('--deep', '#f1f5f9');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const login = (userData) => {
    console.log('ThemeContext: login called with:', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('ThemeContext: user set and saved to localStorage');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleTheme,
      user,
      login,
      logout
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
