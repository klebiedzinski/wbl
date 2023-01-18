import { Link, useParams } from "react-router-dom"
import styles from "./Players.module.scss"
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import { usePlayersContext } from "../../hooks/contexts/usePlayersContext";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
const TeamPlayersList = () => {
    
    const {user} = useAuthContext();
    const {players, dispatch} = usePlayersContext();
    const {data, isLoading, error} = useFetch('/players')
    const {data: teamData, isLoading: teamIsLoading, error: teamError} = useFetch(`/teams/`)
    const {teams, dispatch: teamDispatch} = useTeamsContext();
    useEffect(() => {
        if(data && teamData){
            dispatch({type: 'SET_PLAYERS', payload: data.players})
            teamDispatch({type: 'SET_TEAMS', payload: teamData.teams})
        }
    }, [data,teamData])



    
    return ( 
        <>
         <h1 className={styles.header}>Zawodnicy</h1>
         
        {isLoading && !players && !teams &&
         <ClipLoader
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        }
        {players && teams &&
        <div className={styles.playersList}>
            <h1 className={styles.roster}></h1>
            <div className={styles.teamPlayers}>
            {user && user.admin && 
                    <Link to={`/players/PlayerForm`} className={styles.player}>
                        <div className={styles.playerImg}>
                            <img src={"https://wbl.klebiedzinski.pl/photos/icons/plus-icon.png"} alt="" className={styles.playerImg} />
                        </div>
                        <h5>Add Player</h5>
                    </Link>
                }
                {players && teams && players.map(player =>{
                    const team = teams.find(team => team._id === player.team_id)
                    return (
                        <Link to={`/players/${player._id}`} className={styles.player} key={player._id}>
                            <div className={styles.playerImg}>
                            <img src={player.picture} alt=""  />
                            </div>
                            <div>
                                <h5>{player.firstName}</h5>
                                <h5>{player.lastName}</h5>
                            </div>
                            <img src={team.logo} alt="" className={styles.teamImg} />
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