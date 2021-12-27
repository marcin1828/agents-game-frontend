import React, { useEffect, useState } from 'react';
import styles from './Lobby.module.scss';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';


const Lobby = () => {

    const [gameId, setGameId] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        getGameId();
    });

    const getGameId = () => {
        const newGameId = window.location.pathname.slice(7);
        fetch(`http://localhost:8080/game/${newGameId}/validate`)
        .then(response => response.json())
        .then(response => {
            if(!response.valid) {
                navigate('/', { replace: true });
            } else {
                setGameId(newGameId);
            }
        })
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
