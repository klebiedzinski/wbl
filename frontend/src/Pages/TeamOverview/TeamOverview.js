import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import TeamPlayersList from "./TeamPlayersList/TeamPlayersList";
import styles from "./TeamOverview.module.scss"
import useFetch from "../../hooks/useFetch";
import TeamEditModal from "../../Components/Modals/TeamEditModal/TeamEditModal";
import { useTeamsContext } from "../../hooks/contexts/useTeamsContext";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { AiFillEdit } from "react-icons/ai";
const TeamOverview = () => {
    const {id} = useParams()
    const {user} = useAuthContext();
    const canEdit = user && (user.admin || user.auth_teams.find(team_id => team_id === id))

    const {teamsFromContext} = useTeamsContext();
    const {data: teamFromDB, isLoading} = useFetch(`/teams/${id}`)
    const team = teamsFromContext ? teamsFromContext.find(team => team._id === id) : teamFromDB ? teamFromDB.team : null;
   

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
                    <div className={styles.teamImage}>
                        <img src={team.teamPicture} alt="" />
                    </div>
                    {canEdit &&
                    <div className={styles.editBtn} onClick={() => setIsModalOpen(true)}>
                        <AiFillEdit/>
                    </div>
                    }

                </div>
            </div>
        </div>
        }

        {isModalOpen &&
        <TeamEditModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} team={team} id={id} />
        }
        <TeamPlayersList/>
        </>
     );
}
 
export default TeamOverview;