import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';
import { createSession } from '../service/login';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const token = sessionStorage.getItem('token');

        if (user && token) {
            setUser(user);
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false);
    }, []);

    async function login(auth) {

        const response = await createSession(auth);

        const loggedUser = response.data.payload;
        const token = response.data.token;

        sessionStorage.setItem('user', JSON.stringify(loggedUser));
        sessionStorage.setItem('token', token);

        api.defaults.headers.Authorization = `Bearer ${token}`;
        
        setUser({ loggedUser });
        navigate('/agenda');
    }

    function logout() {
        api.defaults.headers.Authorization = null;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        
        setUser(null);
        navigate('/');
    }

    return <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>{children}</AuthContext.Provider>;
}