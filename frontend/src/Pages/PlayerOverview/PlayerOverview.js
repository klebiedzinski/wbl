import { useParams } from "react-router-dom";
import styles from "./PlayerOverview.module.scss"
import useFetch from "../../hooks/useFetch";
import ClipLoader from "react-spinners/ClipLoader";
import PlayerEditFormModal from "../../Components/PlayerEditFormModal/PlayerEditFormModal";
import { useState } from "react";
const PlayerOverview = () => {

    const {player_id} = useParams()
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
            <div className={styles.editBtn}>
                <img src="https://wbl.klebiedzinski.pl/photos/icons/edit-icon.png" alt="" onClick={() => setIsModalOpen(true)}/>
            </div>
            <img src={player.player.picture} alt="" className={styles.playerImg} />
            <h5>{player.player.firstName}</h5>
            <h5>{player.player.lastName}</h5>
            <h5>Team: {player.player.teamName}</h5>
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