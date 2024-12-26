// src/services/profileService.js
import axios from 'axios';
import { getToken } from './auth'; // Assurez-vous d'importer le bon fichier pour obtenir le token

const API_URL = 'http://localhost:5000/user';

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des informations');
  }
};

export const updateProfile = async (userInfo) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/profile`, userInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour');
  }
};


// Fonction pour récupérer tous les utilisateurs
export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des utilisateurs');
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de l\'utilisateur');
  }
};

