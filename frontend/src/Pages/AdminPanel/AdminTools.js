import styles from './AdminPanel.module.scss';
import { RiSurveyLine } from 'react-icons/ri';
import { AiOutlineDownload } from 'react-icons/ai';
import axiosInstance from '../../config/axios_config';
import { converter } from '../../config/converter';
const AdminTools = () => {
    const handleClick = (raport) => {
        //grab the data from the backend attachment and save it as a file
        axiosInstance
            .get(`/reports/${raport}`)
            .then((res) => {
                converter(res.data.result, raport);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={styles.adminTools}>
            <div className={styles.adminToolsItem}>
                <h3>Ankiety</h3>
                <a href="https://docs.google.com/forms/u/2/?tgif=d">
                    <RiSurveyLine className={styles.icon} />
                </a>
            </div>
            <div className={styles.adminToolsItem}>
                <h3>Pobierz raport</h3>
                <div className={styles.report}>
                    Ilość użykowników kontrolujących zawodnika{' '}
                    <AiOutlineDownload
                        className={styles.icon}
                        onClick={() => handleClick('players')}
                    />
                </div>
                <div className={styles.report}>
                    Ilość użytkowników kontrolujących drużyne{' '}
                    <AiOutlineDownload
                        className={styles.icon}
                        onClick={() => handleClick('teams')}
                    />
                </div>
                <div className={styles.report}>
                    Ilość nowych użykowników w miesiącu{' '}
                    <AiOutlineDownload
                        className={styles.icon}
                        onClick={() => handleClick('users')}
                    />
                </div>
                <div className={styles.report}>
                    Ilość spotkań drużyny
                    <AiOutlineDownload
                        className={styles.icon}
                        onClick={() => handleClick('gamesInTeams')}
                    />
                </div>
                <div className={styles.report}>
                    Ilość zawodników w drużynach
                    <AiOutlineDownload
                        className={styles.icon}
                        onClick={() => handleClick('playersInTeams')}
                    />
                </div>
                <div className={styles.report}>
                    Ilość spotkań w miesiącu{' '}
                    <AiOutlineDownload
                        className={styles.icon}
                        onClick={() => handleClick('games')}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminTools;
