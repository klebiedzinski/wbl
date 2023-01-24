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
import axiosInstance from "../../config/axios_config";
import Game from "./Game";
import GamesFiltersBar from "./GamesFiltersBar/GamesFiltersBar";
const Games = () => {
    
    const {user} = useAuthContext();
    const {teams: teamsFromContext} = useTeamsContext();
    const {data: teamsData} = useFetch('/teams')
    const teams = teamsData ? teamsData.teams : teamsFromContext;
    const {games: gamesFromContext, dispatch} = useGamesContext();
    const {data, isLoading, error} = useFetch(`/games/filter/?page=1&limit=5&from=2000-10-10&to=3000-10-10&status=wszystkie`)
    
    const games = gamesFromContext ? gamesFromContext : data ? data.games : null;
    
    
    useEffect(() => {
        if(data){
            dispatch({type: 'SET_GAMES', payload: data.games})
        }
    }, [data])

  
    
    return ( 
        <>
        {isLoading && console.log("laduje se dane znowu")}
         <h1 className={styles.header}>Games </h1>
        
        {isLoading && (!games || !teams) &&
         <ClipLoader
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        }
        
        <GamesFiltersBar/>
        
        {games && 
        <div className={styles.gamesList}>
            
                {games && teams && games.map(game =>{
                    const team1 = teams.find(team => team._id === game.team1_id);
                    const team2 = teams.find(team => team._id === game.team2_id);

                    return (
                        <Game team1={team1} team2={team2} game={game} user={user} key={game._id}/>
                    );
                })}
        </div>
        }
        </>
     );
}
 
export default Games;