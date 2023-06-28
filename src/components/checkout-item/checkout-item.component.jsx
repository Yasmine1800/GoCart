import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


import './checkout-item.styles.jsx';
import { Arrow, CheckoutItemContainer, ImageContainer, NameElement, PriceElement, QuantityContainer, RemoveButton, Value } from './checkout-item.styles.jsx';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <NameElement>{name}</NameElement>
           
            <QuantityContainer>
                <Arrow onClick={()=> removeItemFromCart(cartItem)}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={()=> addItemToCart(cartItem)}>
                    &#10095;
                </Arrow>   
            
            </QuantityContainer>
            
            <PriceElement>{price}</PriceElement>
            <RemoveButton onClick={()=> clearItemFromCart(cartItem)}>&#10005;</RemoveButton>

        </CheckoutItemContainer>
    );
};

export default CheckoutItem;