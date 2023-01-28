import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
import { usePlayersContext } from "../../hooks/contexts/usePlayersContext";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import useFetch from "../../hooks/useFetch";
import styles from "./Profile.module.scss";
import GoBack from "../../Components/GoBack/GoBack";
import { useState } from "react";
const Profile = () => {
  const { user } = useAuthContext();

  const { teams: teamsFromContext } = useTeamsContext();
  const { players: playersFromContext } = usePlayersContext();

  const { data: teamsData } = useFetch("/teams");
  const { data: playersData } = useFetch("/players");

  const [survey, setSurvey] = useState(false);
  
  const allTeams = teamsData ? teamsData.teams : teamsFromContext;
  const teams = !user.admin
    ? teamsData
      ? teamsData?.teams.filter((team) => user.auth_teams.includes(team._id))
      : teamsFromContext?.filter((team) => user.auth_teams.includes(team._id))
    : allTeams;

  const players = !user.admin
    ? playersData
      ? playersData?.players.filter((player) =>
          user.auth_players.includes(player._id)
        )
      : playersFromContext?.filter((player) =>
          user.auth_players.includes(player._id)
        )
    : playersData
    ? playersData.players
    : playersFromContext;

  return (
    <>
      {(!teams || !players) && <ClipLoader />}
      <GoBack />
      {teams && players && (
        <div className={styles.main}>
        <div className={styles.Profile}>
          <div className={styles.userInfo}>
          <h3>Twoje dane:</h3>
          <p>Email: {user.email}</p>
          <p>Imię: {user.firstName}</p>
          <p>Nazwisko: {user.lastName}</p>
          </div>

          <h1 className={styles.subHeader}>Uprawnienia:</h1>

          <h5>Zarządzanie drużyną:</h5>
          <ul className={styles.teamsList}>
            {teams.map((team) => {
              return (
                <li key={team._id} className={styles.team}>
                  <Link to={`/teams/${team._id}`}>
                    <img src={team.logo} className={styles.logo} />
                    <h5>{team.name}</h5>
                  </Link>
                </li>
              );
            })}
          </ul>
          <h5 className={styles.subHeader}>Zarządzanie graczem:</h5>
          <ul className={styles.playersList}>
            {players.map((player) => {
              return (
                <li key={player._id} className={styles.player}>
                  <Link to={`/players/${player._id}`} className={styles.player}>
                    <img
                      src={player.picture}
                      alt=""
                      className={styles.playerImg}
                    />
                    <h5>{player.firstName}</h5>
                    <h5>{player.lastName}</h5>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.survey}>
          {!survey && <h3 onClick={() => setSurvey(!survey)}>Wypełnij ankietę</h3>}
          <p>
            Wypełnij ankietę, aby pomóc nam w dalszym rozwoju strony.
          </p>
          
          {survey && 
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe91EzNotg6x4kyiD4Lx_RR0bwqOGvEMOYoB-zzX0gF1XP4tw/viewform?embedded=true" width="640" height="963" frameborder="0" marginheight="0" marginwidth="0">Ładuję…</iframe>
          }
        </div>
        </div>
      )}
    </>
  );
};

export default Profile;
