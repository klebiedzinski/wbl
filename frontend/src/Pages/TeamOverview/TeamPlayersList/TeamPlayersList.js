import { Link, useParams } from "react-router-dom";
import styles from "./TeamPlayersList.module.scss";
import useFetch from "../../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import { usePlayersContext } from "../../../hooks/contexts/usePlayersContext";
import { useTeamsContext } from "../../../hooks/contexts/useTeamsContext";
import { useAuthContext } from "../../../hooks/contexts/useAuthContext";

const TeamPlayersList = () => {
    const {id} = useParams();
    const {user} = useAuthContext();
    const {players: allPlayers, dispatch} = usePlayersContext();
    const {teams} = useTeamsContext();
    const team = teams && teams.find(team => team._id === id);
    const {data: playersData, isLoading} = useFetch(`/players/team/${id}`)
    const playersFromContext = allPlayers && allPlayers.filter(player => player.team_id === team._id);
    const players = playersData ? playersData.players : playersFromContext;



    
    return ( 
        <>
        {isLoading && !players &&
        <ClipLoader
        loading={isLoading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="fuchsia"
        />
    }
        
       {players && 
        <div className={styles.playersList}>
            <h1 className={styles.roster}>Skład</h1>
            <div className={styles.teamPlayers}>
            {user && user.admin && 
                    <Link to={`/players/PlayerForm`} className={styles.player}>
                        <img src={"https://wbl.klebiedzinski.pl/photos/icons/plus-icon.png"} alt="" className={styles.playerImg} />
                        <h5>Add Player</h5>
                    </Link>
                }
                {players && players.map(player =>{
                    return (
                        <Link to={`/players/${player._id}`} className={styles.player} key={player._id}>
                            <img src={player.picture} alt="" className={styles.playerImg} />
                            <h5>{player.firstName}</h5>
                            <h5>{player.lastName}</h5>
                        </Link>
                    );
                })}
            </div>
        </div>
        }
        </>
     );
}
 
export default TeamPlayersList;