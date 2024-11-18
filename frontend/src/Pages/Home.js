import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importer Link pour la navigation
import '../assets/styles/Home.css'; // Importer le fichier CSS

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token'); // Supprimer le token du localStorage
    navigate('/login'); // Redirige vers la page de login
  };

  return (
    <div className="home-container">
      <h1 className="welcome-message">Bienvenue dans votre espace RH</h1>
      <p className="user-status">Vous êtes maintenant connecté.</p>

      <div className="profile-link-container">
        <Link to="/profile" className="profile-link">Voir votre profil</Link> {/* Lien vers le profil */}
      </div>

      <div className="demande-conge-link-container">
        <Link to="/demande-conge" className="demande-conge-link">Faire une demande de congé</Link> {/* Lien vers la demande de congé */}
      </div>

      <button className="logout-button" onClick={logout}>Se déconnecter</button>
    </div>
  );
};

export default Home;
