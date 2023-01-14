import styles from './Standings.module.scss'
import { useTeamsContext } from '../../hooks/contexts/useTeamsContext';
import { useGamesContext } from '../../hooks/contexts/useGamesContext';
import useFetch from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import sort_basketball_league from './sorting';
import PleaseFlipYourPhone from '../../Components/PleaseFlipYourPhone/PleaseFlipYourPhone';
const Standings = () => {
    const {teams: unsortedTeams,dispatch} = useTeamsContext();
    const {data: teamsData, isLoading} = useFetch('/teams');
    const {games, dispatch: gamesDispatch} = useGamesContext();
    const {data: gamesData} = useFetch('/games');
    const [teams, setTeams] = useState(null);
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsLandscape(window.innerHeight < window.innerWidth);
            // console.log(window.innerHeight, window.innerWidth)
            console.log(isLandscape)
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if(teamsData && gamesData){
            dispatch({type: 'SET_TEAMS', payload: teamsData.teams})
            gamesDispatch({type: 'SET_GAMES', payload: gamesData.games})
            setTeams(sort_basketball_league(teamsData.teams, gamesData.games))
        }

    }, [teamsData,gamesData])

    

    
    return ( 
    <>
       {!isLandscape && <PleaseFlipYourPhone/>}
        {isLandscape && <div className={styles.Standings}>
                <h1 className={styles.header}>Standings</h1>
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h3>Pozycja</h3>
                    <h3>Drużyna</h3>
                    <h3>GP</h3>
                    <h3>Won</h3>
                    <h3>Lost</h3>
                    <h3>Win%</h3>
                    <h3>PTS+</h3>
                    <h3>PTS-</h3>
                    <h3>+/-</h3>
                </div>
                <div className={styles.tableBody}>
                    {isLoading && !teams && !games && <ClipLoader/>}
                    {teams && teams.map((team, index) => {
                        return (
                            <div className={styles.tableRow} key={team._id}>
                                <div className={styles.tableElement}>
                                    <h3>{index+1}</h3>
                                </div>
                                <div className={styles.tableElement}>
                                    <img src={team.logo} alt={team.name} className={styles.teamImg}/>
                                    <h3>{team.name}</h3>
                                </div>
                                <div className={styles.tableElement}>
                                    <h3>{team.games}</h3>
                                </div>
                                <div className={styles.tableElement}>
                                    <h3>{team.wins}</h3>
                                </div>
                                <div className={styles.tableElement}>
                                    <h3>{team.losses}</h3>
                                </div>
                                <div className={styles.tableElement}>
                                    <h3>{(team.wins===0) ? 0 : (team.wins / team.games*100).toFixed(2)}%</h3>
                                </div>
                                <div className={styles.tableElement}>
                                    <h3>{team.points_made}</h3>
                                </div>
                                <div className={styles.tableElement}>
                                    <h3>{team.points_lost}</h3>
                                </div>
                                <div className={styles.tableElement}>
                                    <h3>{team.points_made - team.points_lost}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
}
    </>
     );
}
 
export default Standings;