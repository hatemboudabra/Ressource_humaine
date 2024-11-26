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
    <div className="home-container">
      <h1 className="welcome-message">Bienvenue dans votre espace RH</h1>
      <p className="user-status">Vous êtes maintenant connecté.</p>

      <div className="link-container">
        <Link to="/profile" className="profile-link">Voir votre profil</Link>
      </div>

      <div className="link-container">
        <Link to="/demande-conge" className="demande-conge-link">Faire une demande de congé</Link>
      </div>

      <div className="link-container">
        <Link to="/feuille/saisie" className="saisie-heures-link">Saisir les heures de travail</Link>
      </div>

      <button className="logout-button" onClick={logout}>Se déconnecter</button>
    </div>
  );
};

export default Home;