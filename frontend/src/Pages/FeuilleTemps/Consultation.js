import React, { useState, useEffect } from 'react';
import feuilleTempsService from '../../Services/FeuilleTempsService'; // Importer le service
import {jwtDecode} from 'jwt-decode'; // Pour décoder le token
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import '../../assets/styles/ConsultationFeuillesTemps.css';

function ConsultationFeuillesTemps() {
  const [feuilles, setFeuilles] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialiser le hook de navigation

  // Fonction pour récupérer les feuilles de temps de l'utilisateur connecté
  const fetchFeuillesTemps = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Veuillez vous connecter.');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?._id;

      if (!userId) {
        setMessage('L\'ID de l\'utilisateur est introuvable dans le token');
        return;
      }

      const response = await feuilleTempsService.getByUserId(userId);
      if (response.success && Array.isArray(response.data)) {
        setFeuilles(response.data);
      } else {
        setMessage('Aucune feuille de temps trouvée');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des feuilles de temps:', error);
    }
  };

  // Fonction pour supprimer une feuille de temps avec confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette feuille de temps ?');
    if (!confirmDelete) return;

    try {
      await feuilleTempsService.remove(id);
      setMessage('Feuille de temps supprimée avec succès.');
      // Mettre à jour la liste des feuilles localement
      setFeuilles(feuilles.filter((feuille) => feuille._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setMessage('Erreur lors de la suppression de la feuille de temps.');
    }
  };

  // Rediriger vers la page de modification
  const handleEdit = (id) => {
    navigate(`/feuille/modifier/${id}`);
  };

  useEffect(() => {
    fetchFeuillesTemps();
  }, []);

  return (
    <div className="consultation-container">
      <h2 className="form-title">Consultation des Feuilles de Temps</h2>
      {message && (
        <p className={`message ${message.includes('succès') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
      <table className="feuille-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Heures Travaillées</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(feuilles) && feuilles.length > 0 ? (
            feuilles.map((feuille) => (
              <tr key={feuille._id}>
                <td>{new Date(feuille.date).toLocaleDateString()}</td>
                <td>{feuille.heuresTravaillees}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(feuille._id)}
                  >
                    Modifier
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(feuille._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Aucune feuille de temps enregistrée</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultationFeuillesTemps;
