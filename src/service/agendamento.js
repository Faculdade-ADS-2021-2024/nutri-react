import { api } from './api';

export const getAgendamento = async () => {
    return await api.get('/agendamento');
}

export const getAgendamentoId = async (id) => {
    return await api.get(`/agendamento/${id}`);
}

export const createAgendamento = async (agendamento) => {
    return await api.post('/agendamento', agendamento);
}

export const updateAgendamento = async (id, agendamento) => {
    return await api.patch(`/agendamento/${id}`, agendamento);
}