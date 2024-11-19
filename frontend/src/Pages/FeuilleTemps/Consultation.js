import React, { useState, useEffect } from 'react';
import feuilleTempsService from '../../Services/FeuilleTempsService'; // Importer le service
import { jwtDecode } from 'jwt-decode'; // Utiliser jwt-decode pour extraire l'ID de l'utilisateur à partir du token
import '../../assets/styles/ConsultationFeuillesTemps.css';

function ConsultationFeuillesTemps() {
  const [feuilles, setFeuilles] = useState([]); // Initialiser comme tableau vide
  const [message, setMessage] = useState('');

  // Fonction pour récupérer les feuilles de temps de l'utilisateur connecté
  const fetchFeuillesTemps = async () => {
    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    if (!token) {
      setMessage('Veuillez vous connecter.');
      return;
    }

    try {
      const decodedToken = jwtDecode(token); // Décoder le token pour obtenir l'ID de l'utilisateur
      console.log('Contenu du token décodé:', decodedToken);

      const userId = decodedToken?._id;
      console.log('ID Utilisateur extrait du token:', userId); // Vérification de l'ID extrait

      if (!userId) {
        setMessage('L\'ID de l\'utilisateur est introuvable dans le token');
        return;
      }

      // Appel à l'API pour récupérer les feuilles de temps de l'utilisateur
      const response = await feuilleTempsService.getByUserId(userId); // Attendre directement la réponse
      console.log('Données récupérées:', response);

      // Vérification de la structure de la réponse
      if (response.success && Array.isArray(response.data)) {
        setFeuilles(response.data); // Mettre à jour l'état avec les données récupérées
      } else {
        setMessage('Aucune feuille de temps trouvée');
      }
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
  }, []); // Cette fonction s'exécute une seule fois lorsque le composant est monté

  return (
    <div className="consultation-container">
      <h2 className="form-title">Consultation des Feuilles de Temps</h2>
      {message && <p className="message">{message}</p>}
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
                <td>{new Date(feuille.date).toLocaleDateString()}</td> {/* Formater la date */}
                <td>{feuille.heuresTravaillees}</td>
                <td>
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
