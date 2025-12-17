import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const calculateSubtotal = () => {
        return food_list.reduce((total, item) => {
            if (cartItems[item._id] > 0) {
                total += item.price * cartItems[item._id];
            }
            return total;
        }, 0);
    };

    const calculateDelivery = () => 5.0;

    const calculateTotal = () => {
        return calculateSubtotal() + calculateDelivery() - discount;
    };

    const applyPromoCode = () => {
        if (promoCode === 'DISCOUNT10') {
            setDiscount(10);
        } else {
            setDiscount(0);
            alert('Invalid promo code');
        }
    };

    const subtotal = calculateSubtotal();
    const deliveryFee = calculateDelivery();
    const total = calculateTotal();

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id} className="cart-items-title cart-items-item">
                                <img src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                                <p>${item.price.toFixed(2)}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                                <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* Cart total section */}
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>

                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>

                    <hr />

                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>${deliveryFee.toFixed(2)}</p>
                    </div>

                    <hr />

                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${total.toFixed(2)}</b>
                    </div>

                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>

                {/* Promo Code Section */}
                <div className="cart-promocode">
                    <p>If you have a promo code, enter it here:</p>
                    <div className="cart-promocode-input">
                        <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Promo Code"
                        />
                        <button onClick={applyPromoCode}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
