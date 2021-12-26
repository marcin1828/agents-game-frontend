import React, {useState} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './StartView.module.scss';
import logo from '../../assets/images/logo.png';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const StartView = () => {

    const [gameId, setGameId] = useState(null);
    const [insertedGameId, setInsertedGameId] = useState(null);
    const [isDialogOpen, setDialog] = useState(false);

    let navigate = useNavigate();

    const createNewGame = () => {
        fetch('http://localhost:8080/game/create')
            .then(response => response.json())
            .then(response => {
                setGameId(response.gameId);
            });
    }

    const validateGameId = (gameId) => {
        return fetch(`http://localhost:8080/game/${gameId}/validate`)
            .then(response => response.json());
    }

    const joinToGame = () => {
        validateGameId(insertedGameId).then(result => {
            if(insertedGameId !== null && result.valid) {
                navigate('/lobby/' + insertedGameId, { replace: true });
            } else {
                setDialog(true);
            }
        })
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


            <Dialog
                open={isDialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Błąd</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Gra o takim ID nie istnieje
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog(false)} autoFocus>OK</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
};

export default StartView;
