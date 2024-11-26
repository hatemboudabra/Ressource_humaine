// AdminHome.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/AdminHome.css';
const AdminHome = () => {
  return (
    <div className="admin-home">
      <h1>Bienvenue dans le tableau de bord Administrateur</h1>
      <p>Utilisez les liens ci-dessous pour accéder aux différentes sections :</p>
      <div className="admin-links">
        <ul>
          <li>
            <Link to="/admin/times">Consulter les Feuilles de Temps</Link>
          </li>
          <li>
            <Link to="/admin-dashboard">Tableau de bord</Link>
          </li>
          <li>
            <Link to="/admin/users">Gérer les Utilisateurs</Link>
          </li>
          {/* Ajoutez d'autres liens pour d'autres pages spécifiques à l'admin */}
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
