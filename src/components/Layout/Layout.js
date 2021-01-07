import React from 'react';
import Aux from '../../hoc/Aux';
import BurgerClasses from '../../containers/BurgerBuilder/BurgerBuilder.css';

const Layout = (props) => {
    return (
        <Aux>
            <div>Toolbar, Sidedrawer, Backdrop</div>
            <main className={BurgerClasses.Content}>
                {props.children}
            </main>
        </Aux> 
    );
}

export default Layout;