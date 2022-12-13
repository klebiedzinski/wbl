import { Team,Player } from "../Data";
import { useState } from "react";
import { Link } from "react-router-dom";
import TeamForm from "./TeamForm";
const Teams = ({teams,setTeams}) => {






    const [addTeamClicked, setAddTeamClicked] = useState(false)

    return ( 
        <>
        <h1 className="header">Teams</h1>
        <div className="teams">
            {teams.map(team => {
                return(
                    <Link to={`/teams/${team.name}`} key={team.id}>
                    <div className="team" >
                        <div className="team-name" >
                        <h1>{team.name}</h1>
                        </div>
                        <div className="team-img">
                        <img src={team.image.src} alt="" />
                        </div>
                    </div>
                    </Link>
                );
            })}
        <div className="addTeamForm">
            <button onClick={() => setAddTeamClicked(!addTeamClicked)}>Add team</button>
            {addTeamClicked && <TeamForm setTeams={setTeams} teams={teams}/>}
        </div>
        </div>
        </>
     );
}
 
export default Teams;