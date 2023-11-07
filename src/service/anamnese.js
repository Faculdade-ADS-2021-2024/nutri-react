import { api } from './api';

export const getAnamnese = async () => {
    return await api.get('/anamnese');
}

export const getAnamneseId = async (id) => {
    return await api.get(`/anamnese/${id}`);
}

export const getAnamnesePorPacienteId = async (paciente_id) => {
    return await api.get(`/anamnese/paciente/${paciente_id}`);
}

export const createAnamnese = async (anamnese) => {
    return await api.post('/anamnese', anamnese);
}

export const updateAnamnese = async (id, anamnese) => {
    return await api.patch(`/anamnese/${id}`, anamnese);
}