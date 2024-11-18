import React, { useState, useEffect } from 'react';
import feuilleTempsService from '../../Services/FeuilleTempsService'; // Importer le service
import '../../assets/styles/ConsultationFeuillesTemps.css';

function ConsultationFeuillesTemps() {
  const [feuilles, setFeuilles] = useState([]);
  const [message, setMessage] = useState('');

  // Fonction pour récupérer les feuilles de temps
  const fetchFeuillesTemps = async () => {
    try {
      const response = await feuilleTempsService.getAll(); // Appel à l'API pour récupérer toutes les feuilles
      setFeuilles(response); // Mettre à jour l'état avec les données récupérées
    } catch (error) {
      console.error('Erreur lors de la récupération des feuilles de temps:', error);
      setMessage('Erreur lors de la récupération des feuilles de temps');
    }
  };

  // Fonction pour supprimer une feuille de temps
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette feuille de temps ?');
    if (confirmDelete) {
      try {
        await feuilleTempsService.remove(id); // Appel à la méthode de suppression
        setMessage('Feuille de temps supprimée avec succès');
        fetchFeuillesTemps(); // Recharger les feuilles de temps après la suppression
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        setMessage('Erreur lors de la suppression de la feuille de temps');
      }
    }
  };

  useEffect(() => {
    fetchFeuillesTemps(); // Appeler la fonction au montage du composant
  }, []);

  return (
    <div className="consultation-container">
      <h2 className="form-title">Consultation des Feuilles de Temps</h2>
      {message && <p className="message">{message}</p>}
      <table className="feuille-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Heures Travaillées</th>
            <th>Actions</th> {/* Colonne pour les actions (supprimer) */}
          </tr>
        </thead>
        <tbody>
          {feuilles.length > 0 ? (
            feuilles.map((feuille) => (
              <tr key={feuille._id}>
                <td>{feuille.date}</td>
                <td>{feuille.heuresTravaillees}</td>
                <td>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(feuille._id)}>
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
