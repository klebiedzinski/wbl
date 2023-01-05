import { Link } from "react-router-dom"
import styles from "./Games.module.scss"
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import { useGamesContext } from "../../hooks/contexts/useGamesContext";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
const Games = () => {
    
    const {user} = useAuthContext();
    const {games, dispatch} = useGamesContext();
    
    const {data, isLoading, error} = useFetch('/games')
    useEffect(() => {
        if(data){
            dispatch({type: 'SET_GAMES', payload: data.games})
        }
    }, [data])

    
    return ( 
        <>
         <h1>Games</h1>
         
        {isLoading && !games &&
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
                {games && games.map(game =>{
                    return (
                        <Link to={`/games/${game._id}`} className={styles.game} key={game._id}>
                            <img src={game.picture} alt="" className={styles.gameImg} />
                            <h5>{game.team1_id}</h5>
                            <h5>{game.team2_id}</h5>
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