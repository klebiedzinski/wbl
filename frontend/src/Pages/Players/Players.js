import { Link } from "react-router-dom";
import axiosInstance from "../../config/axios_config";
import styles from "./Players.module.scss";
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import { usePlayersContext } from "../../hooks/contexts/usePlayersContext";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
import { useState } from "react";
import GoBack from "../../Components/GoBack/GoBack";
import {GrFormPreviousLink, GrFormNextLink} from 'react-icons/gr';
const TeamPlayersList = () => {
  const { user } = useAuthContext();
  const { players, dispatch } = usePlayersContext();
  const { data, isLoading, error } = useFetch(
    "/players/query/?page=1&limit=12&search="
  );
  const {
    data: teamData,
    isLoading: teamIsLoading,
    error: teamError,
  } = useFetch(`/teams/`);
  const { teams, dispatch: teamDispatch } = useTeamsContext();
  useEffect(() => {
    if (data && teamData) {
      dispatch({ type: "SET_PLAYERS", payload: data.players });
      teamDispatch({ type: "SET_TEAMS", payload: teamData.teams });
    }
  }, [data, teamData]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const handleSearch = () => {
    dispatch({ type: "SET_PLAYERS", payload: [] });
    axiosInstance
      .get(`/players/query/?page=1&limit=12&search=${search}`)
      .then((res) => {
        dispatch({ type: "SET_PLAYERS", payload: res.data.players });
      })
      .catch((err) => console.log(err));
  };

  const [previousSearch, setPreviousSearch] = useState("");

  useEffect(() => {
    if (previousSearch !== search) {
      console.log("search", search);
      console.log("previousSearch", previousSearch);
      setPage(1);
    }

    dispatch({ type: "SET_PLAYERS", payload: [] });
    axiosInstance
      .get(`/players/query/?page=${page}&limit=${limit}&search=${search}`)
      .then((res) => {
        dispatch({ type: "SET_PLAYERS", payload: res.data.players });
      })
      .catch((err) => console.log(err));
    setPreviousSearch(search);
  }, [search, page, limit]);

  return (
    <>
      <GoBack />
      <h1 className={styles.header}>Zawodnicy</h1>

      {error && <div>{error}</div>}
      <div className={styles.toolsBar}>
        <input
          type="text"
          placeholder="Znajdź zawodnika..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <button
          className={styles.searchBtn}
          onClick={() => handleSearch(search)}
        >
          Search
        </button> */}
        <div className={styles.pagination}>
          <button
            className={styles.paginationBtn}
            onClick={page === 1 ? null : () => setPage(page - 1)}
          >
            <GrFormPreviousLink className={styles.icon} />
          </button>
          <button
            className={styles.paginationBtn}
            onClick={() => setPage(page + 1)}
          >
            <GrFormNextLink className={styles.icon}/>
          </button>
        </div>
      </div>
      {(isLoading || teamIsLoading) && (
        <ClipLoader
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {players && teams && (
        <div className={styles.playersList}>
          <h1 className={styles.roster}></h1>
          <div className={styles.teamPlayers}>
            {user && user.admin && (
              <Link to={`/players/PlayerForm`} className={styles.player}>
                <div className={styles.playerImg}>
                  <img
                    src={
                      "https://wbl.klebiedzinski.pl/photos/icons/plus-icon.png"
                    }
                    alt=""
                    className={styles.playerImg}
                  />
                </div>
                <h5>Add Player</h5>
              </Link>
            )}
            {players &&
              teams &&
              players.map((player) => {
                const team = teams.find((team) => team._id === player.team_id);
                return (
                  <Link
                    to={`/players/${player._id}`}
                    className={styles.player}
                    key={player._id}
                  >
                    <div className={styles.playerImg}>
                      <img src={player.picture} alt="" />
                    </div>
                    <div>
                      <h5>{player.firstName}</h5>
                      <h5>{player.lastName}</h5>
                    </div>
                    <img src={team.logo} alt="" className={styles.teamImg} />
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default TeamPlayersList;
