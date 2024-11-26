import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';  // Correction de l'import
import feuilleTempsService from '../../Services/FeuilleTempsService';  // Importer le service
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import '../../assets/styles/SaisieHeures.css'; // Importer le fichier CSS

function SaisieHeures() {
  const [heures, setHeures] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialiser le hook de navigation

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Récupérer le token d'authentification

    if (!token) {
      setMessage('Le token d\'authentification est introuvable. Veuillez vous reconnecter.');
      return;
    }

    try {
      // Décoder le token pour obtenir l'ID de l'employé
      const decodedToken = jwtDecode(token);
      const employeId = decodedToken?._id; // Assurez-vous que l'ID est dans le payload du token

      if (!employeId) {
        setMessage('L\'ID de l\'employé est introuvable dans le token');
        return;
      }

      // Validation des autres champs
      if (!heures || isNaN(heures) || heures <= 0) {
        setMessage('Les heures travaillées doivent être un nombre valide supérieur à 0');
        return;
      }

      if (!date) {
        setMessage('La date est requise');
        return;
      }

      // Envoyer les données avec l'ID de l'employé
      const response = await feuilleTempsService.add({
        heuresTravaillees: heures,
        date: date,
        employe: employeId,  // L'ID de l'employé est envoyé ici
      });

      setMessage('Feuille de temps soumise avec succès');
      console.log(response);

      // Rediriger vers la page de consultation après soumission
      setTimeout(() => {
        navigate('/feuille/consultation');  // Redirection vers la page de consultation
      }, 1500);  // Attendre 1,5 secondes avant la redirection
    } catch (error) {
      console.error('Erreur lors de la soumission:', error.response ? error.response.data : error.message);
      setMessage('Erreur lors de la soumission de la feuille de temps');
    }
  };

  return (
    <div className="saisie-container">
      <h2 className="form-title">Saisir les heures de travail</h2>
      <form className="saisie-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Heures travaillées:</label>
          <input
            type="number"
            value={heures}
            onChange={(e) => setHeures(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="submit-button">Soumettre</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default SaisieHeures;
