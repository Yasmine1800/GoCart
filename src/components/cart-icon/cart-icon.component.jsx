
import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import {setIsCartOpen} from '../../store/cart/cart.action';

import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.jsx';
import { CartIconContainer, ShoppingIconContainer, ItemCount } from './cart-icon.styles.jsx';

import { useContext } from 'react';

const CartIcon = () => {

    const {isCartOpen,setIsCartOpen, cartCount} = useContext(CartContext);

    // const dispatch = useDispatch();

    // const cartCount = useSelector(selectCartCount);
    // const isCartOpen = useSelector(selectIsCartOpen);

    // const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

     const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconContainer/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )

}

export default CartIcon;