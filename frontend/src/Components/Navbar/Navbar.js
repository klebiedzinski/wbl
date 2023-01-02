import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
const Navbar = () => {
    return ( 
        <nav className={styles.navbar}>
            <Link to="/">
                <img src={"/wbl.jpg"} alt="" />
            </Link>
            <div className={styles.links}>
                <Link to="/teams">Teams</Link>
                <Link to="/players">Players</Link>
                <Link to="/games">Games</Link>
                <Link to="/standings">Standings</Link>
                <Link to="/signin" className={styles.login}>Login</Link>
            </div>
            
        </nav>
     );
}
 
export default Navbar;