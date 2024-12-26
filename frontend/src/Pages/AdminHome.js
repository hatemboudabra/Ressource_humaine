// AdminHome.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">Admin Espace</Link>
          <div className="navbar-links">
            <Link to="/admin-dashboard" className="navbar-link">Tableau de Bord</Link>
            <Link to="/admin/times" className="navbar-link">Feuilles de Temps</Link>
            <Link to="/admin/users" className="navbar-link">Gérer les Utilisateurs</Link>
            <button className="navbar-logout-button" onClick={handleLogout}>Se déconnecter</button>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="admin-home">
        <h1>Bienvenue dans le tableau de bord Administrateur</h1>
        <p>Utilisez la barre de navigation ci-dessus pour accéder aux différentes sections.</p>
      </div>
    </div>
  );
};

export default AdminHome;
