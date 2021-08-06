import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartitemRemoveHandler = (id) => {
    cartCtx.removeitem(id);
  };

  const cartitemAddhandler = (item) => {
    cartCtx.additem({...item, amount: 1});
  };

  //console.log(hasItems);
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[
        cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartitemRemoveHandler.bind(null, item.id)}
            onAdd={cartitemAddhandler.bind(null, item)}
          />
        )),
      ]}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderhandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://react-web-643bc-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const modalActions = (<div className={classes.actions}>
    <button className={classes["button--alt"]} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>);

  const cartModalContent = (<React.Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderhandler} />}
    {!isCheckout && modalActions}
    </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = <React.Fragment><p>Successfully sent the order!</p><div className={classes.actions}><button className={classes.button} onClick={props.onClose}>
    Close
  </button></div></React.Fragment>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
