import { Link } from "react-router-dom"
import styles from "./Games.module.scss"
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import { useGamesContext } from "../../hooks/contexts/useGamesContext";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
const Games = () => {
    
    const {user} = useAuthContext();
    const {teams: teamsFromContext} = useTeamsContext();
    const {data: teamsData} = useFetch('/teams')
    const teams = teamsData ? teamsData.teams : teamsFromContext;

    const {games: gamesFromContext, dispatch} = useGamesContext();
    const {data, isLoading, error} = useFetch('/games')
    const games = data ? data.games : gamesFromContext;
    useEffect(() => {
        if(data){
            dispatch({type: 'SET_GAMES', payload: data.games})
        }
    }, [data])

    
    return ( 
        <>
         <h1>Games</h1>
         
        {isLoading && (!games || !teams) &&
         <ClipLoader
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        }
        {games && 
        <div className={styles.gamesList}>
            <h1 className={styles.roster}></h1>
            <div className={styles.teamgames}>
            {user && user.admin && 
                    <Link to={`/games/gameForm`} className={styles.game}>
                        <img src={"https://wbl.klebiedzinski.pl/photos/icons/plus-icon.png"} alt="" className={styles.gameImg} />
                        <h5>Add game</h5>
                    </Link>
                }
                {games && teams && games.map(game =>{
                    const team1 = teams.find(team => team._id === game.team1_id);
                    const team2 = teams.find(team => team._id === game.team2_id);
                    return (
                        <Link to={`/games/${game._id}`} className={styles.game} key={game._id}>
                            <div className={styles.team}>
                                {team1.name}
                                {team2.name}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
        }
        </>
     );
}
 
export default Games;