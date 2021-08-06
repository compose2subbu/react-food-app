import { useRef, useState } from 'react';
import classes from './Checkout.module.css'


const isEmpty = value => value.trim() === '';
const isPostalValid = value => value.trim().length === 6;

const Checkout = (props) => {
 const [formInputsValidity, setFormInputsvalidity] = useState({
     name: true,
     street: true,
     city: true,
     postalCode: true,
 })
 const nameInputRef = useRef();
 const streetInputRef = useRef();
 const postalInputRef = useRef();
 const cityInputRef = useRef();

    const confirmhandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        //console.log(enteredPostal)
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isPostalValid(enteredPostal);
        //console.log(enteredPostalIsValid)

        setFormInputsvalidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })
        const formIsValid = (enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid)

        if (!formIsValid){
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity
        });
    }
    //console.log(formInputsValidity.postalCode)
    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`;
    //console.log(postalCodeControlClasses);
    //console.log(nameControlClasses);

    return (
        <form className={classes.form} onSubmit={confirmhandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='Street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code(6 digits)!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit} onClick={confirmhandler}>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;