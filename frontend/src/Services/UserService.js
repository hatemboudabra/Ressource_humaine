import axios from "axios"

const UserService = {}
UserService.register = async function (data) {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', data);
      return response.data; 
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };


export default UserService