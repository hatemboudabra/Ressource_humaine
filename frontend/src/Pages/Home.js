import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">Mon Espace RH</Link>
          <div className="navbar-links">
            <Link to="/dashboard" className="navbar-link">Tableau de Bord</Link>
            <Link to="/profile" className="navbar-link">Profil</Link>
            <Link to="/demande-conge" className="navbar-link">Demandes de congé</Link>
            <Link to="/feuille/saisie" className="navbar-link">Saisie des heures</Link>
            <button className="navbar-logout-button" onClick={logout}>Se déconnecter</button>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="home-container">
        <h1 className="welcome-message">Bienvenue dans votre espace RH</h1>
        <p className="user-status">Vous êtes maintenant connecté.</p>

        {/* Contenu supplémentaire */}
        <div className="content-section">
          <h2>Dernières Nouvelles</h2>
          <ul className="news-list">
            <li>Nouvelle politique de congé à partir du 1er janvier.</li>
            <li>Webinaire sur la gestion du temps le 15 décembre.</li>
            <li>Améliorations de l'interface utilisateur prévues pour février.</li>
          </ul>
        </div>

        <div className="content-section">
          <h2>Liens Rapides</h2>
          <div className="quick-links">
            <Link to="/help" className="quick-link">Centre d'aide</Link>
            <Link to="/settings" className="quick-link">Paramètres</Link>
            <Link to="/contact" className="quick-link">Contactez-nous</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
