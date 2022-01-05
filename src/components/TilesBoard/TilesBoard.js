import React from 'react';
import styles from './TilesBoard.module.scss';
import Tile from './../Tile/Tile';


class TilesBoard extends React.Component {

    getTiles() {
        const gameStatus = {...this.props.gameStatus};
        const images = {...this.props.images};

        let array = [];
        if(gameStatus !== undefined && images !== undefined) {
            for (let i in gameStatus['tiles']) {
                let imageSrc = images[gameStatus['tiles'][i]['imageNumber']+ '.jpg'];
                array.push(
                    <Tile 
                        key={'Tile' + gameStatus['tiles'][i]['imageNumber']} 
                        imgNo={gameStatus['tiles'][i]['imageNumber']} 
                        img={imageSrc} 
                        color={gameStatus['tiles'][i]['color']}
                    />
                )
            }
        }
        return array;
    }

    render() {

        return (
            <div className={styles.TilesBoard}>
                {this.getTiles()}
            </div>
        );
    }
}

export default TilesBoard;
