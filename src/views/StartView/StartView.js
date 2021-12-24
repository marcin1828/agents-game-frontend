import React, {useState} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './StartView.module.scss';
import logo from '../../assets/images/logo.png';

const StartView = () => {

    const [gameId, setGameId] = useState(null);
    const [insertedGameId, setInsertedGameId] = useState(null);
    let navigate = useNavigate();

    const createNewGame = () => {
        fetch('http://localhost:8080/game/create')
            .then(response => response.json())
            .then(response => {
                setGameId(response);
            });
    }

    const joinToGame = () => {
        if(insertedGameId !== null && insertedGameId.length > 0) {
             navigate('/lobby/' + insertedGameId, { replace: true });
        }
    }

    return (
        <div className={styles.wrapper}>

            {gameId ? <Navigate to={'/lobby/' + gameId} /> : ''}

            <img className={styles.logo} src={logo} alt='Logo Agents'/>
            <div className={styles.formGroup}>
                <p className={styles.p}>Nowa gra</p>
                <button className={styles.button} onClick={() => createNewGame()}>Utwórz grę</button>
            </div>
            <p>Dołącz do istniejącej gry</p>
            <div>
                <input className={styles.input} type="text" placeholder="Podaj ID" onChange={(e) => setInsertedGameId(e.target.value)}/>
                <button className={styles.button} onClick={joinToGame}>Dołącz</button>
            </div>
        </div>
    )
};

export default StartView;
