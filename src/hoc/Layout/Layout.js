import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/NavigationItems/Sidedrawer/Sidedrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosed = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggle = () => {
        const status = this.state.showSideDrawer;
        this.setState({showSideDrawer: !status});
    }

    render(){
        return (
        <Aux>
            <Sidedrawer isAuth={this.props.isAuth} linkClicked={this.sideDrawerClosed} show={this.state.showSideDrawer} closed={this.sideDrawerClosed}/>
            <Toolbar isAuth={this.props.isAuth} sideDrawerToggle={this.sideDrawerToggle} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux> 
    );
    }  
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);