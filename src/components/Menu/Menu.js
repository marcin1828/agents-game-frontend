import React from 'react';
import styles from './Menu.module.scss';
import logo from '../../assets/images/logo.png'

const Menu = (/*{createNewGame}*/) => (
    <div className={styles.Menu}>
        <img className={styles.logo} src={logo} alt="logo"/>
        {/* <button onClick={createNewGame}>Create Game</button> */}
    </div>
);

export default Menu;
