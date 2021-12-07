import React from 'react';
import './TilesBoard.css';
import Tile from './../Tile/Tile';



class TilesBoard extends React.Component {


    getTiles() {
        const layout = {...this.props.layout};
        const images = {...this.props.images};

        let array = [];
        if(layout !== undefined && images !== undefined) {
            for (let i in layout['tiles']) {
                let imageSrc = images[layout['tiles'][i]['imageNumber']+ '.jpg'];
                array.push(<Tile key={'Tile' + layout['tiles'][i]['imageNumber']} img={imageSrc} color={layout['tiles'][i]['color']}/>)
            }
        }
        return array;
    }

    render() {

        return (
            <div className="TilesBoard">
                <p className="token">Game token: {this.props.layout['token'] !== null ? this.props.layout['token'] : ''}</p>
                {this.getTiles()}
            </div>
        );
    }
}

export default TilesBoard;
