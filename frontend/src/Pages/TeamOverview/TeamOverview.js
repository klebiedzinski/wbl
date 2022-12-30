import { useParams} from "react-router-dom";
import { useState } from "react";
import PlayersList from "../../Components/TeamPlayersList/TeamPlayersList";
import styles from "./TeamOverview.module.scss"
import useFetch from "../../hooks/useFetch";
import TeamEditModal from "../../Components/TeamEditModal/TeamEditModal";
import { useTeamsContext } from "../../hooks/useTeamsContext";
import ClipLoader from "react-spinners/ClipLoader";
const TeamOverview = () => {
    const {id} = useParams()
    // look for team in the context, if not found, fetch it from the server
    const {teams} = useTeamsContext();
    const {data, isLoading} = useFetch(`/teams/${id}`)

    const team = teams ? teams.find(team => team._id === id) : data ? data.team : null;


    
    
    

    const [isModalOpen, setIsModalOpen] = useState(false);

    return ( 
        <>
        {isLoading && !team && 
        <ClipLoader
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        }

        {team &&
        <div className={styles.teamOverview}>
            <div className={styles.teamInfo}>
                <div className={styles.teamInfoHeader}>
                   <h1 className={styles.teamName}>Team {team.name}</h1>
                </div>
                <div className={styles.teamInfoContainer}>
                    <div className={styles.teamLogo}>
                        <img src={team.logo} alt="" />
                    </div>
                    <div className={styles.contact}>
                        <h1>Kontakt</h1>
                    </div>
                    <div className={styles.teamImage}>
                        Team pic
                    </div>
                    <div className={styles.editBtn}>
                        <img src="https://wbl.klebiedzinski.pl/photos/icons/edit-icon.png" alt="" onClick={() => setIsModalOpen(true)}/>
                    </div>

                </div>
            </div>
        </div>
        }

        {isModalOpen && 
        <TeamEditModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} team={team} id={id}/>
        }
        <PlayersList/>
        </>
     );
}
 
export default TeamOverview;