import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField }  from '@mui/material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import styles from './StartView.module.scss';
import logo from '../../assets/images/logo.png';
import InfoDialog from '../../components/InfoDialog/InfoDialog';


const StartView = () => {

    const [gameId, setGameId] = useState(null);
    const [insertedGameId, setInsertedGameId] = useState(null);
    const [isDialogOpen, setDialog] = useState(false);
    let navigate = useNavigate();

    const createNewGame = () => {
        fetch('http://' + window.location.hostname + ':8080/game/create')
            .then(response => response.json())
            .then(response => {
                setGameId(response.gameId);
            });
    }

    const validateGameId = (gameId) => {
        return fetch(`http://${window.location.hostname}:8080/game/${gameId}/validate`)
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

    const RedButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        '&:hover': {
          backgroundColor: red[800],
        },
    }));

    return (
        <div className={styles.wrapper}>

            {gameId ? <Navigate to={'/lobby/' + gameId} /> : ''}

            <img className={styles.logo} src={logo} alt='Logo Agents'/>

            <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <p>Nowa gra</p>
                    <RedButton onClick={() => createNewGame()}>Utwórz</RedButton>
                </div>
                <div className={styles.formGroup}>
                    <p>Istniejąca gra</p>
                    <TextField onChange={(e) => setInsertedGameId(e.target.value)} style={{width: '140px', marginBottom: '10px'}} label="ID gry" size="small"/>
                    <RedButton onClick={joinToGame}>Dołącz</RedButton>
                </div>
            </div>


            <InfoDialog isOpen={isDialogOpen} title="Błąd" message="Gra o takim ID nie istnieje" closeDialog={() => setDialog(false)}/>

        </div>
    )
};

export default StartView;
