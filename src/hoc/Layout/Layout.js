import React, {Component} from 'react';
import Aux from './Aux/Aux';
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
            <Sidedrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosed}/>
            <Toolbar sideDrawerToggle={this.sideDrawerToggle} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux> 
    );
    }  
}

export default Layout;