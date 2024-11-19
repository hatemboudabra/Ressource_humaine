import axios from 'axios';

const API_URL = 'http://localhost:5000/feuille'; 

// Fonction pour récupérer le token depuis le localStorage
const getToken = () => {
  return localStorage.getItem('token'); // Récupérer le token stocké
};

// Ajouter une nouvelle feuille de temps
const add = async (feuilleTempsData) => {
  const token = getToken();
  
  const response = await axios.post(
    `${API_URL}/add`, 
    feuilleTempsData, 
    {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
      }
    }
  );
  return response.data;
};

// Récupérer toutes les feuilles de temps
const getAll = async () => {
  const token = getToken();
  
  const response = await axios.get(
    `${API_URL}/getall`, // Récupère toutes les feuilles de temps
    {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
      }
    }
  );
  return response.data;
};

// Récupérer une feuille de temps par ID
const getById = async (id) => {
  const token = getToken();
  
  const response = await axios.get(
    `${API_URL}/${id}`, // Récupère la feuille de temps par ID
    {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
      }
    }
  );
  return response.data;
};

// Mettre à jour une feuille de temps
const update = async (id, feuilleTempsData) => {
  const token = getToken();
  
  const response = await axios.put(
    `${API_URL}/${id}`, 
    feuilleTempsData, // Met à jour la feuille de temps avec de nouvelles données
    {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
      }
    }
  );
  return response.data;
};

const getByUserId = async (userId) => {
  const token = getToken();
  try {
    const response = await axios.get(
      `${API_URL}/byuser/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    console.log('Réponse complète:', response);
    return response.data; // Assurez-vous que cela retourne les données nécessaires
  } catch (error) {
    console.error('Erreur dans getByUserId:', error);
    throw error; // Lance l'erreur pour qu'elle soit capturée dans le composant
  }
};


// Supprimer une feuille de temps
const remove = async (id) => {
  const token = getToken();
  
  const response = await axios.delete(
    `${API_URL}/${id}`, // Supprime la feuille de temps par ID
    {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
      }
    }
  );
  return response.data;
};

export default {
  add,
  getAll,
  getById,
  getByUserId,
  update,
  remove,
};
