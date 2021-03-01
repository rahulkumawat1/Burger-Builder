import React, {Component} from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems';
import classes from './Sidedrawer.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../../hoc/Aux/Aux';

class Sidedrawer extends Component {

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.closed}/>
                <div className={[classes.Sidedrawer, this.props.show? classes.Open: classes.Close].join(' ')}>
                    <div className={classes.Logo}>
                        <Logo />
                    </div>
                    <nav>
                        <NavigationItems isAuth={this.props.isAuth} linkClicked={this.props.linkClicked} />
                    </nav>
                </div>
            </Aux>
        );
    }
}

export default Sidedrawer;