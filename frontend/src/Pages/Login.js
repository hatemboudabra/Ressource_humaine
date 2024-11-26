import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';

const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const login = async (e) => {
        e.preventDefault();
        console.log("submitted");
        console.log(username, password);

        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await UserService.signin(data);
            console.log(response);

            // Stockage du token dans localStorage
            localStorage.setItem('token', response.token);

            // Assurez-vous que la réponse contient le rôle de l'utilisateur
            if (response.user && response.user.role) {
                localStorage.setItem('role', response.user.role); // Stockage du rôle dans localStorage
                console.log("Role stocké dans localStorage: ", response.user.role); // Log du rôle
            }

            toast.success('Successfully signed in!');
            setUsername('');
            setPassword('');

            // Log avant redirection pour vérifier si tout est bien stocké
            console.log("Token stocké dans localStorage: ", localStorage.getItem('token'));
            console.log("Role stocké dans localStorage: ", localStorage.getItem('role'));

            // Redirection en fonction du rôle
            const role = response.user.role.toLowerCase();
            if (role === 'admin') {
                navigate("/admin-home");
            } else if (role === 'employe') {
                navigate("/home");
            } else {
                console.error("Rôle inconnu, redirection par défaut vers /home");
                navigate("/home");
            }

        } catch (err) {
            console.log(err);
            toast.error('Failed while signing in!');
        }
    };

    return (
        <div className='login'>
            <div className='login-cover'>
                <Toaster />
            </div>
            <div className='login-content'>
                <div className='login-header'>
                    <h1>Dark Space</h1>
                    <p>RH Application</p>
                </div>
                <div className='login-form'>
                    <form onSubmit={login}>
                        <div className='form-group'>
                            <label>UserName</label>
                            <input
                                type='text'
                                className='input'
                                placeholder='Enter your UserName'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                className='input'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type='submit' className='login-btn'>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;