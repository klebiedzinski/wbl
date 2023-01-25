import styles from "./AdminPanel.module.scss";
import GameForm from "../../Components/Forms/GameForm/GameForm";
import { usePlayersContext } from "../../hooks/contexts/usePlayersContext";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
import ClipLoader from "react-spinners/ClipLoader";
import useFetch from "../../hooks/useFetch";
import Users from "../../Components/Users/Users";
import GoBack from "../../Components/GoBack/GoBack";
import { AiOutlineReload } from "react-icons/ai";

const AdminPanel = () => {
  const { teams: teamsFromContext } = useTeamsContext();
  const { players: playersFromContext } = usePlayersContext();

  const { data: teamsData } = useFetch("/teams");
  const { data: playersData } = useFetch("/players");

  const teams = teamsData ? teamsData.teams : teamsFromContext;
  const players = playersData ? playersData.players : playersFromContext;

  return (
    <>
      <GoBack />
      {(!teams || !players) && <ClipLoader />}
      {teams && players && (
        <>
          <div className={styles.header}>
            <h1>Panel admina</h1>
          </div>

          <div className={styles.main}>
            <div className={styles.add_game}>
              <h1>Dodaj mecz</h1>
              <GameForm teams={teams} />
            </div>

            <div className={styles.users_panel}>
              <div className={styles.users}>
                <AiOutlineReload />
                <Users />
              </div>
            </div>

            <div className={styles.surveys}>
              <h1>Surveys</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminPanel;
