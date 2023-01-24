import styles from "./Games.module.scss";
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
import Game from "./Game";
import GamesFiltersBar from "./GamesFiltersBar/GamesFiltersBar";
import GoBack from "../../Components/GoBack/GoBack";
import { selectGames, setGamesReducer } from "../../features/games/gamesSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Games = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const { teams: teamsFromContext } = useTeamsContext();
  const { data: teamsData } = useFetch("/teams");
  const teams = teamsData ? teamsData.teams : teamsFromContext;

  //pobiernie meczy ze store, jeśli nie ma to setGamesReducer
  const { games } = useSelector((state) => selectGames(state));
  const { data, isLoading, error } = useFetch(
    `/games/filter/?page=1&limit=5&from=2000-10-10&to=3000-10-10&status=wszystkie`
  );
  useEffect(() => {
    if (data) {
      dispatch(setGamesReducer(data.games));
    }
  }, [data]);

  return (
    <>
      <GoBack />
      <h1 className={styles.header}>Games </h1>

      {isLoading && (!games || !teams) && (
        <ClipLoader
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

      <GamesFiltersBar />

      {games && (
        <div className={styles.gamesList}>
          {games &&
            teams &&
            games.map((game) => {
              const team1 = teams.find((team) => team._id === game.team1_id);
              const team2 = teams.find((team) => team._id === game.team2_id);

              return (
                <Game
                  team1={team1}
                  team2={team2}
                  game={game}
                  user={user}
                  key={game._id}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default Games;
