import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import * as actions from '../store/actions/index';
import asynComponent from '../hoc/asyncComponent/asyncComponent';

const AsyncCheckout = asynComponent(() => import('../containers/Checkout/Checkout'));

const AsyncOrders = asynComponent(() => import('../containers/Orders/Orders'));

const AsyncAuth = asynComponent(() => import('./Auth/Auth'));

const AsyncLogout = asynComponent(() => import('./Auth/Logout/Logout'));

class App extends Component {

  componentDidMount() {
    this.props.tryAutoSignIn();
  }

  render(){

    let router = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder}/>
        <Route path='/auth' component={AsyncAuth}/>
        <Redirect to='/'/>
      </Switch>
    );

    if(this.props.isAuth) {
      router = (
        <Switch>
          <Route path='/' exact component={BurgerBuilder}/>
          <Route path='/checkout' component={AsyncCheckout}/>
          <Route path='/auth' component={AsyncAuth}/>
          <Route path='/logout' component={AsyncLogout}/>
          <Route path='/orders' component={AsyncOrders}/>
          <Redirect to='/'/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
            {router}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoSignIn: () => dispatch(actions.authStateCheck())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
