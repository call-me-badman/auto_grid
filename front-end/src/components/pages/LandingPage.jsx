import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Activity, AlertTriangle, Users, BarChart3, MessageSquare } from 'lucide-react';
import PageLayout from '../layout/PageLayout';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <PageLayout
      title="Autonomous Grid"
      showThemeToggle={true}
      showSidebar={false}
      showAlertBanner={false}
      showLiveIndicator={false}
    >
      <div className="landing-container">
        <div className="landing-content">
        <div className="logo-section">
          <Zap className="logo-icon" size={48} />
          <div className="logo-text">Autonomous Grid</div>
          <div className="logo-sub">MODERNISED GRID MANAGEMENT</div>
        </div>

        <div className="hero-section">
          <h1 className="hero-title">Welcome to the Digital Grid Monitoring</h1>
          <p className="hero-description">
            Monitor, control, and optimize your power distribution network with real-time insights
            and faster notifications. Experience seamless grid management with Autonomous Grid.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <Activity className="feature-icon" size={36} />
            <div className="feature-title">Real-time Monitoring</div>
            <div className="feature-description">Track voltage, current, and power across the entire grid instantly</div>
          </div>
          <div className="feature-card">
            <AlertTriangle className="feature-icon" size={36} />
            <div className="feature-title">Smart Alerts</div>
            <div className="feature-description">Get instant notifications about grid anomalies and critical events</div>
          </div>
          <div className="feature-card">
            <Users className="feature-icon" size={36} />
            <div className="feature-title">Worker Management</div>
            <div className="feature-description">Coordinate field teams and manage maintenance operations efficiently</div>
          </div>
          <div className="feature-card">
            <BarChart3 className="feature-icon" size={36} />
            <div className="feature-title">Analytics Dashboard</div>
            <div className="feature-description">Analyze consumption patterns and optimize grid performance</div>
          </div>
          <div className="feature-card">
            <MessageSquare className="feature-icon" size={36} />
            <div className="feature-title">Communication</div>
            <div className="feature-description">Message or text with the admin and field workers</div>
          </div>
        </div>

          <div className="cta-section">
            <button className="cta-button" onClick={handleGetStarted}>
              Get Started
            </button>
            <p className="cta-subtext">Join thousands of organizations managing their grids efficiently</p>
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default LandingPage;
