import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import {useContext, useEffect, useState} from 'react'
import CartContext from '../../store/cart-context'


const HeaderCartButton = (props) => {

    const [btnBumped, setBtnBumped] = useState(false);

    const cartCtx = useContext(CartContext);

    const numberOfItems = cartCtx.items.reduce((currentNumber, currentItem) => {
        //console.log(currentNumber);
        //console.log('this')
        //  console.log(currentItem.amount);
        return currentNumber + currentItem.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnBumped ? classes.bump : ''}`;

    const {items} = cartCtx;
    //console.log(JSON.stringify(items));
    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnBumped(true);
        const timer = setTimeout(() => {
            setBtnBumped(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onUserClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    );
};

export default HeaderCartButton;