import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { X } from '@phosphor-icons/react';
import { createAnamnese, getAnamneseId, getAnamnesePorPacienteId } from '../../service/anamnese';
import { Header } from '../../components/Header/Header';
import { Modal } from '../../components/Modal/Modal';

import styles from './Anamnese.module.less';
import moment from 'moment-timezone';

export function Anamnese() {

    let { state } = useLocation();
    const navigate = useNavigate();

    console.log(state)

    const [foiaonutri, setFoiAoNutri] = useState(false);
    const [fuma, setFuma] = useState(false);
    const [bebe, setBebe] = useState(false);
    const [doencaFamilia, setDoencaFamilia] = useState(false);
    const [trabalha, setTrabalha] = useState(false);
    const [anamnese, setAnamnese] = useState({
        paciente_id: state.obj.paciente_id,
        data_consulta: new Date,
        objetivo_consulta: '',
        foi_nutricionista: foiaonutri,
        experiencia_anterior: '',
        doenca_cronica: '',
        pais_irmaos_doenca_cronica: doencaFamilia,
        cirurgia_recente: '',
        data_cirurgia: '',
        uso_medicamento_suplemento: '',
        quem_receitou: '',
        fuma: fuma,
        bebe: bebe,
        desconforto_frequente: '',
        exames_laboratoriais: '',
        alergia_alimento: '',
        intolerancia_alimento: '',
        estado_cabelos: '',
        estado_olhos: '',
        estado_unhas: '',
        ingestao_agua: '',
        urina_frequente: '',
        evacuacao_diaria: '',
        atividade_fisica: '',
        tipo_atividade: '',
        frequencia_atividade: '',
        horario_atividade: '',
        intensidade_atividade: '',
        trabalha: trabalha,
        profissao: '',
        dias_trabalho: '',
        horario_trabalho: '',
        hora_sono: '',
        orientacoes: ''
    });
    const [anamneseAnteriores, setAnamneseAnteriores] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [anamneseModal, setAnamneseModal] = useState(null);

    useEffect(() => {
        anamneseAnterior(state.obj.paciente_id);
    }, []);

    async function anamneseAnterior(paciente_id) {
        try {
            const response = await getAnamnesePorPacienteId(paciente_id);

            if (response.status === 200) {
                setAnamneseAnteriores(response.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setAnamnese(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function submit() {
        console.log(anamnese)

        const response = await createAnamnese(anamnese);
        console.log(response);
    }

    function onCancel() {
        setAnamnese({
            paciente_id: '',
            data_consulta: '',
            objetivo_consulta: '',
            foi_nutricionista: foiaonutri,
            experiencia_anterior: '',
            doenca_cronica: '',
            pais_irmaos_doenca_cronica: doencaFamilia,
            cirurgia_recente: '',
            data_cirurgia: '',
            uso_medicamento_suplemento: '',
            quem_receitou: '',
            fuma: fuma,
            bebe: bebe,
            desconforto_frequente: '',
            exames_laboratoriais: '',
            alergia_alimento: '',
            intolerancia_alimento: '',
            estado_cabelos: '',
            estado_olhos: '',
            estado_unhas: '',
            ingestao_agua: '',
            urina_frequente: '',
            evacuacao_diaria: '',
            atividade_fisica: '',
            tipo_atividade: '',
            frequencia_atividade: '',
            horario_atividade: '',
            intensidade_atividade: '',
            trabalha: trabalha,
            profissao: '',
            dias_trabalho: '',
            horario_trabalho: '',
            hora_sono: '',
            orientacoes: ''
        });
        navigate('/agenda');
    }

    async function modalAnamnese(id) {
        setIsOpen(true);

        try {
            const response = await getAnamneseId(id);

            // if (response.status === 200) {
            setAnamneseModal(response.data);
            console.log(response.data);
            // }
        } catch (error) {
            console.log(error);
        }
    }

    async function copy(text) {
        try {
            await navigator.clipboard.writeText(text)
            console.log(text)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.anamnese}>

            <Modal isOpen={isOpen}>
                <div className={styles.headerModal}>
                    <h2>Paciente</h2>
                    <button onClick={() => setIsOpen(!isOpen)}><X size={24} /></button>
                </div>
                <div>
                    {
                        anamneseModal && (
                            <div>
                                <div><p>Anamnese id : {anamneseModal[0].idanamnese}</p><button onClick={copy(anamneseModal[0].idanamnese)}>copiar</button></div>
                                <div><p>Alergia alimento : {anamneseModal[0].alergia_alimento}</p><button onClick={copy(anamneseModal[0].alergia_alimento)}>copiar</button></div>
                                <div><p>Atividade fisica : {anamneseModal[0].atividade_fisica}</p><button onClick={copy(anamneseModal[0].atividade_fisica)}>copiar</button></div>
                                <div><p>Cirurgia recente : {anamneseModal[0].cirurgia_recente}</p><button onClick={copy(anamneseModal[0].cirurgia_recente)}>copiar</button></div>
                                <div><p>Consome alcool : {anamneseModal[0].consome_alcool}</p><button onClick={copy(anamneseModal[0].consome_alcool)}>copiar</button></div>
                                <div><p>Desconforto frequente : {anamneseModal[0].desconforto_frequente}</p><button onClick={copy(anamneseModal[0].desconforto_frequente)}>copiar</button></div>
                                <div><p>Dias trabalho : {anamneseModal[0].dias_trabalho}</p><button onClick={copy(anamneseModal[0].dias_trabalho)}>copiar</button></div>
                                <div><p>Doenca cronica : {anamneseModal[0].doenca_cronica}</p><button onClick={copy(anamneseModal[0].doenca_cronica)}>copiar</button></div>
                                <div><p>Estado cabelo : {anamneseModal[0].estado_cabelos}</p><button onClick={copy(anamneseModal[0].estado_cabelos)}>copiar</button></div>
                                <div><p>Estado olhos : {anamneseModal[0].estado_olhos}</p><button onClick={copy(anamneseModal[0].estado_olhos)}>copiar</button></div>
                            </div>
                        )}
                </div>
            </Modal>

            <Header />
            <div className={styles.menu}>
                <h3>Anamnese</h3>
            </div>
            <main>
                <div className={styles.anamneseAnteriores}>
                    <div>
                        <h3>Atendimento anteriores</h3>
                        <hr />
                        <div className={styles.anamneseAnteriorList}>
                            {
                                anamneseAnteriores != null && anamneseAnteriores.map((anamnese, index) => (
                                    <div key={index}>
                                        <button onClick={() => modalAnamnese(anamnese.idanamnese)}>{moment(anamnese.data_consulta).format('DD/MM/YYYY')}</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.anamneseDoDia}>
                    <div>
                        <div className={styles.header}>
                            <h3>Anamnese do dia</h3>
                            <strong>Paciente:</strong><span>{state.obj.nome}</span>
                            <strong>Data Consulta:</strong><span>{moment(state.obj.start).format('DD/MM/YYYY')}</span>
                            <hr />
                        </div>
                        <form>
                            <div className={`${styles["input-container"]} ${styles.objetivo}`}>
                                <label htmlFor="objetivo_consulta">Objetivo da Consulta</label>
                                <textarea
                                    name="objetivo_consulta"
                                    id="objetivo_consulta"
                                    placeholder='Digite o objetivo da consulta'
                                    value={anamnese.objetivo_consulta}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.foiaonutri}`}>
                                <label htmlFor="foiaonutri">Já foi ao nutricionista?</label>
                                <input
                                    type="checkbox"
                                    name="foiaonutri"
                                    id="foiaonutri"
                                    value={foiaonutri}
                                    onChange={() => setFoiAoNutri(!foiaonutri)}
                                />
                            </div>
                            {
                                foiaonutri && (
                                    <div className={`${styles["input-container"]} ${styles.teste}`}>
                                        <label htmlFor="experiencia_anterior">Experiencia anterior</label>
                                        <textarea
                                            name="experiencia_anterior"
                                            id="experiencia_anterior"
                                            placeholder='Como foi a experiencia anterior'
                                            value={anamnese.experiencia_anterior}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                )
                            }
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="doenca_cronica">Possui doença Cronica</label>
                                <input
                                    type="text"
                                    name="doenca_cronica"
                                    id="doenca_cronica"
                                    placeholder='Qual a doença cronica'
                                    value={anamnese.doenca_cronica}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.doencaFamilia}`}>
                                <label htmlFor="pais_irmaos_doenca_cronica">Doença cronica na familia?</label>
                                <input
                                    type='checkbox'
                                    name="pais_irmaos_doenca_cronica"
                                    id="pais_irmaos_doenca_cronica"
                                    value={doencaFamilia}
                                    onChange={() => setDoencaFamilia()}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="cirurgia_recente">Fez cirurgia recente?</label>
                                <input
                                    type="text"
                                    name="cirurgia_recente"
                                    id="cirurgia_recente"
                                    placeholder='Fez cirurgia recente?'
                                    value={anamnese.cirurgia_recente}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="data_cirurgia">Data da Cirurgia</label>
                                <input
                                    type="date"
                                    name="data_cirurgia"
                                    id="data_cirurgia"
                                    placeholder='Data da cirurgia'
                                    value={anamnese.data_cirurgia}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="uso_medicamento_suplemento">Usa medicamento ou suplemento?</label>
                                <textarea
                                    name="uso_medicamento_suplemento"
                                    id="uso_medicamento_suplemento"
                                    placeholder='Nome da medicação ou suplemento'
                                    value={anamnese.uso_medicamento_suplemento}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="quem_receitou">Quem receitou?</label>
                                <input
                                    type="text"
                                    name="quem_receitou"
                                    id="quem_receitou"
                                    placeholder='Quem receitou?'
                                    value={anamnese.quem_receitou}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.fuma}`}>
                                <label htmlFor="fuma">Fuma?</label>
                                <input
                                    type="checkbox"
                                    name="fuma"
                                    id="fuma"
                                    value={fuma}
                                    onChange={() => setFuma(!fuma)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.bebe}`}>
                                <label htmlFor="bebe">Bebida alcolica?</label>
                                <input
                                    type="checkbox"
                                    name="bebe"
                                    id="bebe"
                                    value={bebe}
                                    onChange={() => setBebe(!bebe)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="desconforto_frequente">Sente desconforto frequente?</label>
                                <input
                                    type="text"
                                    name="desconforto_frequente"
                                    id="desconforto_frequente"
                                    placeholder='Sente desconforto frequente?'
                                    value={anamnese.desconforto_frequente}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="exames_laboratoriais">Exames Laboratoriais</label>
                                <textarea
                                    name="exames_laboratoriais"
                                    id="exames_laboratoriais"
                                    placeholder='Exames Laboratoriais'
                                    value={anamnese.exames_laboratoriais}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="alergia_alimento">Tem alergia a algum aliemnto?</label>
                                <input
                                    type="text"
                                    name="alergia_alimento"
                                    id="alergia_alimento"
                                    placeholder='Tem alergia a algum aliemnto?'
                                    value={anamnese.alergia_alimento}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="intolerancia_alimento">Intolerancia Alimentar?</label>
                                <input
                                    type="text"
                                    name="intolerancia_alimento"
                                    id="intolerancia_alimento"
                                    placeholder='Intolerancia Alimentar?'
                                    value={anamnese.intolerancia_alimento}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="estado_cabelos">Estado dos cabelos</label>
                                <input
                                    type="text"
                                    name="estado_cabelos"
                                    id="estado_cabelos"
                                    placeholder='Estado dos cabelos'
                                    value={anamnese.estado_cabelos}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="estado_unhas">Estado das unhas</label>
                                <input
                                    type="text"
                                    name="estado_unhas"
                                    id="estado_unhas"
                                    placeholder='Estado das unhas'
                                    value={anamnese.estado_unhas}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="estado_olhos">Estado dos olhos</label>
                                <input
                                    type="text"
                                    name="estado_olhos"
                                    id="estado_olhos"
                                    placeholder='Estado dos olhos'
                                    value={anamnese.estado_olhos}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="ingestao_agua">Ingestão de agua</label>
                                <input
                                    type="text"
                                    name="ingestao_agua"
                                    id="ingestao_agua"
                                    placeholder='Ingestão de agua'
                                    value={anamnese.ingestao_agua}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="urina_frequente">Frequencia da urina</label>
                                <input
                                    type="text"
                                    name="urina_frequente"
                                    id="urina_frequente"
                                    placeholder='Frequencia da urina'
                                    value={anamnese.urina_frequente}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="evacuacao_diaria">Evacuação diaria</label>
                                <input
                                    type="text"
                                    name="evacuacao_diaria"
                                    id="evacuacao_diaria"
                                    placeholder='Evacuação diaria'
                                    value={anamnese.evacuacao_diaria}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="atividade_fisica">Pratica atividade fisica?</label>
                                <input
                                    type="text"
                                    name="atividade_fisica"
                                    id="atividade_fisica"
                                    placeholder='Atividade Fisica'
                                    value={anamnese.atividade_fisica}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="tipo_atividade">Tipo de atividade</label>
                                <input
                                    type="text"
                                    name="tipo_atividade"
                                    id="tipo_atividade"
                                    placeholder='Tipo de atividade'
                                    value={anamnese.tipo_atividade}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="frequencia_atividade">Frequencia da atividade</label>
                                <input
                                    type="text"
                                    name="frequencia_atividade"
                                    id="frequencia_atividade"
                                    placeholder='Frequencia da atividade'
                                    value={anamnese.frequencia_atividade}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="horario_atividade">Horario da atividade</label>
                                <input
                                    type="text"
                                    name="horario_atividade"
                                    id="horario_atividade"
                                    placeholder='Horario da atividade'
                                    value={anamnese.horario_atividade}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="intensidade_atividade">Intensidade da atividade</label>
                                <input
                                    type="text"
                                    name="intensidade_atividade"
                                    id="intensidade_atividade"
                                    placeholder='Intensidade da atividade'
                                    value={anamnese.intensidade_atividade}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.trabalha}`}>
                                <label htmlFor="trabalha">Trabalha?</label>
                                <input
                                    type="checkbox"
                                    name="trabalha"
                                    id="trabalha"
                                    value={trabalha}
                                    onChange={() => setTrabalha(!trabalha)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="profissao">Profissão</label>
                                <input
                                    type="text"
                                    name="profissao"
                                    id="profissao"
                                    placeholder='Profissão'
                                    value={anamnese.profissao}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="dias_trabalho">Dias de trabalho</label>
                                <input
                                    type="text"
                                    name="dias_trabalho"
                                    id="dias_trabalho"
                                    placeholder='Dias de trabalho'
                                    value={anamnese.dias_trabalho}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="horario_trabalho">Horario de trabalho</label>
                                <input
                                    type="text"
                                    name="horario_trabalho"
                                    id="horario_trabalho"
                                    placeholder='Horario de trabalho'
                                    value={anamnese.horario_trabalho}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="hora_sono">Horario de sono</label>
                                <input
                                    type="text"
                                    name="hora_sono"
                                    id="hora_sono"
                                    placeholder='Horario de sono'
                                    value={anamnese.hora_sono}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className={`${styles["input-container"]} ${styles.teste}`}>
                                <label htmlFor="orientacoes">Orientações</label>
                                <textarea
                                    name="orientacoes"
                                    id="orientacoes"
                                    placeholder='Orientações'
                                    value={anamnese.orientacoes}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </form>
                    </div>
                    <footer>
                        <hr />
                        <div className={styles['control-container']}>
                            <button onClick={submit} className={styles.salvar}>Salvar</button>
                            <button onClick={onCancel} className={styles.cancelar}>Cancelar</button>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}