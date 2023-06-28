
import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.jsx';
import { CategoryPreviewContainer, PreviewGrid, TitleElement } from './category-preview.styles.jsx';

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <TitleElement to={title}>{title.toUpperCase()}</TitleElement>
            </h2>
            <PreviewGrid>
                {
                    products
                    .filter((_, idx)=> idx<4)
                    .map((product)=> (
                        <ProductCard key={product.id} product={product}/>
                    ))
                }

            </PreviewGrid>

        </CategoryPreviewContainer>
    )

}

export default CategoryPreview;