import styles from "./UpcomingGames.module.scss";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { GoLocation } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { MdOutlineExpandLess } from "react-icons/md";
import { MdOutlineExpandMore } from "react-icons/md";
const UpcomingGames = ({ team_id, limit }) => {
  const { data: teamsData } = useFetch(`/teams/`);
  const { data: gamesData, isLoading } = useFetch(
    `/games/team/${team_id}/scheduled`
  );
  const [games, setGames] = useState(null);
  const [teams, setTeams] = useState(null);

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (gamesData) {
      const games = gamesData.games.slice(0, limit);
      setGames(games);
    }
    if (teamsData) {
      setTeams(teamsData.teams);
    }

    if (window.innerWidth < 900) {
      setToggle(false);
    }
  }, [gamesData, teamsData]);

 //toggle off every time when location change
  useEffect(() => {
    if (window.innerWidth < 900){
      setToggle(false);
    }
  }, [window.location.pathname]);


  return (
    <>
      {window.innerWidth < 900 && (
        <button className={styles.show} onClick={() => setToggle(!toggle)}>
          <p>
            Nadchodzące mecze{" "}
            {!toggle ? <MdOutlineExpandMore /> : <MdOutlineExpandLess />}
          </p>
        </button>
      )}
      {toggle && (
        <div className={styles.upcomingGames}>
          <div className={styles.games}>
            {!games && !teams && (
              <ClipLoader color="#ffffff" loading={isLoading} size={150} />
            )}
            {games &&
              teams &&
              games.map((game) => {
                const team1 =
                  team_id !== "all"
                    ? teams.find((team) => team._id === team_id)
                    : teams.find((team) => team._id === game.team1_id);
                const team2 =
                  team_id !== "all"
                    ? teams.find(
                        (team) =>
                          (team._id === game.team2_id ||
                            team._id === game.team1_id) &&
                          team._id !== team_id
                      )
                    : teams.find((team) => team._id === game.team2_id);
                return (
                  <div className={styles.game} key={game._id}>
                    <div className={styles.gameTop}>
                      <div className={styles.gameTeams}>
                        <div className={styles.gameTeam}>
                          <p>{team1.name}</p>
                        </div>
                        <div className={styles.gameTeam}>
                          <p>{team2.name}</p>
                        </div>
                      </div>
                      <div className={styles.gameScore}>
                        <div className={styles.teamScore}>
                          <p>{game.team1Score}</p>
                        </div>
                        <div className={styles.teamScore}>
                          <p>{game.team2Score}</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.gameInfo}>
                      <div className={styles.gameDate}>
                        <p>
                          <MdDateRange />
                          {game.date
                            .split("T")[0]
                            .slice(5, 10)
                            .replace("-", ".")}
                          , {game.date.split("T")[1].slice(0, 5)}
                        </p>
                      </div>

                      <div className={styles.gameLocation}>
                        <p>
                          <GoLocation /> {game.location}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingGames;
