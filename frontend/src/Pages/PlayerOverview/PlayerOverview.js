import { useParams } from "react-router-dom";
import styles from "./PlayerOverview.module.scss"
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import PlayerEditFormModal from "../../Components/Modals/PlayerEditFormModal/PlayerEditFormModal";
import { useState } from "react";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { AiFillEdit } from "react-icons/ai";

const PlayerOverview = () => {
    const {user} = useAuthContext();
    const {player_id} = useParams()
    const canEdit = user && (user.admin || user.auth_players.find(playerId => playerId === player_id))
    const {data: player, isLoading, error} = useFetch('/players/' + player_id)
    const [isModalOpen, setIsModalOpen] = useState(false);
    return ( 
        <>
        {isLoading && 
        <ClipLoader
                    loading={isLoading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
        />}
        {player && 
        <>
        <div className={styles.playerOverview}>
            {canEdit &&
            <div className={styles.editBtn} onClick={() => setIsModalOpen(true)}>
                <AiFillEdit/>
            </div>
            }
            <img src={player.player.picture} alt="" className={styles.playerImg} />
            <h5>{player.player.firstName}</h5>
            <h5>{player.player.lastName}</h5>
            <h5>Team: {player.player.team_id}</h5>
            <h5>Age: {player.player.yearOfBirth}</h5>
        </div>
        </>
        }
        {isModalOpen && 
        <PlayerEditFormModal setIsModalOpen={setIsModalOpen} player={player.player} isModalOpen={isModalOpen} />
        }
        </>
     );
}
 
export default PlayerOverview;