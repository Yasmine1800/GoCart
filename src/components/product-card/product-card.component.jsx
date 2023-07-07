import { useContext } from 'react';
import './product-card.styles.jsx';

import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector.js';

import { addItemToCart } from '../../store/cart/cart.action.js';

import { CartContext } from '../../contexts/cart.context';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { FooterContainer, Name, Price, ProductCardContainer, ProductImage } from './product-card.styles.jsx';

const ProductCard = ({product}) => {

    const {name, price, imageUrl} = product;

    // const dispatch = useDispatch();

    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => {addItemToCart(product)}
    const cartItems = useSelector(selectCartItems);

    // const addProductToCart = () => dispatch(addItemToCart(cartItems,product))

    
    return(
        <ProductCardContainer>
            <ProductImage src={imageUrl} alt={`${name}`}/>
            <FooterContainer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </FooterContainer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to card</Button>
        </ProductCardContainer>
    )


}

export default ProductCard;