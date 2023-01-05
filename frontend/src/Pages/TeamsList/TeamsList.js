import styles from "./TeamsList.module.scss";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
import  useFetch  from "../../hooks/useFetch";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
const TeamsList = () => {

    const {user} = useAuthContext();

    const {teams, dispatch} = useTeamsContext();
    
    const {data, isLoading, error} = useFetch('/teams')
    useEffect(() => {
        if (data) {
            dispatch({type: 'SET_TEAMS', payload: data.teams})
        }
        
    }, [data])

    

    return ( 
        <>
        <h1 className={styles.header}>Teams</h1>
        {isLoading && !teams &&  <ClipLoader
                    loading={isLoading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
        }
        {teams && <div className={styles.teams}>
        {teams && user && user.admin &&
            <Link to={`/teams/TeamForm`}>
            <div className={styles.team} >
                <div className={styles.teamName} >
                <h1>Add team</h1>
                </div>
                <div className={styles.teamImg}>
                <img src={"https://wbl.klebiedzinski.pl/photos/icons/plus-icon.png"} alt="" />
                </div>
            </div>
            </Link>}
            {teams && teams.map(team => {
                return(
                    <Link to={`/teams/${team._id}`} key={team._id}>
                    <div className={styles.team} >
                        <div className={styles.teamName} >
                        <h1>{team.name}</h1>
                        </div>
                        <div className={styles.teamImg}>
                        <img src={team.logo} alt="" />
                        </div>
                    </div>
                    </Link>
                );
            })}
        </div>}
        </>
     );
}
 
export default TeamsList;