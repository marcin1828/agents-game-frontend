import React, { useEffect, useState } from 'react';
import styles from './Lobby.module.scss';
import logo from '../../assets/images/logo.png';


const Lobby = () => {

    const [gameId, setGameId] = useState(null);

    useEffect(() => {
        getGameId();
      });

    
    const getGameId = () => {
        setGameId(window.location.pathname.slice(7));
    }

  
    return (
        <div className={styles.wrapper}>
            <img className={styles.logo} src={logo} alt='Logo Agents'/>
            <p>Cześć,</p>
            <input className={styles.input} type="text" placeholder="Podaj imię" />
            <div className={styles.tiles}>
                <div className={styles.bluePanel}>
                    <p className={styles.p}>Dołącz jako:</p>
                    <button className={styles.button} type="submit">Szef wywiadu</button>
                    <button className={styles.button} type="submit">Agent</button>
                </div>
                <div className={styles.redPanel}>
                    <p className={styles.p}>Dołącz jako:</p>
                    <button className={styles.button} type="submit">Szef wywiadu</button>
                    <button className={styles.button} type="submit">Agent</button>
                </div>
            </div>
        </div>
    );
}

export default Lobby;
