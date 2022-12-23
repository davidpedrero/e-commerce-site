import React from 'react';
import './CartScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import CartItem from '../components/CartItem';

// Actions
import { AddToCart, RemoveFromCart } from '../redux/actions/cartActions';

const CartScreen = () => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const qtyChangeHandler = (id, qty) => {
        dispatch(AddToCart(id, qty))
    }

    const removeFromCart = (id) => {
        dispatch(RemoveFromCart(id))
    }

    return (
        <div className='cartscreen'>
            <div className="cartscreen__left">
                <h2>Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <div>
                        Your Cart is Empty <Link to="/">Go Back</Link>
                    </div>
                ) : (
                    cartItems.map((item) => 
                        <CartItem 
                            item={item} 
                            qtyChangeHandler={qtyChangeHandler}
                            removeFromCart={removeFromCart}
                        />)
                )}
            </div>
            <div className="cartscreen__right">
                <div className="cartscreen__info">
                    <p>Subtotal (0) items</p>
                    <p>$499.99</p>
                </div>
                <div>
                    <button>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default CartScreen