import { useState, useContext } from 'react';

import { AuthContext } from '../../context/auth';
import styles from './Login.module.less';
import logo from '../../assets/logo.jpg';

export function Login() {

    const { login } = useContext(AuthContext);

    const [auth, setAuth] = useState({
        login: "",
        senha: ""
    });

    function handleChange(e) {
        setAuth({
            ...auth,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        login(auth);
    }

    return (
        <div className={styles.login}>
            <div className={styles.containerImage}>
                <img src={logo} alt="" />
            </div>
            <div className={styles.containerLogin}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.title}>
                        <h2>Login</h2>
                        <p>Faça seu login para acessar o sistema</p>
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="login">Usuário</label>
                        <input 
                            type="text" 
                            id='login'
                            name='login'
                            placeholder='Digite seu Usuário'
                            value={auth.login}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={styles["input-container"]}>
                    <label htmlFor="senha">Senha</label>
                        <input 
                            type="password" 
                            id='senha'
                            name='senha'
                            placeholder='Digite sua Senha'
                            value={auth.senha}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={styles["control-container"]}>
                        <button>Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}