import ClipLoader from "react-spinners/ClipLoader";
import useFetch from "../../hooks/useFetch";
import styles from "./Users.module.scss";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
const Users = () => {
    const {user} = useAuthContext();
    const { data: users, isLoading} = useFetch('/user', user.token)
    return ( 
        <div>
            {isLoading && <ClipLoader/>}
            {users && users.map(user => <div key={user._id}>{user.firstName} {user.lastName} {user.email}</div>)}
        </div>
     );
}
 
export default Users;