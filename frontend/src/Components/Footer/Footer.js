import styles from './Footer.module.scss'
import Weather from './Weather/Weather';
const Footer = () => {
    return ( 
        <footer>
            <Weather />
            <div className={styles.links}>
            <p>Created by <a href="https://github.com/klebiedzinski">Karol Lebiedziński</a></p>
            <p>Avatars created by <a href="https://dribbble.com/micahlanier">Micah Lanier</a>, possible to use thanks to <a href="https://dicebear.com">Dicebear</a>.</p>
            </div>
        </footer>
     );
}
 
export default Footer;