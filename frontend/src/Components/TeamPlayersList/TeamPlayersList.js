import { Link, useParams } from "react-router-dom"
import styles from "./TeamPlayersList.module.scss"
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
const TeamPlayersList = () => {
    const {id} = useParams();
    
    const {data: players, isLoading, error} = useFetch('/players/team/' + id)

    return ( 
        <>
            {isLoading &&  <ClipLoader
                    loading={isLoading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    color="fuchsia"
                />
                }
       { players &&<div className={styles.playersList}>
            <h1 className={styles.roster}></h1>
            <div className={styles.teamPlayers}>
                {players && players.players.map(player =>{
                    return (
                        <Link to={`/teams/${id}/${player._id}`} className={styles.player} key={player._id}>
                            <img src={player.picture} alt="" className={styles.playerImg} />
                            <h5>{player.firstName}</h5>
                            <h5>{player.lastName}</h5>
                        </Link>
                    );
                })}
                <Link to={`/teams/${id}/PlayerForm`} className={styles.player}>
                            <img src={"https://wbl.klebiedzinski.pl/photos/icons/plus-icon.png"} alt="" className={styles.playerImg} />
                            <h5>Add Player</h5>
                </Link>
            </div>
        </div>}
        </>
     );
}
 
export default TeamPlayersList;