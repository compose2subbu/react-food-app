import {useReducer} from 'react';
import CartContext from "./cart-context";


const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        //console.log(action.item.amount);
        //console.log(typeof(action.item.amount))
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex((item) => {
            //console.log(JSON.stringify(item));
            //console.log(JSON.stringify(action));
            //console.log(item.id);
            //console.log(action.item.id);    
            return item.id === action.item.id});
            //console.log(existingCartItemIndex);
        const existingCartItem = state.items[existingCartItemIndex];
        //console.log(updatedTotalAmount);
        let updatedItem;
        let updatedItems;

        if(existingCartItem){
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item)
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === 'REMOVE'){
        
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        let updatedItem;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else {
            updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'CLEAR'){
    return defaultCartState;
    }
    return defaultCartState;

};


const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const additemHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item})
    };

    const removeItemHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id})
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        additem: additemHandler,
        removeitem: removeItemHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;