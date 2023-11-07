import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './Paciente.module.less';
import { createPaciente, getPacienteId, updatePaciente } from '../../service/paciente';
import { useNavigate } from 'react-router-dom';

export function Paciente() {

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getPaciente(id);
    }, []);

    const [paciente, setPaciente] = useState({
        nome: "",
        telefone: "",
        email: ""
    });

    function initialState() {
        setPaciente({
            nome: "",
            telefone: "",
            email: ""
        });
    }

    async function getPaciente(id) {
        try {
            if (id) {
                const response = (await getPacienteId(id)).data;
                setPaciente(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(e) {
        setPaciente({
            ...paciente,
            [e.target.name]: e.target.value
        });
    }

    async function submit(e) {
        e.preventDefault();

        try {

            if (id) {
                const response = await updatePaciente(id, paciente);
                if (response.status === 204) {
                    initialState();
                    alert("Paciente atualizado com sucesso!");
                    navigate('/agendamento');
                }
            }

            if (!id) {
                const response = await createPaciente(paciente);
                if (response.status === 201) {
                    initialState();
                    alert("Paciente cadastrado com sucesso!");
                    navigate('/agendamento');
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.paciente}>
            <Header />
            <div className={styles.menu}>
                <h3>Novo Paciente</h3>
            </div>
            <main>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={paciente.nome}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="text"
                        name="telefone"
                        placeholder="Telefone"
                        value={paciente.telefone}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        value={paciente.email}
                        onChange={(e) => handleChange(e)}
                    />
                    <div className={styles["control-container"]}>
                        <button className={styles.limpar} onClick={initialState}>Limpar</button>
                        <button type='submit' className={styles.cadastrar}>Salvar</button>
                    </div>
                </form>
            </main>
        </div>
    );
}