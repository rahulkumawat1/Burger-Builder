import React from 'react';
import logoImage from '../../assets/images/28.1 burger-logo.png';
import classes from './Logo.css';

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={logoImage} alt='logo' />
        </div>
    )
}

export default logo;