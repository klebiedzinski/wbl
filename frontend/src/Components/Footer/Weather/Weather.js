import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../Footer.module.scss';
const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(
                `http://api.weatherapi.com/v1/current.json?key=4b75c4281ecf4b3c8c314457232401&q=Wloclawek&aqi=no`
            )
            .then((res) => {
                const { text, icon } = res.data.current.condition;
                const { temp_c } = res.data.current;
                const { name, localtime } = res.data.location;
                setWeather({ text, icon, temp_c, name, localtime });
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            {weather && (
                <div className={styles.weather}>
                    <div className={styles.weatherContainer}>
                        <p className={styles.temp}>{weather.temp_c} &#8451;</p>
                        <div className={styles.right}>
                            <img
                                src={weather.icon}
                                alt=""
                                className={styles.icon}
                            />
                            <p className={styles.text}>{weather.text}</p>
                        </div>
                    </div>
                </div>
            )}
            {/* {error && console.log(error)} */}
        </>
    );
};

export default Weather;
