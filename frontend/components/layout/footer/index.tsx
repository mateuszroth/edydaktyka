import React, { useState, useEffect } from 'react';
import { Layout, Spin } from 'antd';
import classNames from 'classnames';
import suncalc from 'suncalc';
import styles from './index.module.scss';

const Footer: React.FC<{}> = () => {
    const [location, setLocation] = useState(null);

    const getLocation = () => {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getSunTimes);
        } else {
            getSunTimes({
                coords: {
                    latitude: 52.386, // Poznan
                    longitude: 16.988,
                },
            });
        }
    };

    const getSunTimes = position => {
        const { latitude, longitude } = position.coords;
        const times = suncalc.getTimes(new Date(), latitude, longitude);
        const { sunrise, sunset } = times;
        setLocation({
            latitude,
            longitude,
            sunrise,
            sunset,
            currentDate: new Date(),
        });
    };

    useEffect(() => {
        getLocation();
    }, []);

    const isNight = location && (location.sunrise > location.currentDate || location.sunset < location.currentDate);
    const isDay = location && location.sunrise <= location.currentDate && location.sunset >= location.currentDate;
    const isAfterSunrise = location && location.sunrise <= location.currentDate;
    const isAfterSunset = location && location.sunset <= location.currentDate;
    const christmasStart = location && new Date(`${location.currentDate.getFullYear()}-12-01`);
    const christmasEnd = location && new Date(`${location.currentDate.getFullYear()}-01-31`);
    const isChristmasTime =
        location && (location.currentDate <= christmasEnd || location.currentDate >= christmasStart);

    return (
        <Layout.Footer
            className={classNames(styles.footer, {
                [styles.moon]: isNight,
                [styles.sun]: isDay,
            })}
        >
            <p>
                Copyright © by Andrzej P. Urbański |{' '}
                <a href="mailto:andrzej.urbanski@cs.put.poznan.pl">andrzej.urbanski@cs.put.poznan.pl</a>
            </p>
            <div className={classNames(styles.footerAnnotation, { [styles.christmas]: isChristmasTime })}>
                Ta witryna wykorzystuje pliki cookies i dane przeglądarki do przechowywania informacji na Twoim
                komputerze.
                <br />
                Bez nich strona nie będzie działała poprawnie. W każdym momencie możesz dokonać zmiany ustawień
                dotyczących ich zapisu.
                <br />
                {location && location.sunrise && (
                    <>
                        Dzisiaj słońce {isAfterSunrise ? 'wzeszło' : 'wschodzi'} o{' '}
                        {location.sunrise.toLocaleTimeString()} i {isAfterSunset ? 'zaszło' : 'zachodzi'} o{' '}
                        {location.sunset.toLocaleTimeString()}, a porę dnia odwzierciedla obrazek słońca lub księżyca w
                        tle. <br />
                        Poza tym od 1 grudnia do 31 stycznia pojawia się motyw świąteczny. Icons in background made by
                        Smashicons &amp; Freepik from www.flaticon.com.
                    </>
                )}
                {!location && <Spin size="small" />}
            </div>
        </Layout.Footer>
    );
};

export default Footer;
