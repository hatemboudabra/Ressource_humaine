// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token'); // Supprime le token du localStorage
    navigate('/login'); // Redirige vers la page de login
  };

  return (
    <div>
      <h1>Bienvenue dans votre espace RH</h1>
      <p>Vous êtes maintenant connecté.</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
};

export default Home;
