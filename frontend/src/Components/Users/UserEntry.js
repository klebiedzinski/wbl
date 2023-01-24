import UserDetailsModal from "../Modals/UserDetailsModal/UserDetailsModal";
import styles from "./Users.module.scss";
import { useState } from "react";
const UserEntry = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div key={user._id} className={styles.users_row}>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>
        <button className={styles.btn} onClick={() => setShowModal(true)}>
          {!user.adminConfirmed ? "zweryfikuj" : "więcej"}
        </button>
      </p>
      {showModal && (
        <UserDetailsModal setShowModal={setShowModal} user={user} />
      )}
    </div>
  );
};

export default UserEntry;
