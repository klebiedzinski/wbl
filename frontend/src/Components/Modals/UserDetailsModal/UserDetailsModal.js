import styles from './SignupRequestsModal.module.scss';
import useFetch  from '../../../hooks/useFetch';
import { useAuthContext } from '../../../hooks/contexts/useAuthContext';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsersReducer } from '../../../features/users/usersSlice';
import { selectUsers, editUserReducer, deleteUserReducer } from '../../../features/users/usersSlice';
import { ClipLoader } from 'react-spinners';
import { AiFillEdit, AiFillDelete, AiOutlineCheck, AiFillCloseCircle } from "react-icons/ai";
import axiosInstance from '../../../config/axios_config';
const UserDetailsModal = ({setShowModal, user: user_data}) => {

    const {data: teams, isLoading: teamsLoading} = useFetch('/teams')
    const {data: players, isLoading: playersLoading} = useFetch('/players')

    const userTeams = teams && teams.teams.filter(team => user_data.auth_teams.includes(team._id))
    const userPlayers = players && players.players.filter(player => user_data.auth_players.includes(player._id))
    const {user} = useAuthContext();


    const dispatch = useDispatch()

   

    const handleAcceptRequest = (user_id) => {
        axiosInstance.patch(`/user/${user_id}`, {adminConfirmed: true}, {headers: {
            Authorization: `Bearer ${user.token}`
        }})
        .then(res => {
            dispatch(editUserReducer(res.data.user))
            setShowModal(false)

        }
        )
        .catch(err => console.log(err))
    }

    const handleDeleteUser = (user_id) => {
        axiosInstance.delete(`/user/${user_id}`, {headers: {
            Authorization: `Bearer ${user.token}`
        }})
        .then(res => {
            dispatch(deleteUserReducer(res.data.user))
            setShowModal(false)
        })
        .catch(err => console.log(err))
    }
    return ( 
        <div className={styles.overlayStyle}>
            <div className={styles.UserDetailsModal}>
                <div className={styles.header}>
                <h1>{user_data.adminConfirmed ? "Użytkownik" : "Signup Request"}</h1>
                <AiFillCloseCircle onClick={() => setShowModal(false)}/>
                </div>
            
            <div className={styles.table_container}>
                {(teamsLoading || playersLoading) ? <ClipLoader/> : 
                <>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Email</th>
                            <th>Stolik</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user_data.firstName}</td>
                            <td>{user_data.lastName}</td>
                            <td>{user_data.email}</td>
                            <td>{user_data.stolik ? "tak" : "nie"}</td>
                            <td>{user_data.admin ? "tak" : "nie"}</td>
                        </tr>
                    </tbody>
                </table>

                <div className={styles.lists}>

                <div className={styles.list}>
                    <h5>Drużyny</h5> 
                    <ul>
                        
                        {teams && userTeams.map(team => (
                            <li>{team.name}</li>
                            ))}
                    </ul>
                </div>

                <div className={styles.list}>
                    <h5>Zawodnicy</h5>
                    <ul>
                        {players && userPlayers.map(player => (
                            <li>{`${player.firstName} ${player.lastName}`}</li>
                            ))}
                    </ul>
                </div>
                </div>

                <div className={styles.controls}>
                    {!user_data.adminConfirmed && <AiOutlineCheck onClick={() => handleAcceptRequest(user_data._id)}/>}
                    {<AiFillDelete onClick={() => handleDeleteUser(user_data._id)}/>}
                </div>
                </>
            }
            </div>
            </div>

            
        </div>
                        
     );
}
 
export default UserDetailsModal;

