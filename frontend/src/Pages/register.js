import React, { useState } from 'react';
import UserService from '../Services/UserService';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { username: '', email: '', password: '' };

        if (!username) {
            newErrors.username = 'Username is required';
            isValid = false;
        }
        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const register = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const data = {
            username: username,
            email: email,
            password: password
        };

        try {
            const response = await UserService.register(data);
            setLoading(false);
            toast.success('Successfully created!');
            setUsername('');
            setEmail('');
            setPassword('');
            navigate("/login");
        } catch (err) {
            setLoading(false);
            console.error('Registration error:', err);
            if (err.response && err.response.data) {
                toast.error(`Failed: ${err.response.data.message}`);
            } else {
                toast.error('Failed while signup!');
            }
        }
    };

    return (
        <div className='register'>
            <div className='register-cover'>
                <Toaster />
            </div>
            <div className='register-content'>
                <div className='register-header'>
                    <h1>Dark Space</h1>
                    <p>RH Application</p>
                </div>
                <div className='register-form'>
                    <form onSubmit={register}>
                        <div className='form-group'>
                            <label>UserName</label>
                            <input 
                                type='text' 
                                className='input' 
                                placeholder='Enter your UserName'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username && <span className='error'>{errors.username}</span>}
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input 
                                type='email' 
                                className='input' 
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <span className='error'>{errors.email}</span>}
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
                            {errors.password && <span className='error'>{errors.password}</span>}
                        </div>
                        <button type='submit' className='btn' disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
