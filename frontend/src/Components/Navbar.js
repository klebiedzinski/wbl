import { Link } from "react-router-dom";
import wbl from "../Data/Teams_pics/wbl.jpg"

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <img src={wbl} alt="" />
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/teams">Teams</Link>
                
            </div>
        </nav>
     );
}
 
export default Navbar;