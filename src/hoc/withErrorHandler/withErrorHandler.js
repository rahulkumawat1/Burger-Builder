import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrrapedComponent, axios) => {
    return class extends Component {

        state={
            error: null
        }

        componentWillMount() {
            this.reqinterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req; }, err => {
                this.setState({error: err});
                return err;
            });

            this.resinterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({error: err});
                return err;
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqinterceptor);
            axios.interceptors.response.eject(this.resinterceptor);
        }

        // componentDidMount() {                        //problem is componentDidMount of wrapped comp will run first and there we r making http req so this interceptors won't attached to that req. So use some hook wich will run before render()

        //     axios.interceptors.request.use(req => {
        //         this.setState({error: null});
        //         return req; }, err => {

        //         this.setState({error: err});
        //         return err;
        //     });

        //     axios.interceptors.response.use(res => res, err => {
        //         this.setState({error: err});
        //         return err;
        //     });
        // }

        modalClosed = () => {
            this.setState({error: null});
        }

        render() {

            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        backdropClicked={this.modalClosed}>{this.state.error? this.state.error.message: null}</Modal>
                    <WrrapedComponent {...this.props}/>
                </Aux>            
            );
        }
    }
}

export default withErrorHandler;