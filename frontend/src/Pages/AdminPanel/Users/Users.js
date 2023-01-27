import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Users.module.scss";
import { useAuthContext } from "../../../hooks/contexts/useAuthContext";
import useFetch from "../../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUsersReducer } from "../../../features/users/usersSlice";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../features/users/usersSlice";
import UserEntry from "./UserEntry";

const Users = () => {
  const { user } = useAuthContext();

  const dispatch = useDispatch();
  const { data, isLoading } = useFetch("/user", user.token);
  const { users } = useSelector((state) => selectUsers(state));
  useEffect(() => {
    if (data) {
      dispatch(setUsersReducer(data));
    }
  }, [data]);

  return (
    <div>
      {!users && <ClipLoader />}

      <div className={styles.users_table}>
        <div>
          {users &&
            users.map((user) => <UserEntry user={user} key={user._id} />)}
        </div>
      </div>
    </div>
  );
};

export default Users;
