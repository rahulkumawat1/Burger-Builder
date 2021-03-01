import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
             activeClassName={classes.active}
             to={props.link}
             exact={props.exact} 
             onClick={props.linkClicked}>{props.children}
            </NavLink>
        </li>
    );
}

export default navigationItem;