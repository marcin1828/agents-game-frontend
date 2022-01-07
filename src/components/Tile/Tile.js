import React from 'react';
import styles from './Tile.module.scss';
import blueImage from './../../assets/images/blue.jpg';
import redImage from './../../assets/images/red.jpg';
import grayImage from './../../assets/images/gray.jpg';
import blackImage from './../../assets/images/black.jpg';
import TileBox from '../TileBox/TileBox';


const Tile = ({ img, imgNo, color, hint, open }) => {

    const handleClick = () => {
        const gameId = window.location.pathname.slice(6);
        fetch(`http://${window.location.hostname}:8080/game/${gameId}/tile/color?imageNumber=${imgNo}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .catch((error) => {
                console.error('Join to game error: ', error);
            });
    };

    return (
        <div className={styles.tileContainer}>
            <TileBox handleClick={handleClick} img={img} borderColor={hint ? color : null}/>
            {color === "GRAY" && open ? <img className={styles.colorImage} src={grayImage} alt={grayImage}/> : ''}
            {color === "RED" && open ? <img className={styles.colorImage} src={redImage} alt={redImage}/> : ''}
            {color === "BLUE" && open ? <img className={styles.colorImage} src={blueImage} alt={blueImage}/> : ''}
            {color === "BLACK" && open ? <img className={styles.colorImage} src={blackImage} alt={blackImage}/> : ''}
        </div>
    );
}

export default Tile;
