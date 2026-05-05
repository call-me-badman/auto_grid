import React from 'react';
import { ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../contexts/ThemeContext';

const Settings = () => {
  const { user, userType, userZone } = useAuth();

  return (
    <div className="fadein" style={{ maxWidth: 920 }}>
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <ShieldCheck size={18} color="var(--green)" />
          <div style={{ fontWeight: 800, color: 'var(--text)', letterSpacing: 0.5 }}>Account & Access</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
          <div style={{ padding: 14, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--deep)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--sub)', fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>
              <User size={14} />
              USER
            </div>
            <div style={{ marginTop: 8, color: 'var(--text)', fontWeight: 800, fontSize: 16 }}>
              {user?.name || '—'}
            </div>
            <div style={{ marginTop: 4, color: 'var(--muted)', fontSize: 13 }}>
              Type: <span style={{ color: 'var(--text)', fontWeight: 700 }}>{userType}</span>
              {userType === 'worker' && userZone ? (
                <>
                  {' '}
                  · Zone: <span style={{ color: 'var(--text)', fontWeight: 700 }}>{userZone}</span>
                </>
              ) : null}
            </div>
          </div>

          <div style={{ padding: 14, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--deep)' }}>
            <div style={{ color: 'var(--sub)', fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>SECURITY</div>
            <div style={{ marginTop: 8, color: 'var(--text)', fontWeight: 800, fontSize: 16 }}>Session stored locally</div>
            <div style={{ marginTop: 4, color: 'var(--muted)', fontSize: 13 }}>
              Logout clears your local session and returns you to the login screen.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

