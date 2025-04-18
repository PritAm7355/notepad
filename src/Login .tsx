import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()|| !password.trim()) {
            alert('Please fill in both fields');
            
        } else {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            navigate('/sidebar');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <label htmlFor="username">Username</label>
                <input
                    className="mb-2 p-2"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                   
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mb-2 p-2"
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;