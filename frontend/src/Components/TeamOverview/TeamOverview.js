import { Link, useParams } from "react-router-dom";
import PlayerForm from "../PlayerForm";
import PlayersList from "../PlayersList/PlayersList";
import styles from "./TeamOverview.module.scss"
const TeamOverview = ({teams, setTeams}) => {
    const {name} = useParams()
    const targetTeam = teams.find(el => el.name===name)
    return ( 
        <>
        <div className={styles.teamOverview}>
            <div className={styles.teamInfo}>
                <div className={styles.teamInfoHeader}>
                    <h1 className={styles.teamName}>Team {targetTeam.name}</h1>
                </div>
                <div className={styles.teamInfoContainer}>
                    <div className={styles.teamLogo}>
                        <img src={targetTeam.image.src} alt="" />
                    </div>
                    <div className={styles.contact}>
                        <h1>Kontakt</h1>
                    </div>
                    <div className={styles.teamImage}>
                        Team pic
                    </div>
                </div>
            </div>
            <PlayersList teams={teams}/>
            <Link to={`/teams/${targetTeam.name}/PlayerForm`}>Add player</Link>
            <Link to={`/teams/${targetTeam.name}/PlayersList`}>Players</Link>
        </div>
        </>
     );
}
 
export default TeamOverview;