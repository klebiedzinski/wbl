import { useParams } from "react-router-dom";
import styles from "./PlayerOverview.module.scss"
import useFetch from "../../hooks/useFetch";
const PlayerOverview = ({teams}) => {
    const {player_id} = useParams()
    console.log(player_id)

    const {data: player, isLoading, error} = useFetch('/players/' + player_id)
    return ( 
        <>
        {isLoading && <div>Loading...</div>}
        {player && <div className={styles.playerOverview}>
            <img src={player.player.picture} alt="" className={styles.playerImg} />
            <h5>{player.player.firstName}</h5>
            <h5>{player.player.lastName}</h5>
            <h5>Team: {player.player.teamName}</h5>
            <h5>Age: {player.player.yearOfBirth}</h5>
        </div>}
        </>
     );
}
 
export default PlayerOverview;