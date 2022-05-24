import { Link } from 'react-router-dom';
import styles from './Admin.module.css';

const Admin = () => {
    const onSubmitHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className={styles[ "login-container" ]}>
                <h1>admin login</h1>
                <form action="#" onSubmit={onSubmitHandler}>
                    <div classname={styles["input-field"]}>
                        <p>email</p>
                        <input
                        type="text"
                        placeholder="masukkan email"
                        name="email"
                        required
                        />
                    </div>
                    <div classname={styles["input-field"]}>
                        <p>password</p>
                        <input
                        type="password"
                        placeholder="masukkan password"
                        name="password"
                        required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`${styles["input-field"]} ${styles.button}`}
                    >
                        Login
                    </button>
                </form>
            </div>
            <div className={styles.container}>
                <Link to='problems'>            
                    <div className={styles[ "category-button" ]}>
                        Change / Delete Uploaded Problems
                    </div>
                </Link>
                <Link to='scores'>
                    <div className={styles[ "category-button" ]}>
                        See All User Score
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Admin;