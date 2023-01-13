import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { useState } from "react";
import {NavbarData} from "./NavbarData";
//icons
import {GiHamburgerMenu} from "react-icons/gi"; //open menu
import {AiFillCloseCircle} from "react-icons/ai"; //close menu
const Navbar = () => {

    const {user} = useAuthContext();
    const {logout} = useLogout();
    const [sidebar, setSidebar] = useState(false);
    const handleLogout = () => {
        logout();
    }
    return ( 
        <div className="navbar">
        <div className={styles.navbar}>
            <Link to='#' className={styles.menuBars}>
                <GiHamburgerMenu onClick={() => setSidebar(!sidebar)}/>
            </Link>

            <nav className={sidebar ? styles.navMenuActive : styles.navMenu}>
                <ul className={styles.navMenuItems} onClick={() => setSidebar(!sidebar)}>
                    <li className={styles.navbarToggle}>
                        <Link to='#' className={styles.menuBars}>
                            <AiFillCloseCircle onClick={() => setSidebar(!sidebar)}/>
                        </Link>
                    </li>
                    {NavbarData.map((item, index) => {
                        return (
                            <li key={index} className={styles.navLi}>
                            <Link to={item.path} >
                                {item.icon}
                                <span >{item.title}</span>
                            </Link>
                            </li>
                        );
                    })}
                </ul>
        </nav>
                    

                    


            {/* {user &&
            <div className={styles.links}>
                <Link to="/teams">Teams</Link>
                <Link to="/players">Players</Link>
                <Link to="/games">Games</Link>
                <Link to="/standings">Standings</Link>
                <Link to="/profile">Hi, {user.firstName}</Link>
                {user.admin && <Link to="/admin">Panel admina</Link>}
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
            } */}
            
        </div>
        </div>
     );
}
 
export default Navbar;