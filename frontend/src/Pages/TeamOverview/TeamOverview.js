import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import PlayersList from "../../Components/TeamPlayersList/TeamPlayersList";
import styles from "./TeamOverview.module.scss"
import useFetch from "../../hooks/useFetch";
import TeamEditModal from "../../Components/TeamEditModal/TeamEditModal";
const TeamOverview = () => {
    const {id} = useParams()
    const {data: team, isLoading, error} = useFetch('/teams/' + id)
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        <img src="https://wbl.klebiedzinski.pl/photos/icons/edit-icon.png" alt="" onClick={() => setIsModalOpen(true)}/>
                    </div>

                </div>
            </div>
        </div>
        {isModalOpen && 
        <TeamEditModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} team={team} id={id}/>
        }
        <PlayersList/>
        </>
     );
}
 
export default TeamOverview;