import axios from 'axios';

const API_URL = 'http://localhost:5000/demandes';

const DemandeCongeService = {
  // Récupérer les demandes de congé de l'utilisateur
  getAll: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de la récupération des demandes');
    }
  },

  // Créer une demande de congé
  create: async (data, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/create`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de la création de la demande');
    }
  },

  // Supprimer une demande de congé
  deleteDemandeConge: async (id, token) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Envoi du token d'authentification
        },
      });
      return response.data; // Retourner la réponse du serveur (message de succès)
    } catch (error) {
      // Gestion de l'erreur et renvoi d'un message plus explicite
      throw new Error(error.response?.data?.message || 'Erreur lors de la suppression de la demande de congé');
    }
  },
  
};

export default DemandeCongeService;
