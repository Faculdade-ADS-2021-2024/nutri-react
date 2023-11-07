import { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./screens/Login/Login";
import { Agenda } from "./screens/Agenda/Agenda";

import { AuthProvider, AuthContext } from './context/auth';
import { Agendamento } from './screens/Agendamento/Agendamento';
import { Paciente } from './screens/Paciente/Paciente';
import { Calendario } from './screens/Calendario/Calendario';
import { Anamnese } from './screens/Anamnese/Anamnese';

export function AppRoute() {
    function Private({children}) {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div>Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to="/" />;
        }
        return children;
    }
    
    return (        
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/agenda' element={<Private><Agenda /></Private>} />
                    <Route path='/agendamento' element={<Private><Agendamento /></Private>} />
                    <Route path='/novo-paciente' element={<Private><Paciente /></Private>} />
                    <Route path='/editar-paciente/:id' element={<Private><Paciente /></Private>} />
                    <Route path='/calendario' element={<Private><Calendario /></Private>} />
                    <Route path='/anamnese' element={<Private><Anamnese /></Private>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}