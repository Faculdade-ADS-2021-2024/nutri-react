import { api } from './api';

export const getPaciente = async () => {
    return await api.get('/paciente');
}

export const getPacienteId = async (id) => {
    return await api.get(`/paciente/${id}`);
}

export const createPaciente = async (paciente) => {
    return await api.post('/paciente', paciente);
}

export const updatePaciente = async (id, paciente) => {
    return await api.patch(`/paciente/${id}`, paciente);
}