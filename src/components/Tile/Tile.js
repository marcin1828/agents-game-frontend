import React from 'react';
import './Tile.css';
import blueImage from './../../assets/images/blue.jpg';
import redImage from './../../assets/images/red.jpg';
import grayImage from './../../assets/images/gray.jpg';
import blackImage from './../../assets/images/black.jpg';
import TileBox from '../TileBox/TileBox';


const Tile = (props) => {

    const handleClick = () => {
        const gameId = window.location.pathname.slice(6);
        fetch(`http://${window.location.hostname}:8080/game/${gameId}/tile/color?imageNumber=${props.imgNo}`, {
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
        <div className="tile-container">
            <TileBox handleClick={handleClick} img={props.img}/>
            {props.color === "GRAY" ? <img className="color-image" src={grayImage} alt={grayImage}/> : ''}
            {props.color === "RED" ? <img className="color-image" src={redImage} alt={redImage}/> : ''}
            {props.color === "BLUE" ? <img className="color-image" src={blueImage} alt={blueImage}/> : ''}
            {props.color === "BLACK" ? <img className="color-image" src={blackImage} alt={blackImage}/> : ''}
        </div>      
    );
}

export default Tile;
