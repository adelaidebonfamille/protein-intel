import styles from './Batch.module.css';
import { Link } from 'react-router-dom';

const Batch = () => {
   return (
       <div className={styles.container}>
            <Link to="/admin">
                <div className={styles["go-back-home"]}>Go back to Admin Homepage</div>
            </Link>
       </div>
   ); 
}

export default Batch;