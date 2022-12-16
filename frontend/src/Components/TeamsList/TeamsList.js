import { Team,Player } from "../../Data";
import { useState } from "react";
import styles from "./TeamsList.module.scss";
import { Link } from "react-router-dom";
import TeamForm from "../TeamForm";
const TeamsList = ({teams,setTeams}) => {






    const [addTeamClicked, setAddTeamClicked] = useState(false)

    return ( 
        <>
        <h1 className={styles.header}>Teams</h1>
        <div className={styles.teams}>
            {teams.map(team => {
                return(
                    <Link to={`/teams/${team.name}`} key={team.id}>
                    <div className={styles.team} >
                        <div className={styles.teamName} >
                        <h1>{team.name}</h1>
                        </div>
                        <div className={styles.teamImg}>
                        <img src={team.image.src} alt="" />
                        </div>
                    </div>
                    </Link>
                );
            })}
        <div className={styles.addTeamForm}>
            <button onClick={() => setAddTeamClicked(!addTeamClicked)}>Add team</button>
            {addTeamClicked && <TeamForm setTeams={setTeams} teams={teams}/>}
        </div>
        </div>
        </>
     );
}
 
export default TeamsList;