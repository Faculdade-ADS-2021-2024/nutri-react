import { useState, useCallback, useEffect } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone'

import { Header } from '../../components/Header/Header';
import styles from './Calendario.module.less';

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal } from '../../components/Modal/Modal';
import { X } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';
import { createAgendamento, getAgendamento } from '../../service/agendamento';

moment.tz.setDefault('America/Araguaina');

const localizer = momentLocalizer(moment);

export function Calendario() {

    const messages = {
        allDay: 'Dia inteiro',
        previous: 'Anterior',
        next: 'Próximo',
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
    }

    let { state } = useLocation();

    const [myEvents, setEvents] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [agendamento, setAgendamento] = useState({
        paciente_id: '',
        inicio_consulta: '',
        fim_consulta: '',
        observacoes: '',
        title: ''
    });

    useEffect(() => {
        (async () => {
            const response = await getAgendamento();
            console.log(response)
            if (response.status === 200) {
                setEvents(response.data);
            }
        })();
    }, []);

    function evntos() {
        let events = [];

        myEvents.forEach(event => {
            events.push({
                start: new Date(event.start),
                end: new Date(event.end),
                title: event.title
            })
        })

        return events;
    }

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            console.log(start)
            setIsOpen(!isOpen);
            const id = state.paciente.idpaciente;
            // const data = start.toLocaleString().split(', ');
            // const dia = data[0].split('/')[0];
            // const mes = data[0].split('/')[1];
            // const ano = data[0].split('/')[2];
            // const dataFormatada = ano + '-' + mes + '-' + dia;
            // console.log(myEvents)
            setAgendamento({
                paciente_id: state.paciente.idpaciente || id,
                start: moment(start).format(),
                end: moment(end).format(),
                title: 'teste',
                observacoes: agendamento.observacoes
            });
        }, []);

    const handleSelectEvent = useCallback(
        (event) => {
            window.alert(event.title)
            setAgendamento({
                paciente_id: state.paciente.idpaciente || id,
                start: moment(event.start).format(),
                end: moment(event.end).format(),
                title: "by ari",
                observacoes: agendamento.observacoes
            })
        }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setAgendamento({ ...agendamento, [name]: value });
    }

    async function submit(e) {
        e.preventDefault();
        console.log(agendamento);
        try {
            const response = await createAgendamento(agendamento);
            // if (response.status === 200) {
            console.log(response)
            // }
        } catch (error) {

        }
    }

    return (
        <div className={styles.calendario}>

            <Modal isOpen={isOpen}>
                <div>
                    <div className={styles.headerModal}>
                        <h2>Paciente</h2>
                        <button onClick={() => setIsOpen(!isOpen)}><X size={24} /></button>
                    </div>
                    <form>
                        <div className={styles['input-container']}>
                            <label htmlFor='nome'>Nome</label>
                            <input
                                type="text"
                                name='nome'
                                id='nome'
                                placeholder='Digite o nome do Paciente'
                                value={state.paciente.nome}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className={styles.horario}>
                            <div className={styles['input-container']}>
                                <label htmlFor='inicio_consulta'>Data da consulta</label>
                                <input
                                    type="date"
                                    name='inicio_consulta'
                                    id='inicio_consulta'
                                    placeholder='Digite a data da consulta'
                                    value={agendamento.inicio_consulta}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={styles['input-container']}>
                                <label htmlFor='fim_consulta'>Hora da consulta</label>
                                <input
                                    type="time"
                                    name='fim_consulta'
                                    id='fim_consulta'
                                    placeholder='Digite a hora da consulta'
                                    value={agendamento.fim_consulta}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className={styles['input-container']}>
                            <label>Observações</label>
                            <textarea
                                name='observacoes'
                                id='observacoes'
                                placeholder='Digite as observações'
                                value={agendamento.observacoes}
                                onChange={(e) => handleChange(e)}
                                maxLength={500}
                            />
                        </div>
                    </form>
                    <div className={styles['control-container']}>
                        <button onClick={submit}>salvar</button>
                        <button>editar</button>
                        <button>cancelar</button>
                        <button>cancelar agendamento</button>
                    </div>
                </div>
            </Modal>

            <Header />
            <div className={styles.menu}>
                <h3>Calendario</h3>
            </div>
            <Calendar
                localizer={localizer}
                messages={messages}
                defaultDate={new Date()}
                defaultView={['week']}
                startAccessor="start"
                endAccessor="end"
                timeslots={2}
                events={evntos()}
                min={moment('07:00', 'HH:mm').toDate()}
                max={moment('22:00', 'HH:mm').toDate()}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                style={{ height: "72vh" }}
            />
        </div>
    );
}