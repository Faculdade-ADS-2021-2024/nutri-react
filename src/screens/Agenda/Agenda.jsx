import { Link } from 'react-router-dom';

import { Header } from '../../components/Header/Header';
import styles from './Agenda.module.less';
import { getAgendamento } from '../../service/agendamento';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

export function Agenda() {

    const [agendaDoDia, setAgendaDoDia] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getAgendamento();
            if (response.status === 200) {
                setAgendaDoDia(response.data);
            }
        })();
    }, []);

    return (
        <div className={styles.agenda}>
            <Header />
            <div className={styles.menu}>
                <h3>Agenda do dia</h3>
                <Link to={'/agendamento'} className={styles.agendamento}>Agendar</Link>
            </div>
            <main>
                <table>
                    <thead>
                        <tr className={styles.titulo}>
                            <th>Horário</th>
                            <th>Paciente</th>
                            <th>Açôes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agendaDoDia.filter(obj => obj.start.split('T')[0] === moment(new Date).format().split('T')[0]).map((obj, index) => (
                                <tr key={index}>
                                    <td>{moment(obj.start).format('HH:mm')}</td>
                                    <td>{obj.nome}</td>
                                    <td><Link to="/anamnese" state={{ obj }}>Iniciar Atendimento</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </div>
    );
}