import React from 'react';
import styles from './GameService.module.scss';
import TilesBoard from '../../components/TilesBoard/TilesBoard';
import Menu from '../../components/Menu/Menu';

class GameService extends React.Component {

    state = {
        imagesCount: 0,
        boardStatus: {},
        images: {},
    };

    componentDidMount() {
        const images = this.importAllImagesFromDirectory(require.context('../../assets/images/tiles', false, /\.jpg/));
        let imagesCount = Object.keys(images).length;
        this.setState({
            images: images,
            imagesCount: imagesCount
        });
    }

    importAllImagesFromDirectory = r => {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item).default; });
        return images;
    }

    render() {

        return (
            <div className={styles.wrapper}>
                <Menu />
                <TilesBoard layout={this.state.boardStatus} images={this.state.images}/>
            </div>
        )
    }
}


export default GameService;
