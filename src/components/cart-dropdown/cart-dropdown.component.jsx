import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';
import { useNavigate } from 'react-router-dom';


const CartDropdown = () => {
    const {cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

   const goToCheckout = () => {
        console.log('mok')
        navigate('/checkout');
   }
   
   const handleButtonClick = () => {
        goToCheckout();
        toggleIsCartOpen();
   }

   

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(item=> <CartItem key = {item.id} cartItem = {item}/>)}
            </div>
           
                <Button onClick={handleButtonClick}>GO TO CHECKOUT</Button>
           
        </div>
    )

}

export default CartDropdown;