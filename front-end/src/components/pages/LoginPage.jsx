import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Lock, Mail, Shield, User } from 'lucide-react';
import { useAuth, WORKER_PERSONAS } from '../../contexts/ThemeContext';
import '../styles/LoginPage.css';

const ADMIN_USER = {
  id: 'admin',
  name: 'Administrator',
  email: 'admin@grid.com',
  initials: 'AD',
  zone: null,
  role: 'System Administrator',
  type: 'admin'
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [userType, setUserType] = useState('worker'); // 'worker' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedWorkerId, setSelectedWorkerId] = useState(WORKER_PERSONAS[0]?.id || '');
  const [error, setError] = useState('');

  const selectedWorker = useMemo(
    () => WORKER_PERSONAS.find((w) => w.id === selectedWorkerId) || null,
    [selectedWorkerId]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (userType === 'admin') {
      if (!email.trim() || !password.trim()) {
        setError('Enter your admin email and password.');
        return;
      }
      login({ ...ADMIN_USER, email: email.trim() });
      navigate('/dashboard');
      return;
    }

    if (!selectedWorker) {
      setError('Select a worker profile to continue.');
      return;
    }

    login(selectedWorker);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card fadein">
        <div className="login-header">
          <div className="logo-section">
            <div className="logo-text">Auto_Grid</div>
            <div className="logo-sub">SECURE ACCESS PORTAL</div>
          </div>
        </div>

        <div className="user-type-tabs" role="tablist" aria-label="User type">
          <button
            type="button"
            className={`type-tab ${userType === 'worker' ? 'active' : ''}`}
            onClick={() => setUserType('worker')}
            aria-selected={userType === 'worker'}
          >
            <User size={18} />
            Worker
          </button>
          <button
            type="button"
            className={`type-tab ${userType === 'admin' ? 'active' : ''}`}
            onClick={() => setUserType('admin')}
            aria-selected={userType === 'admin'}
          >
            <Shield size={18} />
            Admin
          </button>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {userType === 'admin' ? (
            <>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" size={18} />
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@grid.com"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <Lock className="input-icon" size={18} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="form-group">
              <label>Worker profile</label>
              <div className="worker-selector" role="listbox" aria-label="Worker selector">
                {WORKER_PERSONAS.map((w) => {
                  const selected = w.id === selectedWorkerId;
                  return (
                    <button
                      type="button"
                      key={w.id}
                      className={`worker-option ${selected ? 'selected' : ''}`}
                      onClick={() => setSelectedWorkerId(w.id)}
                      aria-selected={selected}
                    >
                      <div className="worker-avatar-circle">{w.initials}</div>
                      <div className="worker-option-info">
                        <div className="worker-option-name">{w.name}</div>
                        <div className="worker-option-zone">{w.zone}</div>
                      </div>
                      {selected && <Check className="check-icon" size={18} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button className="login-btn" type="submit">
            <Shield size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
            Sign in
          </button>
        </form>

        <div className="login-footer">
          <button type="button" className="back-link" onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

