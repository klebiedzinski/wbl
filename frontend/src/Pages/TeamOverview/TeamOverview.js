import { Link, useParams } from "react-router-dom";
import PlayersList from "../../Components/PlayersList/PlayersList";
import styles from "./TeamOverview.module.scss"
import useFetch from "../../hooks/useFetch";
const TeamOverview = () => {
    const {id} = useParams()
    const {data: team, isLoading, error} = useFetch('/teams/' + id)
    
    return ( 
        <>
        <div className={styles.teamOverview}>
            <div className={styles.teamInfo}>
                <div className={styles.teamInfoHeader}>
                   {team ? <h1 className={styles.teamName}>Team {team.team.name}</h1> : <h1 className={styles.teamName}>Loading...</h1>}
                </div>
                <div className={styles.teamInfoContainer}>
                    <div className={styles.teamLogo}>
                        {team && <img src={team.team.logo} alt="" />}
                    </div>
                    <div className={styles.contact}>
                        <h1>Kontakt</h1>
                    </div>
                    <div className={styles.teamImage}>
                        Team pic
                    </div>
                    <div className={styles.editBtn}>
                        <Link to={`/teams/${id}/TeamForm`}>
                            <img src="https://wbl.klebiedzinski.pl/photos/icons/edit-icon.png" alt="" />
                        </Link>
                    </div>
                    <div className={styles.removeBtn}>
                        <img src="https://wbl.klebiedzinski.pl/photos/icons/remove-icon.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <PlayersList/>
        </>
     );
}
 
export default TeamOverview;