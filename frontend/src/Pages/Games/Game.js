import React, { useState } from 'react';
import { AiFillEdit, AiFillDelete, AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from './Games.module.scss';
import GameEditFormModal from '../../Components/Modals/GameEditFormModal/GameEditFormModal';
import axiosInstance from '../../config/axios_config';
import { useAuthContext } from '../../hooks/contexts/useAuthContext';
import { useGamesContext } from '../../hooks/contexts/useGamesContext';

const Game = ({team1, team2, game}) => {
    const {dispatch} = useGamesContext();
    const {user} = useAuthContext();
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
        <div className={styles.game} key={game._id}>
                                <div className={styles.game_leftbar}>
                                    <p>{game.date.split('T')[0]} - {game.date.split('T')[1].slice(0,5)}</p>
                                    <p>{game.location}</p>
                                </div>
                                <div className={styles.game_main}>
                                    <div className={styles.team1}>
                                        <p>{team1.name}</p>
                                        <img className={styles.teamImg} src={team1.logo} alt={team1.name}/>
                                    </div>
                                    <div className={styles.score}>
                                        <>
                                        {game.status === 'finished' &&
                                        <>
                                        <p>{game.team1Score}</p>
                                        <p>:</p>
                                        <p>{game.team2Score}</p>
                                        </>
                                        }
                                        {game.status === 'scheduled' &&
                                        <p style={{ fontSize: "1.7ch", fontWeight: "100"}}>vs</p>
                                        }
                                        </>
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
}
 
export default Game;