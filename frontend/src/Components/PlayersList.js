import { Link, useParams } from "react-router-dom"

const PlayersList = ({teams}) => {
    const {name} = useParams();
    const team = teams.find(team => team.name === name)
    return ( 
        <div className="playersList">
        <h1 className="roster">Roster - w zadaniu lab06 jako notesList</h1>
        <div className="teamPlayers">
            {team.players.map(player =>{
                return (
                    <Link to={`/teams/${team.name}/${player.id}`} className="player" key={player.id}>
                        <img src={player.image.src} alt="" className="player-img" />
                        <h5>{player.firstName}</h5>
                        <h5>{player.lastName}</h5>
                    </Link>
                );
            })}
        </div>
        </div>
     );
}
 
export default PlayersList;