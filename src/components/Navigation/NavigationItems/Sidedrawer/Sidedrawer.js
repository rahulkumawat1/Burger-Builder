import React, {Component} from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems';
import classes from './Sidedrawer.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../../hoc/Layout/Aux/Aux';

class Sidedrawer extends Component {

    componentDidUpdate(){
        console.log('[Sidedrawer.js] componentDidUpdate');
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.closed}/>
                <div className={[classes.Sidedrawer, this.props.show? classes.Open: classes.Close].join(' ')}>
                    <div className={classes.Logo}>
                        <Logo />
                    </div>
                    <nav>
                        <NavigationItems />
                    </nav>
                </div>
            </Aux>
        );
    }
}

export default Sidedrawer;