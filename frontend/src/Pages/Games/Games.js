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
                {games && teams && games.map(game =>{
                    const team1 = teams.find(team => team._id === game.team1_id);
                    const team2 = teams.find(team => team._id === game.team2_id);
                    return (
                        <Link to={`/games/${game._id}`} key={game._id}>
                            <div className={styles.game}>
                                <div className={styles.game_leftbar}>
                                    {game.date.split('T')[0]}
                                </div>
                                <div className={styles.game_main}>
                                    <div className={styles.team}>
                                        <p>{team1.name}</p>
                                        <img src={team1.logo} alt={team1.name}/>
                                    </div>
                                    <div className={styles.score}>
                                        <p>{game.team1Score} </p>
                                        <p> - </p>
                                        <p>{game.team2Score} </p>
                                    </div>
                                    <div className={styles.team}>
                                        <img src={team2.logo} alt={team2.name}/>
                                        <p>{team2.name}</p>
                                    </div>
                                </div>
                                <div className={styles.game_rightbar}>
                                    guziczek
                                </div>
                            </div>
                                
                        </Link>
                    );
                })}
        </div>
        }
        </>
     );
}
 
export default Games;