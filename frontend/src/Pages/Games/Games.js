import { Link } from "react-router-dom"
import styles from "./Games.module.scss"
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import { useGamesContext } from "../../hooks/contexts/useGamesContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
import { AiFillEdit, AiFillDelete, AiOutlineCheck, AiFillCloseCircle } from "react-icons/ai";
import GameEditFormModal from "../../Components/Modals/GameEditFormModal/GameEditFormModal";
import axios from "axios";
import axiosInstance from "../../config/axios_config";

const Games = () => {
    
    const {user} = useAuthContext();
    const {teams: teamsFromContext} = useTeamsContext();
    const {data: teamsData} = useFetch('/teams')
    const teams = teamsData ? teamsData.teams : teamsFromContext;

    const {games: gamesFromContext, dispatch} = useGamesContext();
    const {data, isLoading, error} = useFetch('/games')
    const games = gamesFromContext ? gamesFromContext : data ? data.games : null;
    useEffect(() => {
        if(data){
            dispatch({type: 'SET_GAMES', payload: data.games})
        }
    }, [data])

    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const handleDelete = (id) => {
        axiosInstance.delete(`/games/${id}`,{headers: {'Authorization': `Bearer ${user.token}`}})
        .then(res => {
            dispatch({type: 'DELETE_GAME', payload: id})
            setDeleteConfirmation(false)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
  
    
    return ( 
        <>
         <h1 className={styles.header}>Games </h1>
        
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
                        
                            <div className={styles.game} key={game._id}>
                                <div className={styles.game_leftbar}>
                                    <p>{game.date.split('T')[0]}</p>
                                    <p>{game.location}</p>
                                </div>
                                <div className={styles.game_main}>
                                    <div className={styles.team1}>
                                        <p>{team1.name}</p>
                                        <img className={styles.teamImg} src={team1.logo} alt={team1.name}/>
                                    </div>
                                    <div className={styles.score}>
                                        <p>{game.team1Score}</p>
                                        <p>:</p>
                                        <p>{game.team2Score}</p>
                                    </div>
                                    <div className={styles.team2}>
                                        <img className={styles.teamImg} src={team2.logo} alt={team2.name}/>
                                        <p>{team2.name}</p>
                                    </div>
                                </div>
                                <div className={styles.game_rightbar}>
                                {user && user.admin &&
                                <>
                                    <div className={styles.editBtn} onClick={() => setIsModalOpen(true)}>
                                        <AiFillEdit/> 
                                    </div>
                                   { !deleteConfirmation ? 
                                    <div className={styles.deleteBtn} onClick={() => setDeleteConfirmation(true)}>
                                        <AiFillDelete/> 
                                    </div>
                                    :
                                    <div className={styles.deleteBtn}>
                                        <AiFillCloseCircle onClick={() => setDeleteConfirmation(false)}/>
                                        <p style={{fontSize: "1rem"}}>You sure?</p> 
                                        <button onClick={() => handleDelete(game._id)}> USUŃ</button>
                                    </div>
                                    }

                                </>
                                }
                                    <button className={styles.details}>
                                        <Link to={`/games/${game._id}`} key={game._id}>Więcej</Link>
                                    </button>
                                </div>
                                {isModalOpen &&
                                    <GameEditFormModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} game={game} team1={team1} team2={team2}/>
                                }
                            </div>
                            
                                
                        
                    );
                })}
        </div>
        }
        </>
     );
}
 
export default Games;