import { Link, useParams } from "react-router-dom";
import PlayerForm from "./PlayerForm";
import PlayersList from "./PlayersList";
const TeamOverview = ({teams, setTeams}) => {
    const {name} = useParams()
    const targetTeam = teams.find(el => el.name===name)
    return ( 
        <>
        <div className="teamOverview">
            <div className="teamInfo">
                <div className="teamInfo-header">
                    <h1 className="teamName">Team {targetTeam.name}</h1>
                </div>
                <div className="teamInfo-container">
                    <div className="teamLogo">
                        <img src={targetTeam.image.src} alt="" />
                    </div>
                    <div className="contact">
                        <h1>Kontakt</h1>
                    </div>
                    <div className="teamImage">
                        Team pic
                    </div>
                </div>
            </div>
            <PlayersList teams={teams}/>
            <Link to={`/teams/${targetTeam.name}/PlayerForm`}>Add player</Link>
            <Link to={`/teams/${targetTeam.name}/PlayersList`}>Players</Link>
        </div>
        </>
     );
}
 
export default TeamOverview;