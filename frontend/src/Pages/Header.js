// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css';// Vous pourrez ajouter des styles dans ce fichier

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/demande-conge">Demande de Congé</Link>
          </li>
          <li>
            <Link to="/feuille/saisie">Saisie des heures</Link>
          </li>
          <li>
            <Link to="/feuille/consultation">Consultation des heures</Link>
          </li>
          {/* Ajoutez d'autres liens ici selon les pages que vous avez */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
