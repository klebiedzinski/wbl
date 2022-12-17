import { useParams } from "react-router-dom";
import styles from "./PlayerOverview.module.scss"
const PlayerDetails = ({teams}) => {
    const {player_id, name} = useParams()

    const targetTeam = teams.find(team => team.name === name)

    const targetPlayer = targetTeam.players.find(player => player.id === player_id)
    return ( 
        <div className={styles.playerOverview}>
            <img src={targetPlayer.image.src} alt="" className={styles.playerImg} />
            <h5>First name:{targetPlayer.firstName}</h5>
            <h5>Last name:{targetPlayer.lastName}</h5>
            <h5>Team: {name}</h5>
            <h5>Id: {targetPlayer.id}</h5>
            <h5>Age: {targetPlayer.age}</h5>
        </div>
     );
}
 
export default PlayerDetails;