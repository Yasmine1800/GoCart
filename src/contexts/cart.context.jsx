import { useReducer } from 'react';
import { createContext } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contain productToAdd
    const existingCartItem = cartItems.find((cartItem) =>
        cartItem.id === productToAdd.id
    );

    // If found increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );

    }

    // return new array with modified cartItems/new cart item 
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart Item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity == 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}


export const CartContext = createContext(
    //     {
    //     isCartOpen: false,
    //     setIsCartOpen: () => {},
    //     cartItems: [],
    //     addItemToCart: () => {},
    //     cartCount: 0,
    //     totalCount: 0,
    //     showCheckout: false,
    //     setShowCheckout: () => {},
    //     setCartItems: () => {},
    //     setTotalCount: () => {},
    //     removeItemFromCart: () => {},
    //     clearItemFromCart: () => {}

    // }
);

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalCount: 0,
};

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }

        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }

}



export const CartProvider = ({ children }) => {
    //const [isCartOpen, setIsCartOpen] = useState(false);
    //const [cartItems, setCartItems] = useState([]);
    //const [cartCount, setCartCount] = useState(0);
    //const [totalCount, setTotalCount]= useState(0);
    // const [showCheckout, setShowCheckout] = useState(false);


    // useEffect(()=> {
    //     const newCartCount = cartItems.reduce((total, cartItem)=> total+cartItem.quantity,0)
    //     setCartCount(newCartCount)

    // }, [cartItems]);

    // useEffect(()=> {
    //     const newTotalCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity* cartItem.price,0);
    //     setTotalCount(newTotalCount);

    // }, [cartItems])


    const [{ cartItems, isCartOpen, cartCount, totalCount }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);


        const newTotalCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEMS,
                {
                    cartItems: newCartItems,
                    cartCount: newCartCount,
                    totalCount: newTotalCount
                }
            )
        );
    }


    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);

    }


    const removeItemFromCart = (productToAdd) => {
        const newCartItems = removeCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(
            {
                type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
                payload: bool
            }
        )
    }
    const clearCartItems = () => {
        updateCartItemReducer([])
    }
    
    const value = {
        isCartOpen,
        cartItems,
        cartCount,
        totalCount,
        clearCartItems,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}