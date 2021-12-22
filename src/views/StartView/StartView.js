import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './StartView.module.scss';
import logo from '../../assets/images/logo.png';

const StartView = () => {

    const [gameId, setGameId] = useState('');

    return (
        <div className={styles.wrapper}>
            <img className={styles.logo} src={logo} alt='Logo Agents'/>
            <div className={styles.formGroup}>
                <p className={styles.p}>Nowa gra</p>
                <Link className={styles.Link} to="/game">Utwórz</Link>
            </div>
            
            <p>Dołącz do istniejącej gry</p>
            <div>
                {/* <label for="id">Id</label> */}
                <input className={styles.input} type="text" id="id" name="id" placeholder="Podaj ID" onChange={(e) => setGameId(e.target.value)}/>
                <Link className={styles.Link} to={"/game?id=" + gameId}>Dołącz</Link>
            </div>
        </div>
    )
};

export default StartView;
