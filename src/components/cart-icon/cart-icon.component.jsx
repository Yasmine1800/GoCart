

import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.jsx';
import { CartIconContainer, ShoppingIconContainer, ItemCount } from './cart-icon.styles.jsx';

import { useContext } from 'react';

const CartIcon = () => {

    const {isCartOpen,setIsCartOpen, cartCount} = useContext(CartContext);



     const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconContainer/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )

}

export default CartIcon;