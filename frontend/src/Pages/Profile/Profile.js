import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
import { usePlayersContext } from "../../hooks/contexts/usePlayersContext";
import { useGamesContext } from "../../hooks/contexts/useGamesContext";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import useFetch from "../../hooks/useFetch";
import styles from "./Profile.module.scss";
import GameForm from "../../Components/GameForm/GameForm";
const Profile = () => {
    const {user} = useAuthContext();

    const {teams: teamsFromContext} = useTeamsContext();
    const {players: playersFromContext} = usePlayersContext();

    const { data: teamsData, isLoading: teamsLoading, error: teamsError} = useFetch('/teams')
    const { data: playersData, isLoading: playersLoading, error: playersError} = useFetch('/players')

    const allTeams = teamsData ? teamsData.teams : teamsFromContext;
    const teams = !user.admin ? 
        (teamsData ? 
            teamsData?.teams.filter(team => user.auth_teams.includes(team._id)) 
            : teamsFromContext?.filter(team => user.auth_teams.includes(team._id))) 
        : allTeams;

    const players = !user.admin ? (playersData ? 
        playersData?.players.filter(player => user.auth_players.includes(player._id)) 
        : playersFromContext?.filter(player => user.auth_players.includes(player._id)))
        : playersData ? playersData.players : playersFromContext;

    return ( 
        <>
        { teams && players && 
            <div className={styles.Profile}>
            <div className={styles.Profile_left}>
            <h3>Twoje dane:</h3>
            <p>Email: {user.email}</p>
            
                <div>
                <h2 className={styles.subHeader}>Uprawnienia:</h2>
                
                <h3>Zarządzanie drużyną:</h3>
                <ul className={styles.teamsList}>
                    
                
                {teams.map(team => {
                    return (
                        <li key={team._id} className={styles.team}>
                            <Link to ={`/teams/${team._id}`}>
                        <img src={team.logo} className={styles.logo}/>
                        <h5>{team.name}</h5>
                        </Link>
                        </li>
                        )
                    }
                    )}
                    </ul>
                    <h3 className={styles.subHeader}>Zarządzanie graczami:</h3>
                    <ul className={styles.Players}>
                    {players.map(player => {
                        return (
                            <li key={player._id} className={styles.player}>
                            <Link to={`/players/${player._id}`} className={styles.player}>
                            <img src={player.picture} alt="" className={styles.playerImg} />
                            <h5>{player.firstName}</h5>
                            <h5>{player.lastName}</h5>
                            
                            </Link>
                            </li>
                            )
                        })}
                        </ul>
                        </div>
        </div>
        
        {user.admin &&
        <div className={styles.Profile_right}>
            <h3>Dodaj mecz:</h3>
            <GameForm allTeams={allTeams}/>
        </div> 
        }
        
        </div>
    }
    </>
        
        
     );
}
 
export default Profile;