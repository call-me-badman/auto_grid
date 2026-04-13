import React from 'react';
import { ShieldCheck, User, Moon, Sun, Monitor, Bell, Lock, Globe } from 'lucide-react';
import { useAuth, useTheme } from '../../contexts/ThemeContext';

const Settings = () => {
  const { user, userType, userZone, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="fadein" style={{ maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Account Info Section */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: 24
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <User size={20} color="var(--blue)" />
          <div style={{ fontWeight: 800, color: 'var(--text)', letterSpacing: 0.5, fontSize: 16 }}>ACCOUNT INFORMATION</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div style={{ padding: 18, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--deep)' }}>
            <div style={{ color: 'var(--sub)', fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 12 }}>PROFILE DETAILS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: 'var(--blue)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: 18
              }}>
                {user?.initials || '??'}
              </div>
              <div>
                <div style={{ color: 'var(--text)', fontWeight: 800, fontSize: 17 }}>{user?.name || 'Authorized User'}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{user?.role || 'Grid Personnel'}</div>
              </div>
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: 'var(--sub)' }}>Access Level:</span>
                <span style={{ color: 'var(--text)', fontWeight: 700, textTransform: 'uppercase' }}>{userType}</span>
              </div>
              {userZone && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--sub)' }}>Assigned Zone:</span>
                  <span style={{ color: 'var(--text)', fontWeight: 700 }}>{userZone}</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ padding: 18, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--deep)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: 'var(--sub)', fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 12 }}>SYSTEM SECURITY</div>
              <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: 14 }}>Encrypted Local Session</div>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>
                Your session is secured using local encryption. Logging out will clear all active tokens.
              </p>
            </div>
            <button
              onClick={logout}
              style={{
                marginTop: 16, width: '100%', padding: '10px', borderRadius: 8,
                background: 'rgba(255, 0, 85, 0.1)', color: 'var(--red)', border: '1px solid var(--red)',
                fontWeight: 800, fontSize: 12, cursor: 'pointer', transition: '0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--red)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 0, 85, 0.1)'}
            >
              TERMINATE SESSION (LOGOUT)
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: 24
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <Monitor size={20} color="var(--blue)" />
          <div style={{ fontWeight: 800, color: 'var(--text)', letterSpacing: 0.5, fontSize: 16 }}>SYSTEM PREFERENCES</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {/* Theme Toggle */}
          <div style={{ padding: 18, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--deep)' }}>
            <div style={{ color: 'var(--sub)', fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 12 }}>VISUAL MODE</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {isDarkMode ? <Moon size={20} color="var(--purple)" /> : <Sun size={20} color="#f59e0b" />}
                <span style={{ color: 'var(--text)', fontWeight: 700 }}>{isDarkMode ? 'Dark Protocol' : 'Light Mode'}</span>
              </div>
              <button
                onClick={toggleTheme}
                style={{
                  padding: '6px 14px', borderRadius: 6, background: 'var(--blue)', color: 'white',
                  border: 'none', fontWeight: 800, fontSize: 11, cursor: 'pointer'
                }}
              >
                SWITCH
              </button>
            </div>
          </div>

          {/* Dummy Placeholder for functionality */}
          <div style={{ padding: 18, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--deep)' }}>
            <div style={{ color: 'var(--sub)', fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 12 }}>NOTIFICATIONS</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Bell size={20} color="var(--green)" />
                <span style={{ color: 'var(--text)', fontWeight: 700 }}>Real-time Alerts</span>
              </div>
              <div style={{
                width: 40, height: 20, borderRadius: 20, background: 'var(--green)',
                position: 'relative', cursor: 'pointer'
              }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', right: 2, top: 2 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

