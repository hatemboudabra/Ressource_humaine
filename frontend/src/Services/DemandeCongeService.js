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
  /////////////////////
  getDemandeById: async (id, token) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de la récupération des détails');
    }
  },
  ///////////////////////////////
  getAllDemandes: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de la récupération des demandes');
    }
  },
  /////////////////////////
  // Mettre à jour le statut d'une demande de congé
  updateStatus: async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/${id}/status`,
        { status },  // Passer le statut dans le corps de la requête
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Détails de l'erreur :", error.response);  // Afficher la réponse complète
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du statut de la demande');
    }
  }
  



  
};

export default DemandeCongeService;
