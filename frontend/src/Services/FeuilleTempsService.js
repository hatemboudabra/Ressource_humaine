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
    `${API_URL}/getall`,
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
    `${API_URL}/${id}`,
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
    feuilleTempsData,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
      }
    }
  );
  return response.data;
};

// Supprimer une feuille de temps
const remove = async (id) => {
  const token = getToken();
  
  const response = await axios.delete(
    `${API_URL}/${id}`,
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
  update,
  remove,
};
