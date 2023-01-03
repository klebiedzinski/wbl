import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
const Navbar = () => {

    const {user} = useAuthContext();
    const {logout} = useLogout();

    const handleLogout = () => {
        logout();
    }
    return ( 
        <nav className={styles.navbar}>
            <Link to="/">
                <img src={"/wbl.jpg"} alt="" />
            </Link>
            {user &&
            <div className={styles.links}>
                <Link to="/teams">Teams</Link>
                <Link to="/players">Players</Link>
                <Link to="/games">Games</Link>
                <Link to="/standings">Standings</Link>
                <Link to="/profile">{user.email}</Link>
                <button onClick={handleLogout} className={styles.login}>Log out</button>
            </div>
            }   
            {!user &&
            <div className={styles.links}>
                <Link to="/teams">Teams</Link>
                <Link to="/players">Players</Link>
                <Link to="/games">Games</Link>
                <Link to="/standings">Standings</Link>
                <Link to="/login" className={styles.login}>Login</Link> 
            </div>
            }
            
        </nav>
     );
}
 
export default Navbar;