import styles from "./AdminPanel.module.scss";
import GameForm from "../../Components/GameForm/GameForm";
import { usePlayersContext } from "../../hooks/contexts/usePlayersContext";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { useGamesContext } from "../../hooks/contexts/useGamesContext";
import ClipLoader from "react-spinners/ClipLoader";
import useFetch from "../../hooks/useFetch";
const AdminPanel = () => {
    const {user} = useAuthContext();

    const {teams: teamsFromContext} = useTeamsContext();
    const {players: playersFromContext} = usePlayersContext();

    const { data: teamsData} = useFetch('/teams')
    const { data: playersData} = useFetch('/players')
    

    const teams = teamsData ? teamsData.teams : teamsFromContext;
    const players = playersData ? playersData.players : playersFromContext;

    return ( 
        <>
        {(!teams || !players) && <ClipLoader/>}
        { teams && players &&
        <>
        <div className={styles.header}>
            <h1>AdminPanel</h1>
        </div>

        <div className={styles.main}> 
            <div className={styles.add_game}>
                <h1>Dodaj mecz</h1>
                <GameForm teams={teams}/>
            </div>

            <div className={styles.users_panel}>
                <h1>Użytkownicy</h1>

                <div className={styles.signup_requests}>
                <h1>Signup requests</h1>
                </div>

            </div>

            

            <div className={styles.surveys}>
                <h1>Surveys</h1>
            </div>

        </div>
        </>
        }
        </>
     );
}
 
export default AdminPanel;