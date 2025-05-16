import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className={`header ${theme}`}>
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img 
            src={theme === 'light' ? logoLight : logoDark} 
            alt="BrainShare Logo" 
            className="logo" 
          />
          <h1 className="logo-text">BrainShare</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/topic/tech" className="nav-link">Tech</Link>
          <Link to="/topic/design" className="nav-link">Design</Link>
          <Link to="/topic/business" className="nav-link">Business</Link>
        </nav>
        
        <div className="header-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {user ? (
            <div className="user-menu">
              <Link to={`/profile/${user.uid}`} className="user-avatar">
                <img 
                  src={user.photoURL || '/default-avatar.png'} 
                  alt={user.displayName || 'User'} 
                />
              </Link>
              <button onClick={handleLogout} className="logout-button">
                Déconnexion
              </button>
            </div>
          ) : (
            <Link to="/login" className="cta-button">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;