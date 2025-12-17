import React, { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cartItems, food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  // Calculate Subtotal
  const calculateSubtotal = () => {
    return food_list.reduce((total, item) => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id];
      }
      return total;
    }, 0);
  };

  // Calculate Delivery Fee
  const calculateDelivery = () => 5.0; // Hardcoded delivery fee for now

  // Calculate Total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = calculateDelivery();
    return subtotal + deliveryFee;
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = calculateDelivery();
  const total = calculateTotal();

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>

        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street' />

        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div>

        <input type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
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

          <button type="submit" onClick={(e) => { e.preventDefault(); navigate('/order'); }}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
