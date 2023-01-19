import UserDetailsModal from "../Modals/UserDetailsModal/UserDetailsModal";
import styles from "./Users.module.scss";
import { useState } from "react";
const UserEntry = ({user}) => {
    const [showModal, setShowModal] = useState(false)
    return ( 
        <tr key={user._id} className={styles.users_row}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>
                <button className={styles.btn} onClick={() => setShowModal(true)}>{!user.adminConfirmed ? "zweryfikuj" : "więcej"}</button>
            </td>
            {showModal && <UserDetailsModal setShowModal={setShowModal} user={user}/>}
        </tr>
     );
}
 
export default UserEntry;