import styles from './AdminPanel.module.scss';
import {RiSurveyLine} from 'react-icons/ri';
import {AiOutlineDownload} from 'react-icons/ai';
import axiosInstance from '../../config/axios_config';
import {saveAs} from 'file-saver';
const AdminTools = () => {
    const handleClick = () => {
        axiosInstance.get('/report', { responseType: 'blob' })
        .then(res => {
            const csvBlob = new Blob([res.data], { type: 'application/csv' });
            const currentDate = new Date().toLocaleDateString();
            saveAs(csvBlob, `wbl_raport_${currentDate}.csv`);
        })
        .catch(err => console.log(err))
    }
    return ( 
        <div className={styles.adminTools}>
            <div className={styles.adminToolsItem} >
                <h3>Ankiety</h3>
                <a href="https://docs.google.com/forms/u/2/?tgif=d">
                <RiSurveyLine className={styles.icon} />
                </a>
            </div>
            <div className={styles.adminToolsItem}>
                <h3>Pobierz raport</h3>
                <AiOutlineDownload className={styles.icon} onClick={handleClick}/>
            </div>
            

        </div>
     );
}
 
export default AdminTools;