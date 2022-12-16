import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
const Navbar = () => {
    return ( 
        <nav className={styles.navbar}>
            <img src={"/wbl.jpg"} alt="" />
            <div className={styles.links}>
                <Link to="/">Home</Link>
                <Link to="/teams">Teams</Link>
                
            </div>
        </nav>
     );
}
 
export default Navbar;