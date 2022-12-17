import { Link, useParams } from "react-router-dom"
import styles from "./PlayersList.module.scss"

const PlayersList = ({teams}) => {
    const {name} = useParams();
    const team = teams.find(team => team.name === name)
    return ( 
        <div className={styles.playersList}>
        <h1 className={styles.roster}>Roster - w zadaniu lab06 jako notesList</h1>
        <div className={styles.teamPlayers}>
            {team.players.map(player =>{
                return (
                    <Link to={`/teams/${team.name}/${player.id}`} className={styles.player} key={player.id}>
                        <img src={player.image.src} alt="" className={styles.playerImg} />
                        <h5>{player.firstName}</h5>
                        <h5>{player.lastName}</h5>
                    </Link>
                );
            })}
        </div>
        </div>
     );
}
 
export default PlayersList;