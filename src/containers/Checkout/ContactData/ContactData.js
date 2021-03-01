import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/input/input';

class ContactData extends Component{

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'name',
                    placeholder: 'Your Name'
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
            phno: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    name: 'tel',
                    placeholder: 'Phone No'
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
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'street',
                    placeholder: 'Street'
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
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'pincode',
                    placeholder: 'Pin Code'
                },
                validation: {
                    rules: {
                        required: true,
                        minLength: 6,
                        maxLength: 6
                    },
                    isValid: false
                },  
                value: '',
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {
                    rules: null,
                    isValid: true
                },
                value: 'fastest'
            }
        },
        formValid: false
    }

    submitted = (event) => {
        event.preventDefault();
        
        this.setState({loadingStatus: true});

        const formData = {};
        for(let i in this.state.orderForm)
            formData[i] = this.state.orderForm[i].value;

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customerData: formData,
            userId: this.props.userId
        };

        this.props.burgerPurchase(order, this.props.token);
        
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
        const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));
        updatedOrderForm[ele].value = e.target.value;

        updatedOrderForm[ele].validation.isValid = this.checkValidity(updatedOrderForm[ele].value, updatedOrderForm[ele].validation.rules);

        updatedOrderForm[ele].touched = true;

        let formValid = true;
        for(let i in updatedOrderForm)
            formValid = updatedOrderForm[i].validation.isValid && formValid;

        this.setState({orderForm: updatedOrderForm, formValid: formValid});
    }


    render() {

        let form = <Spinner/>
        const formElementArray = [];

        for(let i in this.state.orderForm)
            formElementArray.push({
                id: i,
                setup: this.state.orderForm[i]
            });

        if(!this.props.loading){
            form = (
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
                    <Button disabled={!this.state.formValid} btnType='Success' clicked={this.submitted}>ORDER</Button>
                </form>
            );
        }

        return (
            <div className={classes.ContactData}>
                <h3>Enter your Info..</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token : state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatcherToProps = dispatch => {
    return {
        burgerPurchase: (order, token) => dispatch(actions.burgerPurchase(order, token))
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(withErrorHandler(ContactData, axios));