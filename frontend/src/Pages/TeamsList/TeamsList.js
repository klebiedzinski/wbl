import { useState } from "react";
import styles from "./TeamsList.module.scss";
import { Link } from "react-router-dom";
import TeamForm from "../../Components/TeamForm/TeamForm";
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
const TeamsList = () => {

    const {data: teams, isLoading, error} = useFetch('/teams')
    if (teams) {
        console.log(teams.teams);
        console.log(isLoading)
    }
    return ( 
        <>
        <h1 className={styles.header}>Teams</h1>
        {isLoading &&  <ClipLoader
                    loading={isLoading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
        }
        {teams && <div className={styles.teams}>
            {teams && teams.teams.map(team => {
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
        {teams && 
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
        </div>}
        </>
     );
}
 
export default TeamsList;