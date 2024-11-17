export const getToken = () => {
  const token = localStorage.getItem('token');
  console.log('Token récupéré:', token); // Vérifiez que le token est bien récupéré
  return token;
};