import styles from './Modal.module.less';

export function Modal({ children, isOpen }) {
    return (
        isOpen && (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        ));
}