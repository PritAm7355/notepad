import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            alert('Please fill in both fields');
            return;
        }

        try {
            const existing = await axios.get(`http://localhost:3001/users`, {
                params: { username }
            });

            if (existing.data.length > 0) {
                alert('Username already exists!');
                return;
            }

            await axios.post(`http://localhost:3001/users`, {
                username,
                password
            });

            alert('Signup successful! You can now login.');
            navigate('/');
        } catch (error) {
            console.error('Signup error:', error);
            alert('Failed to sign up. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Signup</h2>

                <label htmlFor="username">Username</label>
                <input
                    className="mb-2 p-2"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Create Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mb-2 p-2"
                />

                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default Signup;
