import { useContext } from 'react';
import './product-card.styles.jsx';

import { CartContext } from '../../contexts/cart.context';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { FooterContainer, Name, Price, ProductCardContainer, ProductImage } from './product-card.styles.jsx';

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const {addItemToCart} = useContext(CartContext);
    const addProductToCart = () => {addItemToCart(product)}
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