import { api } from './api';

export const createSession = async (auth) => {
    return await api.post('/usuario/auth', auth);
}