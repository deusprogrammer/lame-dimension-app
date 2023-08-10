import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Component = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async () => {
        try {
            let res = await axios.post(`http://localhost:8080/auth`, {
                username,
                password,
            });

            localStorage.setItem('jwtToken', res.data.jwtToken);
            navigate(`/scripts`);
        } catch (e) {
            setError('Incorrect credentials');
        }
    };

    const createUser = async () => {
        try {
            await axios.post(`http://localhost:8080/users`, {
                username,
                password,
            });

            let res = await axios.post(`http://localhost:8080/auth`, {
                username,
                password,
            });

            localStorage.setItem('jwtToken', res.data.jwtToken);
            navigate(`/scripts`);
        } catch (e) {
            setError('User creation failed');
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                    margin: 'auto',
                }}
            >
                {error ? (
                    <div
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        {error}
                    </div>
                ) : null}
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={({ target: { value } }) => {
                        setUsername(value);
                    }}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={({ target: { value } }) => {
                        setPassword(value);
                    }}
                />
                <button onClick={login}>Login</button>
                <button onClick={createUser}>Create User</button>
            </div>
        </div>
    );
};

export default Component;
