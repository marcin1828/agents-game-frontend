import React, {useState, useEffect} from 'react';
import styles from './GameService.module.scss';
import TilesBoard from '../../components/TilesBoard/TilesBoard';
import Menu from '../../components/Menu/Menu';
import { useNavigate } from 'react-router';


const GameService = (props) => {

    const [players, setPlayers] = useState(null);
    const [gameStatus, setGameStatus] = useState(null);
    const [gameId, setGameId] = useState(null);
    const [images, setImages] = useState(null);
    const [imagesCount, setImagesCount] = useState(0);
    const [playerInfo, setPlayerInfo] = useState(null);
    const [blueTeamPoints, setBlueTeamPoints] = useState(0);
    const [redTeamPoints, setRedTeamPoints] = useState(0);


    const navigate = useNavigate();

    useEffect(() => {
        prepareImages();
        const interval = initData();
        return () => clearInterval(interval);
    }, []);
    
    const prepareImages = async () => {
        const images = importAllImagesFromDirectory(require.context('../../assets/images/tiles', false, /\.jpg/));
        await setImages(images);
        await setImagesCount(Object.keys(images).length);
    };

    const initData = async () => {
        const newPlayerId = window.location.search.slice(5);
        const newGameId = await getGameId();
        const newPlayerInfo = await getPlayerInfo(newGameId, newPlayerId);
        const interval = setInterval(() => {
            getGameStatus(newGameId, newPlayerInfo);
        }, 500);
        
        await getPlayerList(newGameId);
        return interval;
    };

    const importAllImagesFromDirectory = r => {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item).default; });
        return images;
    };

    const getGameStatus = (newGameId, newPlayerInfo) => {
        let url = `http://${window.location.hostname}:8080/game/${newGameId}/status/public`;
        if(newPlayerInfo && newPlayerInfo.role === 'leader') {
            url = `http://${window.location.hostname}:8080/game/${newGameId}/status/private`;
        }
        fetch(url)
        .then(response => response.json())
        .then(response => {
            setGameStatus(response);
        })
    };

    const getGameId = () => {
        const newGameId = window.location.pathname.slice(6);
        fetch(`http://${window.location.hostname}:8080/game/${newGameId}/validate`)
        .then(response => response.json())
        .then(response => {
            if(!response.valid) {
                navigate('/', { replace: true });
            } else {
                setGameId(newGameId);
            }
        });
        return newGameId;
    };
    
    const getPlayerInfo = (newGameId, newPlayerId) => {
        return fetch(`http://${window.location.hostname}:8080/game/${newGameId}/status/player/${newPlayerId}`)
        .then(response => response.json())
        .then(response => {
            setPlayerInfo(response);
            return response;
        });
    };

    const getPlayerList = (newGameId) => {
        fetch(`http://${window.location.hostname}:8080/game/${newGameId}/status/players`)
        .then(response => response.json())
        .then(response => {
            setPlayers(response);
        })
    };

    const finishRound = () => {
        console.log("round finished");
    };

    return(
        <div className={styles.wrapper}>
            <Menu
                bluePoints={blueTeamPoints}
                redPoints={redTeamPoints}
                blueTilesLeft={gameStatus ? gameStatus.blueTilesLeft : ""}
                redTilesLeft={gameStatus ? gameStatus.redTilesLeft : ""}
                isActivePlayer={gameStatus && playerInfo && gameStatus.playingTeam === playerInfo.team && playerInfo.role === 'agent'}
                finishRound={finishRound}
                playingTeam={gameStatus ? gameStatus.playingTeam : null}
            />
            <TilesBoard 
                gameStatus={gameStatus} 
                images={images}
                isLeader={playerInfo && playerInfo.role === 'leader' ? true : false}
            />
        </div>
    );
}

export default GameService;
