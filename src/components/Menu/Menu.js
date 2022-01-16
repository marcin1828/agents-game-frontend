import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';
import logo from '../../assets/images/logo.png'


const Menu = ({ bluePoints, redPoints, blueTilesLeft, redTilesLeft, isActivePlayer, finishRound, playingTeam }) => (
    <div className={styles.Menu}>
        <img className={styles.logo} src={logo} alt="logo"/>

        <Link to={'/lobby/' + window.location.pathname.slice(6) + window.location.search}>Powrót do lobby</Link>
        
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

        {playingTeam && 
            <h2 className={playingTeam === 'blue' ? styles.gameStatusInfoBlue : styles.gameStatusInfoRed}>
                Gra drużyna {playingTeam === 'blue' ? 'niebieskich' : 'czerwonych'}
            </h2>
        }

        <div className={styles.buttonBar}>
            {isActivePlayer && <Button onClick={(e) => finishRound()} style={{margin: '35px auto', width: '150px'}} variant="contained" color="primary">Koniec tury</Button>}
        </div>
    </div>
);

export default Menu;
