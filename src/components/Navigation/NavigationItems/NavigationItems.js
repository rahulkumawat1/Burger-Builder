import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem linkClicked={props.linkClicked} exact link='/'>Burger Builder</NavigationItem>
            {props.isAuth?
                <NavigationItem linkClicked={props.linkClicked} link='/logout'>LogOut</NavigationItem>:
                <NavigationItem linkClicked={props.linkClicked} link='/auth'>SignUp</NavigationItem>
            }
            {props.isAuth?
                <NavigationItem linkClicked={props.linkClicked} link='/orders'>Orders</NavigationItem>:
                null
            }
        </ul>
    );
}

export default navigationItems;