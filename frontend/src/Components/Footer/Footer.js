import styles from './Footer.module.scss';
import Weather from './Weather/Weather';
import { BsInstagram } from 'react-icons/bs';
const Footer = () => {
    return (
        <footer>
            <div className={styles.weatherContainer_main}>
                <a
                    style={{ color: 'white' }}
                    href="https://pogoda.interia.pl/prognoza-szczegolowa-wloclawek,cId,38207"
                >
                    Pogoda Włocławek
                </a>
                <Weather />
            </div>
            <div className={styles.links}>
                <p>
                    Created by{' '}
                    <a href="https://github.com/klebiedzinski">
                        Karol Lebiedziński
                    </a>
                </p>
                <p>
                    Avatars created by{' '}
                    <a href="https://dribbble.com/micahlanier">Micah Lanier</a>,
                    possible to use thanks to{' '}
                    <a href="https://dicebear.com">Dicebear</a>.
                </p>
            </div>
            <div className={styles.socialMedia}>
                <a href="https://www.instagram.com/wbl_onz/">
                    <BsInstagram className={styles.icon} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
