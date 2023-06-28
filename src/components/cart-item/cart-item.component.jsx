import './cart-item.styles.jsx';
import { CartItemContainer, CartItemImage, ItemDetailsContainer, ItemName } from './cart-item.styles.jsx';

const CartItem = ({cartItem}) =>{
    const {name, imageUrl, quantity, price} = cartItem;
    return (
        <CartItemContainer>
            <CartItemImage src={imageUrl} alt={`${name}`}/>
           
            <ItemDetailsContainer>
                <ItemName>{name}</ItemName>
                <ItemName>{quantity} x ${price}</ItemName>
            </ItemDetailsContainer>

        </CartItemContainer>
    )

}

export default CartItem;