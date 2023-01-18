import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { useState } from "react";
import {NavbarData} from "./NavbarData";
import {BiLogInCircle} from "react-icons/bi";
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

            <div className={styles.logo}>
                <Link to="/">
                    <img src="wbl.jpg" />
                </Link>
            </div>
            {user &&
            <Link to={'/profile'} className={styles.greeting}>
                Cześć, {user.firstName}
            </Link>
            }
            {!user &&
            <Link to={'/login'} className={styles.greeting}>
                <BiLogInCircle/>
                Zaloguj się
            </Link>
            }

            <nav className={sidebar ? styles.navMenuActive : styles.navMenu}>
                <ul className={styles.navMenuItems} onClick={() => setSidebar(!sidebar)}>
                    <li className={styles.navbarToggle}>
                        <Link to='#' className={styles.menuBars}>
                            <AiFillCloseCircle onClick={() => setSidebar(!sidebar)}/>
                        </Link>
                    </li>
                    {NavbarData.map((item, index) => {
                        const isUser = user ? true : false;
                        const isAdmin = user && user.admin ? true : false;
                        if(item.title==="Admin" && !isAdmin) return null;
                        if(item.title==="Profile" && !user) return null;
                        if(item.title==="Login" && isUser) return null;
                        if(item.title==="Logout" && !isUser) return null;
                        if(item.title==="Logout" && isUser){
                            return (
                                <li key={index} className={styles.navLi}>
                                <a  onClick={handleLogout}>
                                    {item.icon}
                                    <span >{item.title}</span>
                                </a>
                                </li>
                            );
                        }
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