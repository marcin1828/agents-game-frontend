import React, { useEffect, useState } from 'react';
import styles from './Lobby.module.scss';
import logo from '../../assets/images/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';


const Lobby = () => {

    const [gameId, setGameId] = React.useState(() => {
        const newGameId = window.location.pathname.slice(7);
        fetch(`http://${window.location.hostname}:8080/game/${newGameId}/validate`)
            .then(response => response.json())
            .then(response => {
                if(!response.valid) {
                    navigate('/', { replace: true });
                }
            });
        return newGameId;
      });
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [players, setPlayers] = useState(undefined);

    let navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            refreshPlayerList();
        }, 500);
        return () => clearInterval(interval);
    });

    const refreshPlayerList = () => {
        fetch(`http://${window.location.hostname}:8080/game/${gameId}/status/players`)
        .then(response => response.json())
        .then(response => {
            setPlayers(response);
        })
    }

    const joinToGame = (team, role) => {
        if(userName && userName.length > 0 && !userId) {
            fetch(`http://${window.location.hostname}:8080/game/${gameId}/join`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({team: team, role: role, userName: userName}),
            })
            .then(response => response.json())
            .then(response => {
                setUserId(response.userId);
            })
            .catch((error) => {
                console.error('Join to game error: ', error);
            });
        }
    }

    const startGame = () => {
        const url = new URL(window.location.href);
        const userIdUrlParam = url.searchParams.get("uID");
        if (gameId && userId) {
            navigate('/game/' + gameId + '?uID=' + userId, { replace: true });
        } else if (gameId && userIdUrlParam) {
            navigate('/game/' + gameId + '?uID=' + userIdUrlParam, { replace: true });
        }
    }

    const BlueButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blue[700]),
        backgroundColor: blue[700],
        '&:hover': {
          backgroundColor: blue[900],
        },
    }));

    const RedButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        '&:hover': {
          backgroundColor: red[900],
        },
    })); 
  
    return (
        <div className={styles.wrapper}>
            <Link to="/"><img className={styles.logo} src={logo} alt='Logo Agents'/></Link>
            <p className={styles.p}>Cześć,</p>
            <input maxLength="15" onChange={(e) => setUserName(e.target.value)} className={styles.input} type="text" placeholder="Podaj imię" />
            <div className={styles.tiles}>
                <div className={styles.bluePanel}>
                    <p className={styles.bold}>Szef wywiadu</p>
                    <div>
                        {players && players.blueLeaderId.length > 0 ? <p>{players.blueLeaderName}</p> : 
                            <BlueButton onClick={(e) => joinToGame('blue', 'leader')} className={styles.BlueButton}>Dołącz</BlueButton>
                        }
                    </div>
                    <p className={styles.bold}>Agent</p>
                    <div>
                        {players && players.blueAgentId.length > 0 ? <p>{players.blueAgentName}</p> : 
                            <BlueButton onClick={(e) => joinToGame('blue', 'agent')} className={styles.BlueButton}>Dołącz</BlueButton>
                        }
                    </div>
                </div>
                <div className={styles.redPanel}>
                    <p className={styles.bold}>Szef wywiadu</p>
                    <div>
                        {players && players.redLeaderId.length > 0 ? <p>{players.redLeaderName}</p> : 
                            <RedButton onClick={(e) => joinToGame('red', 'leader')} className={styles.RedButton}>Dołącz</RedButton>
                        }
                    </div>
                    <p className={styles.bold}>Agent</p>
                    <div>
                        {players && players.redAgentId.length > 0 ? <p>{players.redAgentName}</p> : 
                            <RedButton onClick={(e) => joinToGame('red', 'agent')} className={styles.RedButton}>Dołącz</RedButton>
                        }
                    </div>
                </div>
            </div>
            <Button onClick={startGame} style={{marginTop: '35px', width: '150px'}} variant="contained" color="success">GRAJ</Button>
        </div>
    );
}

export default Lobby;
