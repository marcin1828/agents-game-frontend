import React from 'react';
import styles from './GameService.module.scss';
import TilesBoard from '../../components/TilesBoard/TilesBoard';
import Menu from '../../components/Menu/Menu';

class GameService extends React.Component {

    state = {
        imagesCount: 0,
        boardStatus: {},
        images: {},
        gameExists: false,
    };

    componentDidMount() {
        const images = this.importAllImagesFromDirectory(require.context('../../assets/images/tiles', false, /\.jpg/));
        let imagesCount = Object.keys(images).length;
        this.setState({
            images: images,
            imagesCount: imagesCount
        });
        this.createNewGame();
    }

    createNewGame = () => {
        fetch('http://localhost:8080/game/create')
            .then(res => res.json())
            .then(res => {
                this.setState({boardStatus: {...res}, gameExists: true});
            });
    }

    importAllImagesFromDirectory = r => {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item).default; });
        return images;
    }

    render() {

        const { gameExists } = this.state;  // destrukturyzacja stanu, żeby nie musieć odwoływać się poprzez this.state

        return (
            <div className={styles.wrapper}>
                <Menu /*createNewGame = {this.createNewGame}*//>
                <TilesBoard layout={this.state.boardStatus} images={this.state.images}/>
            </div>
        )
    }
}


export default GameService;