import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {

    const [amountvalid, setAmountValid] = useState(true);

    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const numericEnteredAmount = +enteredAmount;
        if(enteredAmount.trim().length === 0 || numericEnteredAmount < 1 || numericEnteredAmount > 5){
            setAmountValid(false);
            return;
        }
        //console.log(typeof(numericEnteredAmount))
        props.onAddToCart(numericEnteredAmount);
    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input ref={amountInputRef}
        label="Amount" input={{
            id: 'amount_'+props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }}/>
        <button>+ Add</button>
        {!amountvalid && <p>Please enter a valid amount (1-5).</p>}
    </form>;
}

export default MealItemForm;