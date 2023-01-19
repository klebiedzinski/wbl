import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Users.module.scss";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteUserReducer, setUsersReducer } from "../../features/users/usersSlice";
import { useSelector } from "react-redux";
import { selectUsers } from "../../features/users/usersSlice";
import axiosInstance from "../../config/axios_config";
import { useState } from "react";
import UserEntry from "./UserEntry";

const Users = () => {
    
    const {user} = useAuthContext();
    const {data, isLoading} = useFetch('/user', user.token)

    const {users} = useSelector(state => selectUsers(state))
    const dispatch = useDispatch()
    
    
    
    useEffect(() => {
        if(data) {
            dispatch(setUsersReducer(data))
        }
    }, [data])


    return ( 
        <div>
            {isLoading && <ClipLoader/>}
            
            {/* table with users */}
            <table className={styles.users_table}>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <UserEntry  user={user}  />
                    ))}
                </tbody>
            </table>
            
        </div>
     );
}
 

    


  

    export default Users;