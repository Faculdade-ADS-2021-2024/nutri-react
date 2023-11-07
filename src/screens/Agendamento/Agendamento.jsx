import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass } from "@phosphor-icons/react";
import styles from './Agendamento.module.less';
import { Header } from '../../components/Header/Header';
import { getPaciente } from '../../service/paciente';

export function Agendamento() {
    const [paciente, setPaciente] = useState([]);
    const [filtro, setFiltro] = useState('');

    const pacienteFiltrado = paciente.filter(paciente => paciente.nome.toLowerCase().includes(filtro.toLowerCase()));

    useEffect(() => {
        (async () => {
            const paciente = await getPaciente();
            setPaciente(paciente.data);
        })();
    }, []);

    function handleFilter(e) {
        const value = e.target.value;
        setFiltro(value);
    }

    return (
        <div className={styles.agendamento}>
            <Header />
            <div className={styles.menu}>
                <h3>Paciente</h3>
                <div className={styles.filtro}>
                    <div className={styles["input-container"]}>
                        <input
                            type="text"
                            name='filtro'
                            value={filtro}
                            placeholder='Digite o nome do paciente'
                            onChange={(e) => handleFilter(e)}
                        />
                        <MagnifyingGlass size={22} />
                    </div>
                    <Link to={'/novo-paciente'} className={styles.agendamento}>Novo Paciente</Link>
                </div>
            </div>
            <main>
                <table>
                    <thead>
                        <tr className={styles.titulo}>
                            <th>Paciente</th>
                            <th>Açôes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pacienteFiltrado.map((paciente, index) => (
                                <tr key={paciente.idpaciente}>
                                    <td>{paciente.nome}</td>
                                    <td>
                                        <Link to={`/calendario`} state={{ paciente }}>Agendar</Link> |
                                        <Link to={`/editar-paciente/${paciente.idpaciente}`}> Editar</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </div>
    )
}