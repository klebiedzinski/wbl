import styles from "./Home.module.scss";
import { useEffect } from "react";
const Home = () => {
    

    return ( 
        <div className={styles.home}>
            <h1 className={styles.header}>
            <span>W</span>łocławska <span>B</span>asket <span>L</span>iga
            </h1>
            
        </div>
     );
}
 
export default Home;