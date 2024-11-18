// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../Services/profileService';
import { useNavigate } from 'react-router-dom'; // Importation de useNavigate
import '../Profile.css'; // Importer un fichier CSS pour la personnalisation

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Initialisation de useNavigate

  // Récupérer les informations de l'utilisateur au chargement du composant
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getProfile(); // Utilisation de la fonction du ProfileService
        setUserInfo(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des informations');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      await updateProfile(userInfo); // Utilisation de la fonction du ProfileService
      setSuccessMessage('Informations mises à jour avec succès');
      // Rediriger vers la page d'accueil après la mise à jour
      setTimeout(() => {
        navigate('/home'); // Redirection vers la page home
      }, 1000); // Attente de 1 seconde pour que l'utilisateur puisse voir le message de succès
    } catch (error) {
      setError('Erreur lors de la mise à jour');
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div className="profile-container">
      <h2>Mettre à jour vos informations personnelles</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Mettre à jour</button>
      </form>
    </div>
  );
};

export default Profile;
