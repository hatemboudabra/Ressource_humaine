import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const role = localStorage.getItem('role');

  return (
    <nav>
      <ul>
        {role === 'employe' && (
          <>
            <li><Link to="/home">Accueil</Link></li>
            <li><Link to="/profile">Profil</Link></li>
            <li><Link to="/dashboard">Tableau de Bord</Link></li>
            <li><Link to="/demande-conge">Demande de Congé</Link></li>
            <li><Link to="/feuille/saisie">Saisie des Heures</Link></li>
            <li><Link to="/feuille/consultation">Consultation des Feuilles de Temps</Link></li>
            {/* Ajoutez d'autres liens pour l'employé ici */}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;