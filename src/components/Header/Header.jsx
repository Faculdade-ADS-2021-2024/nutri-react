import { useContext } from 'react';

import { AuthContext } from '../../context/auth';
import { SignOut } from "@phosphor-icons/react";

import styles from './Header.module.less';
import logo from '../../assets/logo2.svg';

export function Header() {

    const { logout } = useContext(AuthContext);
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    function handleLogout() {
        logout();
    }
    
    return (
        <div>
            <header className={styles.header}>
                <img src={logo} alt="Logo" />
                <div className={styles.user}>
                    <div className={styles.avatar}>{user.nome[0].toUpperCase()}</div>
                    <p>{user.nome}</p>
                    <button title='Sair' onClick={handleLogout}><SignOut size={22} /></button>
                </div>
            </header>
        </div>
    )
}