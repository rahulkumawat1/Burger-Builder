import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component{

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    name: 'email',
                    placeholder: 'Your Email'
                },
                validation: {
                    rules: {
                        required: true
                    },
                    isValid: false
                },                
                value: '',
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    name: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    rules: {
                        required: true,
                        minLength: 6
                    },
                    isValid: false
                },                
                value: '',
                touched: false
            }
        },
        formValid: false,
        isSignUp: true
        
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(!rules) return true;         //dont have any rules

        if(rules.required)
        {
            isValid = value.trim() !== '';
            if(!isValid) return false;
        }

        if(rules.minLength)
        {
            isValid = value.length >= rules.minLength;
            if(!isValid) return false;
        }

        if(rules.maxLength)
        {
            isValid = value.length <= rules.maxLength;
            if(!isValid) return false;
        }

        return isValid;
    }

    changeHandler = (e, ele) => {
        const updatedOrderForm = JSON.parse(JSON.stringify(this.state.controls));
        updatedOrderForm[ele].value = e.target.value;

        updatedOrderForm[ele].validation.isValid = this.checkValidity(updatedOrderForm[ele].value, updatedOrderForm[ele].validation.rules);

        updatedOrderForm[ele].touched = true;

        let formValid = true;
        for(let i in updatedOrderForm)
            formValid = updatedOrderForm[i].validation.isValid && formValid;

        this.setState({controls: updatedOrderForm, formValid: formValid});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
        
    }

    changeMethodHandler = () => {
        this.setState({isSignUp: !this.state.isSignUp});
    }

    componentDidMount() {
        if(!this.props.burgerBuilding && this.props.authRedirectPath !== '/')
            this.props.setAuthRedirectPath();
    }

    componentDidUpdate() {
        if(!this.props.burgerBuilding && this.props.authRedirectPath !== '/')
            this.props.setAuthRedirectPath();
    }

    render() {

        let redirect = null;

        if(this.props.isAuth) 
            redirect = <Redirect to={this.props.authRedirectPath}/>;

        const formElementArray = [];

        for(let i in this.state.controls)
            formElementArray.push({
                id: i,
                setup: this.state.controls[i]
            });

        let errorMessage = null;

        if(this.props.error)
            errorMessage = <p style={{color: 'red', fontWeight: 'bolder'}}>{this.props.error}</p>

        let form = (
            <form>
                {formElementArray
                    .map(ele => <Input 
                        key={ele.id} 
                        label={ele.id}
                        elementType={ele.setup.elementType} 
                        elementConfig={ele.setup.elementConfig}
                        value={ele.setup.value}
                        changed={(e) => this.changeHandler(e, ele.id)}
                        invalid={!ele.setup.validation.isValid}
                        touched={ele.setup.touched}/>
                    )
                }
                <Button disabled={!this.state.formValid} btnType='Success' clicked={this.submitHandler}>SUBMIT</Button>
            </form>
        );

        if(this.props.loading)
                form = <Spinner/>;

        return (
            <div className={classes.Auth}>
                {redirect}
                <h1 style={{color: '#91684a'}}>{this.state.isSignUp? 'Sign UP': 'Sign IN'}</h1>
                {form}
                {errorMessage}
                <Button btnType='Danger' clicked={this.changeMethodHandler}>
                    {this.state.isSignUp? 'SignIn': 'SignUp'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        authRedirectPath: state.auth.redirectPath,
        burgerBuilding: state.burgerBuilder.building
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, isSignUp) => dispatch(actions.auth({email: email, password: password, isSignUp: isSignUp})),
        setAuthRedirectPath: () => dispatch(actions.setRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);