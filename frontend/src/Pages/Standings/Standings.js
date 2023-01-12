import styles from './Standings.module.scss'
import { useTeamsContext } from '../../hooks/contexts/useTeamsContext';
import { useGamesContext } from '../../hooks/contexts/useGamesContext';
import useFetch from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import sort_basketball_league from './sorting';
const Standings = () => {
    const {teams: unsortedTeams,dispatch} = useTeamsContext();
    const {data: teamsData, isLoading} = useFetch('/teams');
    const {games, dispatch: gamesDispatch} = useGamesContext();
    const {data: gamesData} = useFetch('/games');
    const [teams, setTeams] = useState(null);
    useEffect(() => {
        if(teamsData && gamesData){
            dispatch({type: 'SET_TEAMS', payload: teamsData.teams})
            gamesDispatch({type: 'SET_GAMES', payload: gamesData.games})
            setTeams(sort_basketball_league(teamsData.teams, gamesData.games))
        }

    }, [teamsData,gamesData])

    

    
    return ( 
        <div className={styles.Standings}>
            <div className={styles.header}>
                <h1>Standings</h1>
            </div>
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h3>Position</h3>
                    <h3>Team</h3>
                    <h3>GP</h3>
                    <h3>Won</h3>
                    <h3>Lost</h3>
                    <h3>PTS+</h3>
                    <h3>PTS-</h3>
                    <h3>+/-</h3>
                </div>
                <div className={styles.tableBody}>
                    {isLoading && !teams && !games && <ClipLoader/>}
                    {teams && teams.map((team, index) => {
                        return (
                            <div className={styles.tableRow} key={team._id}>
                                <h3>{index+1}</h3>
                                <h3>{team.name}</h3>
                                <h3>{team.games}</h3>
                                <h3>{team.wins}</h3>
                                <h3>{team.losses}</h3>
                                <h3>{team.points_made}</h3>
                                <h3>{team.points_lost}</h3>
                                <h3>{team.points_made - team.points_lost}</h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
     );
}
 
export default Standings;