import React from 'react';
import './GameService.css';
import TilesBoard from '../TilesBoard/TilesBoard';

class GameService extends React.Component {

    state = {
        imagesCount: 0,
        boardStatus: {},
        images: {},
        gameExists: false,
    };

    componentDidMount() {
        const images = this.importAllImagesFromFolder(require.context('./../../images/tiles', false, /\.jpg/));
        let imagesCount = 0;
        images.forEach(e => imagesCount++);
        this.setState({
            images: images,
            imagesCount: imagesCount
        });
    }

    createNewGame() {
        fetch('http://localhost:8080/createGame')
            .then(res => res.json())
            .then(res => {
                this.setState({boardStatus: {...res}});
            });
    }

    importAllImagesFromFolder = r => {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item).default; });
        return images;
    }

    render() {

        return (

            this.state.gameExists ? <TilesBoard layout={this.state.boardStatus} images={this.state.images} />
                : <button onClick={() => {this.createNewGame(); this.setState({gameExists: true})}}>Create Game</button>
        )
    }
}


export default GameService;