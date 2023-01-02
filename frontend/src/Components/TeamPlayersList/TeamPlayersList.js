import { Link, useParams } from "react-router-dom"
import styles from "./TeamPlayersList.module.scss"
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import { usePlayersContext } from "../../hooks/contexts/usePlayersContext";
import { useEffect } from "react";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
const TeamPlayersList = () => {
    const {id} = useParams();

  // if players are in context use them, if not fetch them
    const {players: allPlayers, dispatch} = usePlayersContext();
    console.log(allPlayers)
    const {teams} = useTeamsContext();
    const team = teams && teams.find(team => team._id === id);
    let players = allPlayers && allPlayers.filter(player => player.teamName === team.name);

    const {data, isLoading, error} = useFetch(`/players/team/${id}`)

    useEffect(() => {
        console.log(players)
    if(data){
        console.log("siema")
        players = data.players;
    }
    }, [data])
            
    

    
    return ( 
        <>
        {isLoading &&  !players &&
        <ClipLoader
        loading={isLoading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="fuchsia"
        />
    }
        
       {players!==undefined &&
        <div className={styles.playersList}>
            <h1 className={styles.roster}></h1>
            <div className={styles.teamPlayers}>
                {players && players.map(player =>{
                    return (
                        <Link to={`/players/${player._id}`} className={styles.player} key={player._id}>
                            <img src={player.picture} alt="" className={styles.playerImg} />
                            <h5>{player.firstName}</h5>
                            <h5>{player.lastName}</h5>
                        </Link>
                    );
                })}
                <Link to={`/players/PlayerForm`} className={styles.player}>
                    <img src={"https://wbl.klebiedzinski.pl/photos/icons/plus-icon.png"} alt="" className={styles.playerImg} />
                    <h5>Add Player</h5>
                </Link>
            </div>
        </div>
        }
        </>
     );
}
 
export default TeamPlayersList;