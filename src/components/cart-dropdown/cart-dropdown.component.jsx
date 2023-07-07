import { useSelector } from 'react-redux';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../store/cart/cart.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { setIsCartOpen } from '../../store/cart/cart.action';


import './cart-dropdown.styles.jsx';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItemsContainer, EmptyMessage } from './cart-dropdown.styles.jsx';


const CartDropdown = () => {

    const {cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext);
    // const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();

    // const isCartOpen = useSelector(selectIsCartOpen)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

   const goToCheckout = () => {
        navigate('/checkout');
   }
   
   const handleButtonClick = () => {
        goToCheckout();
        toggleIsCartOpen();
   }


    return(
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length ? (cartItems.map((item)=> (
                        <CartItem key = {item.id} cartItem = {item}/>
                ))) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )
                    
                }
            </CartItemsContainer>
           
                <Button onClick={handleButtonClick}>GO TO CHECKOUT</Button>
                
        </CartDropdownContainer>
    )

}

export default CartDropdown;


