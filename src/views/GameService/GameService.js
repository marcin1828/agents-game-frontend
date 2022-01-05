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
    const navigate = useNavigate();

    useEffect(() => {
        prepareImages();
        initData();
    }, []);
    
    const prepareImages = async () => {
        const images = importAllImagesFromDirectory(require.context('../../assets/images/tiles', false, /\.jpg/));
        await setImages(images);
        await setImagesCount(Object.keys(images).length);
    };

    const initData = async () => {
        const newPlayerId = window.location.search.slice(5);
        const newGameId = await getGameId();
        await getGameStatus(newGameId);
        await getPlayerInfo(newGameId, newPlayerId);
        await getPlayerList(newGameId);
    };

    const importAllImagesFromDirectory = r => {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item).default; });
        return images;
    };

    const getGameStatus = (newGameId) => {
        fetch(`http://${window.location.hostname}:8080/game/${newGameId}/status/public`)
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
        fetch(`http://${window.location.hostname}:8080/game/${newGameId}/status/player/${newPlayerId}`)
        .then(response => response.json())
        .then(response => setPlayerInfo(response));
    };

    const getPlayerList = (newGameId) => {
        fetch(`http://${window.location.hostname}:8080/game/${newGameId}/status/players`)
        .then(response => response.json())
        .then(response => {
            setPlayers(response);
        })
    };

    return(
        <div className={styles.wrapper}>
            <Menu />
            <TilesBoard gameStatus={gameStatus} images={images}/>
        </div>
    );
}

export default GameService;
