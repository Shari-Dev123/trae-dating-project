import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    setTimeout(() => setIsVisible(true), 100);
  }, [navigate]);

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-content">
        <section className={`welcome-section ${isVisible ? 'visible' : ''}`}>
          <div className="animated-circles">
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
          </div>
          <div className="welcome-text">
            <h1>Welcome to Your Dashboard</h1>
            <p>Start your journey to find your perfect life partner 🤍</p>
          </div>
        </section>

        <div className="dashboard-cards">
          <Link to="/profile" className={`card group ${isVisible ? 'visible' : ''} delay-1`}>
            <div className="card-icon profile-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3>My Profile</h3>
            <p>Complete or update your personal and family details.</p>
            <div className="card-cta">View Profile</div>
          </Link>

          <Link to="/matches" className={`card group ${isVisible ? 'visible' : ''} delay-2`}>
            <div className="card-icon matches-icon">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h3>Find Matches</h3>
            <p>Browse compatible and verified profiles.</p>
            <div className="card-cta">Explore Matches</div>
          </Link>

          <Link to="/messages" className={`card group ${isVisible ? 'visible' : ''} delay-3`}>
            <div className="card-icon messages-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3>Messages</h3>
            <p>Communicate safely with your matches.</p>
            <div className="card-cta">Open Messages</div>
          </Link>
          <Link to="/settings" className={`card group ${isVisible ? 'visible' : ''} delay-4`}>
            <div className="card-icon settings-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v2m6.364 1.636l-1.414 1.414M20 12h-2M17.364 17.364l-1.414-1.414M12 20v-2M6.636 17.364l1.414-1.414M4 12h2M6.636 6.636l1.414 1.414" />
              </svg>
            </div>
            <h3>Account Settings</h3>
            <p>Update your account preferences, email, and password.</p>
            <div className="card-cta">Manage Account</div>
          </Link>

        </div>
      </main>

    </div>
  );
}

export default Dashboard;
