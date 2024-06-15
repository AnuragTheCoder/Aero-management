import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import arrowBtn from '../../Assets/arrow_btn.png';
import playIcon from '../../Assets/play_icon.png';
import pauseIcon from '../../Assets/pause_icon.png';

const Hero = ({ heroData, setHeroCount, heroCount, setPlayStatus, playStatus }) => {
    return (
        <div className={styles.hero}>
            <div className={styles.heroText}>
                <p>{heroData[heroCount].text1}</p>
                <p>{heroData[heroCount].text2}</p>
            </div>
            <div className={styles.merge}>
                <Link to="/register">
                    <div className={styles.heroExplore}>
                        <p>Register To Explore</p>
                        <img src={arrowBtn} alt="Arrow Button" />
                    </div>
                </Link>
                <div className={styles.heroPlay}>
                    <img
                        onClick={() => setPlayStatus(!playStatus)}
                        src={playStatus ? pauseIcon : playIcon}
                        alt="Play/Pause Icon"
                    />
                </div>
            </div>
            <div className={styles.heroDotPlay}>
                <ul className={styles.heroDots}>
                    <li
                        onClick={() => setHeroCount(0)}
                        className={heroCount === 0 ? styles.heroDotOrange : styles.heroDot}
                    ></li>
                    <li
                        onClick={() => setHeroCount(1)}
                        className={heroCount === 1 ? styles.heroDotOrange : styles.heroDot}
                    ></li>
                    <li
                        onClick={() => setHeroCount(2)}
                        className={heroCount === 2 ? styles.heroDotOrange : styles.heroDot}
                    ></li>
                </ul>
            </div>
        </div>
    );
};

export default Hero;
