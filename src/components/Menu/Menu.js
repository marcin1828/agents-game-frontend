import React from 'react';
import styles from './Menu.module.scss';
import logo from '../../assets/images/logo.png'

const Menu = ({ bluePoints, redPoints, blueTilesLeft, redTilesLeft }) => (
    <div className={styles.Menu}>
        <img className={styles.logo} src={logo} alt="logo"/>
        
        <h2 className={styles.sectionHeader}>Wynik:</h2>
        <div className={styles.resultBar}>
            <p className={styles.blueResult}>{bluePoints}</p>
            <p className={styles.redResult}>{redPoints}</p>
        </div>

        <h2 className={styles.sectionHeader}>Do odgadnięcia:</h2>
        <div className={styles.resultBar}>
            <p className={styles.blueTilesLeft}>{blueTilesLeft}</p>
            <p className={styles.redTilesLeft}>{redTilesLeft}</p>
        </div>

        <h2 className={styles.gameStatusInfo}>Gra drużyna niebieskich</h2>
    </div>
);

export default Menu;
