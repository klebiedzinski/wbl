import styles from './SignupRequestsModal.module.scss';
import { AiFillEdit, AiFillDelete, AiOutlineCheck, AiFillCloseCircle } from "react-icons/ai";
const SignupRequestsModal = ({setRequestsOpen}) => {
    return ( 
        <div className={styles.overlayStyle}>
            <div className={styles.SignupRequestsModal}>
                <h1>Signup Requests</h1>
                <AiFillCloseCircle onClick={() => setRequestsOpen(false)}/>
                <div className={styles.requests}>
                    Requests
                </div>
            </div>
        </div>
                        
     );
}
 
export default SignupRequestsModal;