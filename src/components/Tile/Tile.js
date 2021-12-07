import React from 'react';
import './Tile.css';
import blueImage from './../../images/blue.jpg';
import redImage from './../../images/red.jpg';
import grayImage from './../../images/gray.jpg';
import blackImage from './../../images/black.jpg';

const Tile = (props) => {



    return (
            <div className="tile-container">
                <img className="main-image" src={props.img} alt={props.img}/>

                {props.color === "GRAY" ? <img className="color-image" src={grayImage} alt={grayImage}/> : ''}
                {props.color === "RED" ? <img className="color-image" src={redImage} alt={redImage}/> : ''}
                {props.color === "BLUE" ? <img className="color-image" src={blueImage} alt={blueImage}/> : ''}
                {props.color === "BLACK" ? <img className="color-image" src={blackImage} alt={blackImage}/> : ''}

            </div>
    );

}

export default Tile;
